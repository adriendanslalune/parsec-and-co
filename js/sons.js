// Parsec & Co : les sons, tous synthétisés (bips, carillon, radio de l’antenne).
// Script classique : il partage ses variables avec les autres fichiers de js/ (voir l’ordre dans index.html).

// ===================== Sons =====================
let audio = null, radioNodes = null;
function ctxAudio() { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); if (audio.state === "suspended") audio.resume(); return audio; }
function bip(n) { try { const a = ctxAudio(), o = a.createOscillator(), g = a.createGain(); o.type = "sine"; o.frequency.setValueAtTime(n === 4 ? 880 : 520 + n * 60, a.currentTime); o.frequency.exponentialRampToValueAtTime(n === 4 ? 1320 : 380, a.currentTime + 0.35); g.gain.setValueAtTime(0.0001, a.currentTime); g.gain.exponentialRampToValueAtTime(0.18, a.currentTime + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.5); o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + 0.55); } catch (e) {} }
function bipSourd() { try { const a = ctxAudio(), o = a.createOscillator(), g = a.createGain(); o.type = "triangle"; o.frequency.setValueAtTime(140, a.currentTime); o.frequency.exponentialRampToValueAtTime(70, a.currentTime + 0.3); g.gain.setValueAtTime(0.0001, a.currentTime); g.gain.exponentialRampToValueAtTime(0.2, a.currentTime + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.4); o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + 0.45); } catch (e) {} }
function tic() { try { const a = ctxAudio(), o = a.createOscillator(), g = a.createGain(), t = a.currentTime; o.type = "square"; o.frequency.setValueAtTime(1900, t); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.035, t + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03); o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 0.04); } catch (e) {} }
function carillon() { try { const a = ctxAudio(); [523, 659, 784].forEach((f, k) => { const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + k * 0.16; o.type = "triangle"; o.frequency.setValueAtTime(f, t); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9); o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 1); }); } catch (e) {} }
function demarrerRadio() {
  try {
    const a = ctxAudio(); if (radioNodes) return;
    const buf = a.createBuffer(1, a.sampleRate * 2, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.6;
    const bruit = a.createBufferSource(); bruit.buffer = buf; bruit.loop = true;
    const filtre = a.createBiquadFilter(); filtre.type = "bandpass"; filtre.frequency.value = 1200; filtre.Q.value = 0.7;
    const gB = a.createGain(); gB.gain.value = 0.0001; const ton = a.createOscillator(); ton.type = "sine"; ton.frequency.value = 660; const gT = a.createGain(); gT.gain.value = 0.0001;
    bruit.connect(filtre); filtre.connect(gB); gB.connect(a.destination); ton.connect(gT); gT.connect(a.destination); bruit.start(); ton.start();
    radioNodes = { bruit, ton, gB, gT };
  } catch (e) {}
}
function majRadioAudio(force) { if (!radioNodes) return; const t = audio.currentTime; radioNodes.gB.gain.setTargetAtTime(0.0001 + 0.12 * (1 - force), t, 0.05); radioNodes.gT.gain.setTargetAtTime(0.0001 + 0.14 * force * force, t, 0.05); radioNodes.ton.frequency.setTargetAtTime(520 + 300 * force, t, 0.05); }
function arreterRadio() { if (!radioNodes) return; try { const t = audio.currentTime; radioNodes.gB.gain.setTargetAtTime(0.0001, t, 0.05); radioNodes.gT.gain.setTargetAtTime(0.0001, t, 0.05); radioNodes.bruit.stop(t + 0.4); radioNodes.ton.stop(t + 0.4); } catch (e) {} radioNodes = null; }
