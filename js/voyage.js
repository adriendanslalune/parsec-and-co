// Parsec & Co : le voyage. Partir, voler (même appli fermée), arriver ; les nouveaux ports.
// Script classique : il partage ses variables avec les autres fichiers de js/ (voir l’ordre dans index.html).

// ===================== Ton vaisseau : partir, arriver =====================
function dureeVers(e) { return Math.max(5000, e.d * VITESSE / facteurVitesse()); }
function partir(e) {
  if (vol) { dire("<b>Tu es déjà en vol</b> vers " + (decouverts.get(vol.versId) || {}).nom + ". Arrivée dans " + dureeTxt(Math.max(0, vol.t1 - Date.now())) + "."); return; }
  if (Date.now() < blesse) { dire("<b>Convalescence.</b> Tu repars dans " + dureeTxt(blesse - Date.now()) + ". Le Guide recommande une tisane."); return; }
  const att = mondeEnAttente(); if (att && att.id !== e.id) { dire("<b>" + att.nom + " t’attend.</b> Finis d’abord là-bas. <button type=\"button\" data-fiche=\"" + att.id + "\">Y retourner</button>"); return; }
  const de = posteProche(e.x, e.y), duree = dureeVers(e);
  vol = { versId: e.id, deX: de.x, deY: de.y, t0: Date.now(), t1: Date.now() + duree }; sauver("parsec.vol", vol);
  bip(2);
  dire("<b>En route</b> vers " + e.nom + ", à " + fmtD(e.d) + " années-lumière. " + dureeTxt(duree) + ". Ça vole même si tu fermes le jeu.");
  document.getElementById("papier").dataset.mode = "trajet";
  boucleAnim();
}
let reprise = null;
function tickVol() {
  if (!vol) return;
  const e = decouverts.get(vol.versId);
  if (!e) { vol = null; sauver("parsec.vol", null); return; }
  if (Date.now() >= vol.t1) {
    vol = null; sauver("parsec.vol", null);
    if (!explores.has(e.id)) { const m = genererMonde(e); explores.set(m.id, m); sauver("parsec.explores", [...explores.values()]); majHud(); arriver(m); }
    else { const m = explores.get(e.id); m.vu = false; sauver("parsec.explores", [...explores.values()]); arriver(m); }
    document.getElementById("papier").dataset.mode = "";
  } else {
    const p = document.getElementById("papier");
    if (p.dataset.mode === "trajet") p.innerHTML = "<b>En route</b> vers " + e.nom + ". Arrivée dans <b>" + dureeTxt(Math.max(0, vol.t1 - Date.now())) + "</b>.";
  }
}
function positionVol() {
  if (!vol) return null; const e = decouverts.get(vol.versId); if (!e) return null;
  const u = Math.min(1, (Date.now() - vol.t0) / (vol.t1 - vol.t0));
  return { x: vol.deX + (e.x - vol.deX) * u, y: vol.deY + (e.y - vol.deY) * u, vers: e, dx: vol.deX, dy: vol.deY, reste: dureeTxt(Math.max(0, vol.t1 - Date.now())) };
}
function arriver(m) {
  if (reprise) { reprise.arrivees.push(m); return; }
  document.getElementById("fiche").classList.add("cache");
  bip(2);
  animerVers(m.x, m.y, Math.max(LPP_MIN, 0.0009 / Math.min(W, H) * 400), 2600);
  setTimeout(() => { carillon(); setTimeout(() => { if (m.exp && m.exp.finie) ouvrirFiche(m, true); else commencerExpedition(m); }, 500); }, 2700);
}

// ===================== Comptoirs : la vie =====================
function tickConvoi() {}
function positionConvoi() { return null; }
function nouveauComptoir(m) {
  majComptoirs(); voisins = voisinage(); majHud();
  dire("<b>" + m.nom + " est un port de la Compagnie.</b> Il tend l’oreille au vide pour toi.");
}
function ancienComptoir(m) {
  const avant = equipementColonies().length;
  majComptoirs(); voisins = voisinage(); majHud();
  const t = TYPE[m.type];
  if (equipementColonies().length > avant) { bip(4); dire("<b>" + m.nom + " est un comptoir de la Compagnie</b>, et tu en reviens équipé : <b>" + t.equip.nom + "</b>, " + t.equip.desc + ". Dans ta soute, pour toutes tes expéditions."); }
  else dire("<b>" + m.nom + " est un comptoir de la Compagnie.</b> Il écoute le noir avec les autres, et les navettes y passeront.");
}
