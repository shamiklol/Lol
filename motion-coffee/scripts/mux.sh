#!/usr/bin/env bash
# Two-pass loudnorm (-14 LUFS / -1.5 dBTP) + mux with the silent render.
set -euo pipefail
V=${1:-renders/final/video_silent_v1.mp4}; A=${2:-assets/music/mix_raw.wav}; OUT=${3:-renders/final/snachala_kofe_v1.mp4}
J=$(ffmpeg -hide_banner -i "$A" -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g(){ echo "$J" | python3 -c "import sys,json;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -y -loglevel error -i "$V" -i "$A" -map 0:v -map 1:a -c:v copy \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=48000" \
  -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart "$OUT"
echo "wrote $OUT"
