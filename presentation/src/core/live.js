// One door to Claude for the live labs.
//  · On claude.ai the published page asks Claude through the viewer's own account (`sample`).
//  · In the offline file an Anthropic API key (settings, key ",") enables the same labs.
//  · Otherwise the labs replay recorded runs, so the talk never depends on the network.
import { store } from './store.js';
import { CONFIG } from '../config.js';

let samplePromise = null;
function getSample() {
  if (!window.claude?.use) return Promise.resolve(null);
  samplePromise ??= window.claude.use('sample').catch(() => null);
  return samplePromise;
}

export const ERRORS = {
  not_granted: 'Claude’dan foydalanishga ruxsat berilmadi. Yozib olingan namoyish koʻrsatiladi.',
  sampling_disabled: 'Bu hisobda Claude jonli rejimi oʻchirilgan.',
  rate_limited: 'Soʻrovlar koʻpayib ketdi. Bir daqiqadan keyin qayta urinib koʻring.',
  session_expired: 'Claude.ai’ga qayta kiring.',
  refused: 'Claude bu soʻrovni bajarmadi. Vazifani boshqacha yozib koʻring.',
  tools_unavailable: 'Bu koʻrinishda vositalar ishlamaydi. Yozib olingan namoyish koʻrsatiladi.',
  auth: 'API kaliti notoʻgʻri. Sozlamalarda (vergul tugmasi) tekshiring.',
  offline: 'Jonli rejim yoqilmagan: yozib olingan namoyish koʻrsatiladi.',
  network: 'Tarmoq bilan aloqa uzildi. Yozib olingan namoyish koʻrsatiladi.',
  cancelled: 'Toʻxtatildi.',
  upstream_error: 'Claude vaqtincha javob bermadi. Qayta urinib koʻring.',
};

export const errText = (e) => ERRORS[e?.code] || ERRORS.upstream_error;

async function client() {
  const apiKey = store.get('apiKey', '');
  if (!apiKey) return null;
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  return { Anthropic, api: new Anthropic({ apiKey, dangerouslyAllowBrowser: true, maxRetries: 1 }) };
}

function mapApiError(e, Anthropic) {
  if (e?.name === 'AbortError' || e instanceof Anthropic?.APIUserAbortError) return { code: 'cancelled' };
  if (e instanceof Anthropic?.AuthenticationError || e instanceof Anthropic?.PermissionDeniedError) return { code: 'auth' };
  if (e instanceof Anthropic?.RateLimitError) return { code: 'rate_limited' };
  if (e instanceof Anthropic?.APIConnectionError) return { code: 'network' };
  if (e?.code) return e;
  return { code: 'upstream_error' };
}

/** Check the minimal shape Claude sent before a page tool runs. */
function validate(tool, input) {
  const schema = tool.input_schema || {};
  if (!input || typeof input !== 'object') return 'input must be an object';
  for (const k of schema.required || []) {
    if (input[k] === undefined || input[k] === null || input[k] === '') return `missing required field "${k}"`;
  }
  return null;
}

