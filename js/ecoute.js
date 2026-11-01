// Parsec & Co : scruter le vide. Le ping, puis l’antenne.
// Script classique : il partage ses variables avec les autres fichiers de js/ (voir l’ordre dans index.html).

// ===================== Écouter : le ping, puis l’antenne =====================
let signal = null, cercles = [], flash = null, radio = null, choixPoste = false;
const RADIO_SIGMA = 10 * Math.PI / 180, RADIO_TOL = 3 * Math.PI / 180;
function voisinage() {
  const vus = new Map();
  for (const c of colonies.values()) for (let L = 0; L < L_BROUILLARD; L++) {
    const s = TAILLE_0 * Math.pow(2, L);
    for (let i = Math.floor((c.x - PORTEE) / s); i <= Math.floor((c.x + PORTEE) / s); i++) for (let j = Math.floor((c.y - PORTEE) / s); j <= Math.floor((c.y + PORTEE) / s); j++) for (const e of etoilesCellule(L, i, j)) {
      const d = Math.hypot(e.x - c.x, e.y - c.y);
      if (d > 2.5 && d < PORTEE * 0.8 && (!vus.has(e.id) || vus.get(e.id).d > d)) vus.set(e.id, { ...e, d });
    }
  }
  return [...vus.values()].sort((a, b) => a.d - b.d);
}
let voisins = voisinage();
function posteProche(x, y) { let best = null, bd = Infinity; for (const c of colonies.values()) { const d = Math.hypot(c.x - x, c.y - y); if (d < bd) { bd = d; best = c; } } return best; }
function prochainSignal(poste) {
  const restants = voisins.map(e => ({ ...e, d: Math.hypot(e.x - poste.x, e.y - poste.y) })).filter(e => !decouverts.has(e.id) && e.d > 2.5 && e.d < PORTEE * 0.8).sort((a, b) => a.d - b.d);
  if (!restants.length) return null;
  return restants[Math.floor(hash(decouverts.size, 3, 5, seed) * Math.min(4, restants.length))];
}
function mondeEnAttente() { for (const m of explores.values()) if (!m.vu) return m; return null; }
const btnPing = document.getElementById("btnPing");
function ecouter() {
  const att = mondeEnAttente();
  if (att) { dire("<b>" + att.nom + " t’attend.</b> On ne repart pas écouter le noir sans avoir fini avec le dernier monde. <button type=\"button\" data-fiche=\"" + att.id + "\">Y retourner</button>"); return; }
  if (colonies.size === 1) { ecouterDepuis(colonies.get("home")); return; }
  choixPoste = true;
  dire("<b>Depuis où ?</b> Touche la colonie qui doit tendre l’oreille. Chacune entend ses propres voisines.");
  demander();
}
function ecouterDepuis(poste) {
  choixPoste = false;
  signal = prochainSignal(poste);
  if (!signal) { dire("<b>Silence autour de " + poste.nom + ".</b> Tout ce qu’elle peut entendre est déjà sur la carte. Essaie depuis une autre colonie, ou fonde plus loin."); return; }
  cercles = [{ x: poste.x, y: poste.y, r: Math.hypot(signal.x - poste.x, signal.y - poste.y), t0: performance.now() }]; flash = null;
  bip(1);
  radio = { poste, ang: hash(decouverts.size, 9, 9, seed) * Math.PI * 2 };
  demarrerRadio();
  animerVers(poste.x, poste.y, Math.max(LPP_MIN, signal.d * 2.6 / Math.min(W, H)), 900);
  btnPing.innerHTML = ico("viseur") + "Verrouiller";
  dire("<b>Un signal.</b> " + poste.nom + " capte quelque chose à <b>" + fmtD(signal.d) + " années-lumière</b>, direction inconnue : une des étoiles que le cercle traverse. Fais glisser ton doigt autour de " + poste.nom + " pour tourner l’antenne, et écoute : du souffle à côté, un son clair sur l’étoile. Quand c’est net, verrouille.");
  boucleAnim();
}
function ecartRadio() { if (!radio || !signal) return Math.PI; const cible = Math.atan2(signal.y - radio.poste.y, signal.x - radio.poste.x); let d = radio.ang - cible; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return Math.abs(d); }
function forceRadio() { const d = ecartRadio(); return Math.exp(-(d * d) / (2 * RADIO_SIGMA * RADIO_SIGMA)); }
function verrouiller() {
  if (!radio || !signal) return;
  if (ecartRadio() <= RADIO_TOL) { arreterRadio(); radio = null; reveler(); }
  else if (forceRadio() > 0.5) dire("<b>Presque.</b> Le signal est là, mais encore flou. Affine d’un cheveu.");
  else dire("<b>Rien que du souffle</b> dans cette direction. Continue de tourner.");
}
function reveler() {
  const e = { id: signal.id, x: signal.x, y: signal.y, nom: signal.nom, c: signal.c, b: signal.b, d: signal.d };
  decouverts.set(e.id, e); sauver("parsec.decouverts", [...decouverts.values()]);
  flash = { x: e.x, y: e.y, t0: performance.now() };
  bip(4); signal = null;
  btnPing.innerHTML = ico("antenne") + "Scruter le vide";
  dire("<b>" + e.nom + ".</b> Une étoile, à <b>" + fmtD(e.d) + " années-lumière</b>. Elle est à toi sur la carte, pour toujours. Touche-la pour y aller.");
  boucleAnim();
}
brancher(() => btnPing.addEventListener("click", () => { if (radio) verrouiller(); else ecouter(); }));
