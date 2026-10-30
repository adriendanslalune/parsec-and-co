// Parsec & Co : le moteur des expéditions. Les scènes elles-mêmes sont dans mondes/, un fichier par type de monde.
// Script classique : il partage ses variables avec les autres fichiers de js/ (voir l’ordre dans index.html).

// ===================== Types de mondes =====================
const TYPES = [
  { k: "rocheux", nom: "Monde rocheux", poids: 22, c1: "#8d7b6e", c2: "#4a3f3a", danger: [1, 3], desc: ["des cailloux, puis d’autres cailloux, puis une vallée, remplie de cailloux", "une surface grise qui a décidé très tôt de ne pas faire d’efforts", "un relief si monotone que les géologues y pleurent d’ennui, puis de joie, puis d’ennui"] },
  { k: "gazeux", nom: "Géante gazeuse", poids: 16, c1: "#e8c38a", c2: "#9a6a3c", danger: [2, 4], desc: ["une boule de gaz de la taille d’une mauvaise idée, avec des tempêtes qui durent plus longtemps que la plupart des civilisations", "des bandes de nuages couleur café au lait, sans surface où poser quoi que ce soit, ni même une opinion", "un endroit où « atterrir » n’est pas un verbe mais une façon de mourir"] },
  { k: "desert", nom: "Monde désertique", poids: 14, c1: "#f0c78a", c2: "#b8763a", danger: [1, 3], desc: ["du sable, de la chaleur, et une seule dune qui ressemble un peu à une autre dune", "un désert si vaste que le vent lui-même s’y perd et revient demander son chemin", "deux soleils, zéro ombre, et un silence qu’on entend d’ici"] },
  { k: "glace", nom: "Monde glacé", poids: 14, c1: "#d9eef5", c2: "#6e9fc0", danger: [1, 3], desc: ["de la glace jusqu’à l’horizon, puis, après l’horizon, de la glace", "un monde qui craque la nuit comme une vieille maison, en beaucoup plus grand et sans personne pour s’en inquiéter", "des falaises bleues, un froid honnête, et nulle part où acheter des gants"] },
  { k: "volcan", nom: "Monde volcanique", poids: 9, c1: "#f27c4a", c2: "#3a1f1c", danger: [3, 5], desc: ["des volcans qui n’ont jamais entendu parler du concept de pause", "une croûte mince comme une excuse, et dessous, de la lave qui attend", "un ciel orange, une odeur d’œuf, et des paysages magnifiques pour qui aime regarder vite"] },
  { k: "toxique", nom: "Monde toxique", poids: 8, c1: "#b7d36a", c2: "#4d5a2a", danger: [3, 5], desc: ["une atmosphère verdâtre qui dissout les sondes, les espoirs, et les paragraphes trop longs", "des lacs jaunes dont la Compagnie déconseille formellement de goûter l’eau, par expérience", "un monde où respirer est une mauvaise habitude que l’on perd vite"] },
  { k: "crateres", nom: "Monde criblé", poids: 10, c1: "#a9a3a0", c2: "#3e3b3a", danger: [1, 2], desc: ["des cratères dans des cratères, comme si quelqu’un avait raté le même coup de poing pendant un milliard d’années", "une surface morte, calme, et parfaitement reposante pour qui ne tient pas à la vie", "le genre d’endroit où on retrouve ses clefs tout de suite, parce qu’il n’y a rien d’autre"] },
  { k: "ocean", nom: "Monde océan", poids: 3, c1: "#5fb8c9", c2: "#1f4a7a", danger: [1, 2], desc: ["de l’eau partout, très profonde, avec dedans quelque chose de grand qui n’a pas encore donné son nom", "un océan turquoise sans aucune île, ce qui rend les cartes très simples et les naufrages très longs", "des vagues lentes, chaudes, et un plancton qui brille la nuit en formant des mots qu’on préfère ne pas lire"] },
  { k: "jungle", nom: "Monde jungle", poids: 2, c1: "#6fbf73", c2: "#1f4a2c", danger: [2, 3], desc: ["une forêt si dense qu’on y entre debout et qu’on en sort digéré", "des arbres hauts comme des tours, et au sommet, d’autres arbres, qui semblent au courant", "tout y pousse, tout y mange, et tout y sourit, ce qui est le plus inquiétant"] },
  { k: "tempere", nom: "Monde tempéré", poids: 2, c1: "#9fd6a8", c2: "#3b6fb0", danger: [0, 1], desc: ["des prairies, des rivières, un climat raisonnable : la Compagnie y voit déjà des impôts", "un monde si agréable qu’on se demande ce qu’il cache, et la réponse est : rien, c’est pire", "des saisons, des oiseaux, et une lumière du soir qui ferait pleurer un expert-comptable"] },
  { k: "etrange", nom: "Monde étrange", poids: 2, c1: "#d7a8f0", c2: "#4a2a7a", danger: [2, 4], desc: ["des montagnes de cristal qui chantent quand on passe, faux, mais avec conviction", "la gravité y change d’avis deux fois par jour, et les habitants, s’il y en a, ne s’en formalisent plus", "un monde dont les anneaux projettent une ombre qui met trois heures à arriver au sol et repart vexée"] },
  { k: "habite", nom: "Monde habité", poids: 2, c1: "#f7d774", c2: "#7a4a2a", danger: [2, 5], desc: ["des lumières la nuit, des villes le jour, et une civilisation qui nous regarde arriver avec l’expression de quelqu’un dont on sonne à la porte pendant le dîner", "quelqu’un y vit déjà, construit déjà, et a déjà un avis sur nous", "une espèce intelligente, polie, et visiblement en train de prendre des notes"] }
];
const POIDS_TOTAL = TYPES.reduce((s, t) => s + t.poids, 0);
const OUVERTURES = ["Le Guide dit :", "D’après le Guide,", "Le Guide, sobrement :", "Extrait du Guide, page 4 081 :", "Le Guide note, sans s’émouvoir :"];
function genererMonde(e) {
  const h = (a) => hash(Math.round(e.x * 1000), Math.round(e.y * 1000), a, seed + 99);
  let tirage = h(1) * POIDS_TOTAL, type = TYPES[0];
  for (const t of TYPES) { tirage -= t.poids; if (tirage <= 0) { type = t; break; } }
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
  if (Date.now() < blesse && exp.i < exp.scenes.length) { fermer(); dire("<b>Convalescence.</b> " + m.nom + " attendra que tu sois sur pied, encore " + dureeTxt(blesse - Date.now()) + ". Le Guide recommande une tisane et un plaid."); return; }
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
  illustrer([m.type + "-" + (exp.h ? exp.h + 1 + "-" : "") + (exp.scenes[exp.i] + 1), m.type]);
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
function resoudre(m, sc, choix, objet) {
  const exp = m.exp; let ligne = "", gagne = null, blessure = 0, xp = 1, fait = "prudent";   // fait : ce dont la scène suivante se souviendra
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
    const echec = Math.random() * 100 < 12 * m.danger;
    if (echec) { ligne = "<b>" + texte(sc.b[0], m) + ".</b> " + texte(sc.b[2], m); blessure = (5 + 5 * m.danger) * 60 * 1000; xp = 1; fait = "echec"; }
    else { ligne = "<b>" + texte(sc.b[0], m) + ".</b> " + texte(sc.b[1], m); gagne = m._trouvaille; xp = 2; fait = "reussite"; }
  }
  if (gagne) { const ob = gagne.objet; soute.push({ id: "art-" + m.id + "-" + exp.i + "-" + Date.now(), nom: ob.nom, tag: "artefact", serie: ob.serie, serieNom: ob.serieNom, palier: 1, de: m.nom, provenance: gagne.provenance, usage: "objet" }); sauver("parsec.soute", soute); carillon(); ligne += " <span class=\"gris\">(Dans la soute : " + ob.nom + ". Provenance : " + gagne.provenance + ".)</span>"; }
  else if (blessure) { blesse = Math.max(blesse, Date.now() + blessure); sauver("parsec.blesse", blesse); bipSourd(); }
  else bip(1);
  exp.journal.push(ligne); (exp.choix = exp.choix || [])[exp.i] = fait; exp.i += 1;
  gagnerXp(xp);
  sauver("parsec.explores", [...explores.values()]);
  majHud();
  if (blessure) {
    fermer(); majBlessure();
    const REPOS = [
      "Le médecin de bord, un grille-pain diplômé par correspondance, te prescrit {d} de repos et une tartine.",
      "Ton scaphandre a déposé une réclamation officielle. Délai de traitement : {d}. Tu restes {toi:allongé|allongée} en attendant.",
      "La Compagnie rappelle que les blessures ne sont pas couvertes par ton contrat. Le canapé de la cabine, si. {d}.",
      "Le Guide classe l’incident dans la rubrique « ça arrive ». Repos forcé : {d}, sous plaid réglementaire.",
      "Le vaisseau a mis de la musique douce et refuse de décoller pendant {d}. Il dit que c’est pour ton bien.",
      "Tu as été {toi:déclaré « un peu cabossé »|déclarée « un peu cabossée »} par le pilote automatique, qui ne sait pas mentir. Repos : {d}."
    ];
    dire("<b>Retour au vaisseau, en pièces détachées.</b> " + texte(sc.b[2], m) + " " + accords(REPOS[Math.floor(Math.random() * REPOS.length)]).replace("{d}", dureeTxt(blessure)) + " " + m.nom + " t’attendra.");
    return;
  }
  ouvrirExpedition(m);
}
// la convalescence : le bouton l’affiche, et tout attend
let etaitBlesse = Date.now() < blesse;
function majBlessure() {
  if (Date.now() < blesse) {
    etaitBlesse = true;
    if (!radio) { btnPing.disabled = true; btnPing.innerHTML = ico("lune") + "Repos forcé, encore " + dureeTxt(blesse - Date.now()); }
  } else if (etaitBlesse) {
    etaitBlesse = false; btnPing.disabled = false; btnPing.innerHTML = ico("antenne") + "Scruter le vide";
    const att = mondeEnAttente();
    carillon();
    dire("<b>" + accords("{toi:Remis|Remise}") + " sur pied.</b> " + (att ? att.nom + " t’attend. <button type=\"button\" data-fiche=\"" + att.id + "\">Y retourner</button>" : "Le vide t’attend."));
  }
}