export const live = {
  async mode() {
    if (await getSample()) return 'artifact';
    if (store.get('apiKey', '')) return 'api';
    return 'offline';
  },

  /** Plain question → streamed text. */
  async ask(prompt, { onText, signal, deep = false } = {}) {
    const sample = await getSample();
    if (sample) {
      const { text } = await sample(prompt, {
        onText: ({ text }) => onText?.(text),
        signal,
        modelTier: deep ? 'default' : 'quick',
        cache: false,
      });
      return text;
    }
    const c = await client();
    if (!c) throw { code: 'offline' };
    try {
      let full = '';
      const stream = c.api.beta.messages.stream(
        {
          model: CONFIG.apiModel,
          max_tokens: 4000,
          output_config: { effort: 'low' },
          betas: ['server-side-fallback-2026-07-01'],
          fallbacks: 'default',
          messages: [{ role: 'user', content: prompt }],
        },
        { signal },
      );
      stream.on('text', (d) => {
        full += d;
        onText?.(full);
      });
      const msg = await stream.finalMessage();
      if (msg.stop_reason === 'refusal') throw { code: 'refused' };
      return full;
    } catch (e) {
      throw mapApiError(e, c.Anthropic);
    }
  },

  /**
   * Agent run with page tools. tools: [{ name, description, input_schema, run(input) }]
   * Callbacks let the slide animate every call the moment it happens.
   */
  async agent({ task, rules, tools, onText, onToolStart, onToolEnd, signal, maxTurns = 8 }) {
    let seq = 0;
    const exec = async (tool, input) => {
      const id = ++seq;
      onToolStart?.({ id, name: tool.name, input });
      const bad = validate(tool, input);
      if (bad) {
        onToolEnd?.({ id, name: tool.name, input, error: bad });
        throw new Error(bad);
      }
      try {
        const result = await tool.run(input);
        onToolEnd?.({ id, name: tool.name, input, result });
        return result;
      } catch (err) {
        onToolEnd?.({ id, name: tool.name, input, error: String(err?.message || err) });
        throw err;
      }
    };

    const sample = await getSample();
    if (sample) {
      const lim = await sample.limits().catch(() => null);
      if (!lim?.tools) throw { code: 'tools_unavailable' };
      const { text } = await sample(`${rules}\n\n<vazifa>\n${task}\n</vazifa>`, {
        onText: ({ text }) => onText?.(text),
        signal,
        modelTier: 'quick',
        tools: tools.map((t) => ({
          name: t.name,
          description: t.description,
          inputSchema: t.input_schema,
          execute: (input) => exec(t, input),
        })),
      });
      return text;
    }

    const c = await client();
    if (!c) throw { code: 'offline' };
    const apiTools = tools.map((t) => ({ name: t.name, description: t.description, input_schema: t.input_schema, eager_input_streaming: true }));
    const messages = [{ role: 'user', content: task }];
    let full = '';
    try {
      for (let turn = 0; turn < maxTurns; turn++) {
        const stream = c.api.beta.messages.stream(
          {
            model: CONFIG.apiModel,
            max_tokens: 16000,
            system: rules,
            tools: apiTools,
            messages,
            output_config: { effort: 'low' },
            betas: ['server-side-fallback-2026-07-01'],
            fallbacks: 'default',
          },
          { signal },
        );
        stream.on('text', (d) => {
          full += d;
          onText?.(full);
        });
        let msg;
        try {
          msg = await stream.finalMessage();
        } catch (err) {
          if (err instanceof c.Anthropic.APIError) throw err;
          continue; // unparseable streamed tool input: re-issue the turn
        }
        if (msg.stop_reason === 'refusal') throw { code: 'refused' };
        if (msg.stop_reason === 'pause_turn') {
          messages.push({ role: 'assistant', content: msg.content });
          continue;
        }
        const uses = msg.content.filter((b) => b.type === 'tool_use');
        if (msg.stop_reason !== 'tool_use' || !uses.length) break;
        messages.push({ role: 'assistant', content: msg.content });
        const results = await Promise.all(
          uses.map(async (u) => {
            const tool = tools.find((t) => t.name === u.name);
            if (!tool) return { type: 'tool_result', tool_use_id: u.id, is_error: true, content: `Unknown tool ${u.name}` };
            try {
              const r = await exec(tool, u.input);
              return { type: 'tool_result', tool_use_id: u.id, content: typeof r === 'string' ? r : JSON.stringify(r) };
            } catch (err) {
              return { type: 'tool_result', tool_use_id: u.id, is_error: true, content: String(err?.message || err) };
            }
          }),
        );
        messages.push({ role: 'user', content: results });
        if (full) full += '\n\n';
      }
      return full;
    } catch (e) {
      throw mapApiError(e, c.Anthropic);
    }
  },
};
