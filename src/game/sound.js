// Дуу: аудио файл ашиглахгүй, WebAudio-ийн oscillator-оор богино «beep» үүсгэнэ.
// Анхны утга OFF. Хөтөч дууг хэрэглэгч товч дарсны дараа л зөвшөөрдөг тул
// AudioContext-ийг анх дуу асаах үед үүсгэнэ.
let ctx = null;
let enabled = false;

export function setSoundEnabled(on) {
  enabled = on;
  if (on && !ctx) ctx = new AudioContext();
}

// freq = давтамж (Hz), ms = үргэлжлэх хугацаа
export function beep(freq, ms = 90) {
  if (!enabled || !ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.06, ctx.currentTime); // чимээ бага
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ms / 1000);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + ms / 1000);
}
