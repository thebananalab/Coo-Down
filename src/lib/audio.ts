// Audio 8-bit generado con WebAudio (sin assets externos).

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicGain: GainNode | null = null;
let sfxGain: GainNode | null = null;
let loopTimer: ReturnType<typeof setTimeout> | null = null;
let started = false;
let isMuted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
    musicGain = ctx.createGain();
    musicGain.gain.value = 0.16;
    musicGain.connect(master);
    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.35;
    sfxGain.connect(master);
  }
  return ctx;
}

function note(
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType,
  gain: number,
  dest: GainNode,
) {
  const c = ctx!;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(dest);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

// Melodía chiptune alegre en La menor / Do mayor
const MELODY = [
  523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880.0, 698.46, 523.25, 659.25, 783.99, 1046.5,
  987.77, 783.99, 659.25, 587.33,
];
const BASS = [130.81, 130.81, 174.61, 174.61, 196.0, 196.0, 174.61, 146.83];
const STEP = 0.24;

function scheduleBar(at: number) {
  if (!ctx || !musicGain) return;
  for (let i = 0; i < MELODY.length; i++) {
    note(MELODY[i]!, at + i * STEP, STEP * 0.8, "square", 0.25, musicGain);
  }
  for (let i = 0; i < BASS.length; i++) {
    note(BASS[i]!, at + i * STEP * 2, STEP * 1.6, "triangle", 0.4, musicGain);
  }
}

export function startMusic() {
  const c = getCtx();
  if (!c) return;

  // iOS Safari (and some Android WebViews) create the AudioContext in a
  // "suspended" state and only let it start once `resume()` — called from
  // inside a user-gesture handler, as this always is — actually resolves.
  // Scheduling notes before that resolves can get silently dropped, so wait
  // for it. Leave `started` false until playback truly begins, so a resume()
  // that fails (or never resolves) doesn't block the next tap from retrying.
  if (started) {
    if (c.state === "suspended") void c.resume();
    return;
  }

  const begin = () => {
    if (started) return;
    started = true;
    const barLen = MELODY.length * STEP;
    const run = () => {
      scheduleBar(c.currentTime + 0.05);
      loopTimer = setTimeout(run, barLen * 1000);
    };
    run();
  };

  if (c.state === "running") {
    begin();
  } else {
    c.resume().then(begin).catch(() => {});
  }
}

export function stopMusic() {
  if (loopTimer) clearTimeout(loopTimer);
  loopTimer = null;
  started = false;
}

export function setMuted(muted: boolean) {
  const c = getCtx();
  if (!c || !master) return;
  master.gain.setTargetAtTime(muted ? 0 : 0.9, c.currentTime, 0.02);
}

// Aleteo/espanto
export function playFlap() {
  const c = getCtx();
  if (!c || !sfxGain) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(320 + Math.random() * 180, t);
  osc.frequency.exponentialRampToValueAtTime(1100, t + 0.12);
  g.gain.setValueAtTime(0.2, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  osc.connect(g);
  g.connect(sfxGain);
  osc.start(t);
  osc.stop(t + 0.2);

  // ruido corto de alas
  const len = Math.floor(c.sampleRate * 0.12);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = c.createBufferSource();
  const ng = c.createGain();
  ng.gain.value = 0.12;
  src.buffer = buf;
  src.connect(ng);
  ng.connect(sfxGain);
  src.start(t);
}

export function playFanfare() {
  const c = getCtx();
  if (!c || !sfxGain) return;
  const t = c.currentTime + 0.05;
  const seq = [523.25, 659.25, 783.99, 1046.5, 1318.51];
  seq.forEach((f, i) => note(f, t + i * 0.12, 0.3, "square", 0.3, sfxGain!));
}
