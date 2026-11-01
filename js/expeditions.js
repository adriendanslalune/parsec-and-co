// Parsec & Co : le moteur des expéditions. Les mondes eux-mêmes (fiche et histoire) sont dans mondes/, un fichier par type.
// Script classique : il partage ses variables avec les autres fichiers de js/ (voir l’ordre dans index.html).

// ===================== Types de mondes =====================
// chaque fichier mondes/<type>.js appelle monde({…}) pour sa fiche, puis histoire(…) pour son expédition
const TYPES = [], TYPE = {};
const RARETES = { commun: 70, insolite: 20, rare: 8, legendaire: 2 };   // part des tirages, en %
function monde(d) {
  const t = { k: d.cle, nom: d.nom, rarete: d.rarete || "commun", poids: d.poids || 1, danger: d.danger, c1: d.couleurs[0], c2: d.couleurs[1], sol: d.sol, desc: d.guide };
  TYPES.push(t); TYPE[t.k] = t;
}
// on tire la rareté (parts fixes), puis le type selon son poids parmi tous les types de cette rareté ;
// un type sans image n’entre pas encore dans la galaxie : il laisse sa place à un commun, sans prendre celle des autres
function tirerType(h) {
  const illustre = t => (ILLUSTRATIONS[t.k] || 0) > 0;
  const choisirDans = (pool, x) => { let y = x * pool.reduce((s, t) => s + t.poids, 0); for (const t of pool) { y -= t.poids; if (y <= 0) return t; } return pool[pool.length - 1]; };
  const rar = Object.keys(RARETES);
  let x = h(5) * rar.reduce((s, r) => s + RARETES[r], 0), r = rar[0];
  for (const c of rar) { x -= RARETES[c]; if (x <= 0) { r = c; break; } }
  const pool = TYPES.filter(t => t.rarete === r);
  const type = pool.length ? choisirDans(pool, h(1)) : null;
  if (type && illustre(type)) return type;
  let communs = TYPES.filter(t => t.rarete === "commun" && illustre(t));
  if (!communs.length) communs = TYPES.filter(t => t.rarete === "commun");
  return choisirDans(communs, h(1));
}
const OUVERTURES = ["Le Guide dit :", "D’après le Guide,", "Le Guide, sobrement :", "Extrait du Guide, page 4 081 :", "Le Guide note, sans s’émouvoir :"];
function genererMonde(e) {
  const h = (a) => hash(Math.round(e.x * 1000), Math.round(e.y * 1000), a, seed + 99);
  const type = tirerType(h);
  const danger = type.danger[0] + Math.floor(h(2) * (type.danger[1] - type.danger[0] + 1));
  return { id: e.id, nom: e.nom, x: e.x, y: e.y, d: e.d, type: type.k, titre: type.nom, danger, c1: type.c1, c2: type.c2,
    texte: OUVERTURES[Math.floor(h(3) * OUVERTURES.length)] + " " + e.nom + ", c’est " + type.desc[Math.floor(h(4) * type.desc.length)] + ".", trouve: Date.now(), journal: [] };
}

// ===================== Les scènes d’expédition (briques) =====================
// Chaque scène : t (texte), a (prudent), b (audacieux : réussite/échec selon le danger), o (si on sort le bon objet de la soute)
// la trouvaille est un objet de palier 1 de sa série ; ces phrases disent d’où il vient
const PROVENANCES = {
  epaves: ["une tuyère corrodée gravée dans une langue à quatorze voyelles", "un siège de pilote pour une créature à trois fesses", "une boîte noire qui ne contient que des excuses", "un hublot encore embué de l’intérieur"],
  fossiles: ["une empreinte de quelque chose qui marchait en rond", "une coquille en spirale dans le mauvais sens", "une dent, et au vu de la taille, une seule suffit", "une fleur de pierre qui regarde encore une étoile éteinte"],
  reliques: ["une pièce de monnaie dont les deux faces disent « pile »", "un panneau indiquant une sortie qui n’a jamais existé", "une statue d’un dirigeant visiblement surpris", "un ticket de parking encore valable, techniquement"],
  bizarreries: ["un caillou qui pèse plus lourd quand on le regarde", "une flaque qui reflète hier", "un son, conservé dans un bocal", "une ombre sans propriétaire, en bon état"]
};
// les histoires : chaque fichier mondes/<type>.js appelle histoire(type, titre, [3 scènes]) ; on les range ici sous forme compacte
// t (texte), a (prudent), b (audacieux : réussite/échec), o ([série, texte si on sort un objet de cette série]),
// r (rappel : la phrase qui ouvre la scène selon le choix d’avant : prudent, reussite, echec ou objet)
const HISTOIRES = {};
function histoire(type, titre, liste) {
  (HISTOIRES[type] = HISTOIRES[type] || []).push({ titre, scenes: liste.map(s => ({ t: s.situation, a: [s.prudent.choix, s.prudent.resultat], b: [s.risque.choix, s.risque.reussite, s.risque.echec], o: [s.objet.serie, s.objet.resultat], r: s.rappel || {} })) });
}
function histoireDe(m) { const hs = HISTOIRES[m.type] || HISTOIRES.rocheux; return hs[Math.min(m.exp.h || 0, hs.length - 1)]; }
function choisir(arr, h) { return arr[Math.floor(h * arr.length)]; }
function texte(s, m, objet) {
  return accords(s, objet, m._trouvaille && m._trouvaille.objet).replace(/\{nom\}/g, m.nom).replace(/\{joueur\}/g, joueur.nom).replace(/\{objet\}/g, objet ? objet.nom : "l’objet")
    .replace(/\{trouvaille\}/g, "<b>" + (m._trouvaille ? m._trouvaille.texte : "quelque chose") + "</b>");
}
function tirerTrouvaille(m, k) {
  const h = (a) => hash(Math.round(m.x * 1000), Math.round(m.y * 1000), a + k * 10, seed + 7);
  const series = Object.keys(PROVENANCES), s = choisir(series, h(1)), idx = Math.floor(h(2) * PROVENANCES[s].length), objet = objetPalier(s, 1);
  return { serie: s, serieNom: SERIE_NOM[s], idx, texte: objet.nom, provenance: PROVENANCES[s][idx], objet };
}

