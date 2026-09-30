// Everything the speaker may want to change without touching slide code.
export const CONFIG = {
  speaker: 'Shamsiddin',
  brand: 'Shams.labs',
  talkMinutes: 45,

  // QR on the bonus and final slides. Leave empty until the link exists:
  // the slide then shows a "tez orada" placeholder instead of a dead code.
  qrUrl: '',
  qrLabel: 'Skill-paketni yuklab olish',

  // Agent repositories picked later on GitHub. Each item: { name, url, note }.
  // While the list is empty the block stays hidden.
  repos: [],

  // Model for the offline "API key" mode of the live labs.
  apiModel: 'claude-sonnet-5-5',
};