// ===================== L’expédition : vivre un monde =====================
function commencerExpedition(m) {
  // une histoire tirée parmi celles du type de monde, ses scènes dans l’ordre
  if (!m.exp) {
    const h = (a) => hash(Math.round(m.x * 1000), Math.round(m.y * 1000), a, seed + 31), hs = HISTOIRES[m.type] || HISTOIRES.rocheux, k = Math.floor(h(1) * hs.length);
    m.exp = { h: k, scenes: hs[k].scenes.map((s, i) => i), choix: [], i: 0, journal: [], finie: false };
    sauver("parsec.explores", [...explores.values()]);
  }
  // une expédition commencée du temps des scènes indépendantes reprend l’histoire là où elle en était
  else if (!m.exp.finie && !m.exp.choix) {
    m.exp.h = 0; m.exp.scenes = histoireDe(m).scenes.map((s, i) => i); m.exp.choix = [];
    sauver("parsec.explores", [...explores.values()]);
  }
  ouvrirExpedition(m);
}
function ouvrirExpedition(m) {
  const page = document.getElementById("page");
  const exp = m.exp;
  if (exp.i >= exp.scenes.length) { exp.finie = true; const neuf = !m.vu; m.vu = true; sauver("parsec.explores", [...explores.values()]); if (neuf) nouveauComptoir(m); ouvrirFiche(m, true); return; }
  const hist = histoireDe(m), sc = hist.scenes[exp.scenes[exp.i]], rappel = exp.i > 0 && sc.r[(exp.choix || [])[exp.i - 1]];
  m._trouvaille = tirerTrouvaille(m, exp.i);
  let html = mast() + "<div class=\"image\"><canvas id=\"cvFiche\" width=\"520\" height=\"340\"></canvas><div class=\"manchette\">" + hist.titre + " · " + (exp.i + 1) + "/" + exp.scenes.length + "</div></div>";
  html += "<div class=\"texte\"><h2>" + m.nom + "</h2><div class=\"sous\">" + m.titre + ", danger " + "●".repeat(m.danger) + "○".repeat(5 - m.danger) + "</div>";
  for (const j of exp.journal) html += "<div class=\"journal\">" + j + "</div>";
  html += "<p>" + (rappel ? "<i>" + texte(rappel, m) + "</i> " : "") + texte(sc.t, m) + "</p>";
  html += "<div class=\"choix\"><button type=\"button\" data-choix=\"a\">" + texte(sc.a[0], m) + "</button><button type=\"button\" class=\"ping\" data-choix=\"b\">" + texte(sc.b[0], m) + " <span class=\"gris\">(risqué)</span></button>";
  const objets = [...soute];
  if (objets.length) html += "<button type=\"button\" class=\"second\" id=\"ouvrirSoute\">Sortir un objet de la soute…</button>";
  html += "</div><div id=\"listeSoute\"></div></div>";
  page.innerHTML = html;
  dessinerPlanete(document.getElementById("cvFiche"), m);
  illustrer([illustrationDe(m), m.type]);
  document.getElementById("fiche").classList.remove("cache");
  page.querySelectorAll("button[data-choix]").forEach(b => b.addEventListener("click", () => resoudre(m, sc, b.dataset.choix, null)));
  const bs = document.getElementById("ouvrirSoute");
  if (bs) bs.addEventListener("click", () => {
    const ls = document.getElementById("listeSoute");
    const nb = objets.map(o => "<button type=\"button\" data-objet=\"" + o.id + "\">" + o.nom + " <span class=\"gris\">· " + o.serieNom + ", palier " + (o.palier || 1) + "</span></button>").join("");
    ls.innerHTML = "<p class=\"gris\">Cette scène répond à la série <b>" + SERIE_NOM[sc.o[0]] + "</b> : un objet de cette série la fait basculer. N’importe quel objet de palier 2 ou plus garantit le choix risqué. L’objet y reste.</p><div class=\"liste\">" + nb + "</div>";
    ls.querySelectorAll("button[data-objet]").forEach(b => b.addEventListener("click", () => { const o = objets.find(x => x.id === b.dataset.objet); resoudre(m, sc, "o", o); }));
  });
}
// le risque raté : on repart les mains vides, avec une réplique, et l’expédition continue
const RATES = [
  "Le médecin de bord, un grille-pain diplômé par correspondance, te prescrit une tartine. Tu repars, la tartine à la main.",
  "Ton scaphandre a déposé une réclamation officielle. Tu la signes sans la lire, comme tout le monde.",
  "La Compagnie rappelle que les bosses ne sont pas couvertes par ton contrat. Tu repars quand même, {toi:cabossé|cabossée} de partout.",
  "Le Guide classe l’incident dans la rubrique « ça arrive ». Tu repars, un peu plus humble qu’avant.",
  "Le vaisseau te passe de la musique douce pendant trente secondes. C’est tout ce qu’il peut faire. Ça suffit.",
  "Tu as été {toi:déclaré « un peu cabossé »|déclarée « un peu cabossée »} par le pilote automatique, qui ne sait pas mentir. Tu repars."
];
function resoudre(m, sc, choix, objet) {
  const exp = m.exp; let ligne = "", gagne = null, rate = false, xp = 1, fait = "prudent";   // fait : ce dont la scène suivante se souviendra
  if (choix === "o") {
    if (objet && sc.o && objet.serie === sc.o[0]) { soute = soute.filter(x => x.id !== objet.id); sauver("parsec.soute", soute); ligne = "<b>Tu sors " + objet.nom + ".</b> " + texte(sc.o[1], m, objet) + " <span class=\"gris\">(" + objet.nom + " y est " + accords("{objet:resté|restée}", objet) + ".)</span>"; gagne = m._trouvaille; xp = (objet.palier || 1) >= 3 ? 4 : 2; fait = "objet"; }
    else if (objet && objet.tag === "artefact" && (objet.palier || 1) >= 2) {
      soute = soute.filter(x => x.id !== objet.id); sauver("parsec.soute", soute);
      ligne = "<b>Tu sors " + objet.nom + ".</b> " + texte(sc.b[0], m) + ", et avec ça en main, rien ne peut mal tourner. " + texte(sc.b[1], m) + " <span class=\"gris\">(" + objet.nom + " y est " + accords("{objet:resté|restée}", objet) + ".)</span>";
      gagne = m._trouvaille; xp = (objet.palier || 1) >= 3 ? 4 : 2; fait = "reussite";
    }
    else { ligne = "<b>Tu sors " + (objet ? objet.nom : "quelque chose") + ".</b> " + accords("Tu {objet:le|la} regardes, la scène {objet:le|la} regarde, et rien ne se passe. Tu {objet:le|la} ranges avec dignité. Il faut quand même choisir.", objet); exp.journal.push(ligne); sauver("parsec.explores", [...explores.values()]); ouvrirExpedition(m); return; }
  } else if (choix === "a") { ligne = "<b>" + texte(sc.a[0], m) + ".</b> " + texte(sc.a[1], m); }
  else {
    const echec = Math.random() * 100 < 7 * m.danger;   // 7 % par point de danger
    if (echec) { ligne = "<b>" + texte(sc.b[0], m) + ".</b> " + texte(sc.b[2], m); rate = true; xp = 1; fait = "echec"; }
    else { ligne = "<b>" + texte(sc.b[0], m) + ".</b> " + texte(sc.b[1], m); gagne = m._trouvaille; xp = 2; fait = "reussite"; }
  }
  if (gagne) { const ob = gagne.objet; soute.push({ id: "art-" + m.id + "-" + exp.i + "-" + Date.now(), nom: ob.nom, tag: "artefact", serie: ob.serie, serieNom: ob.serieNom, palier: 1, de: m.nom, provenance: gagne.provenance, usage: "objet" }); sauver("parsec.soute", soute); carillon(); ligne += " <span class=\"gris\">(Dans la soute : " + ob.nom + ". Provenance : " + gagne.provenance + ".)</span>"; }
  else if (rate) { bipSourd(); ligne += " <span class=\"gris\">" + accords(RATES[Math.floor(Math.random() * RATES.length)]) + "</span>"; }
  else bip(1);
  exp.journal.push(ligne); (exp.choix = exp.choix || [])[exp.i] = fait; exp.i += 1;
  gagnerXp(xp);
  sauver("parsec.explores", [...explores.values()]);
  majHud();
  ouvrirExpedition(m);
}
