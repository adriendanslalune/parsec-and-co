// Parsec & Co : la soute. Les objets des quatre séries, leurs paliers, la grille où on les bricole.
// Script classique : il partage ses variables avec les autres fichiers de js/ (voir l’ordre dans index.html).

// ===================== Les objets : chargés de la sauvegarde =====================
let soute = charger("parsec.soute", null);
if (!soute) { soute = []; for (const m of explores.values()) if (m.artefact) soute.push({ id: "art-" + m.id, nom: m.artefact.texte, tag: "artefact", serie: m.artefact.serieNom, de: m.nom, usage: "objet" }); sauver("parsec.soute", soute); }
const SERIE_NOM = { epaves: "Épaves", fossiles: "Fossiles", reliques: "Reliques", bizarreries: "Bizarreries" };
// les paliers de fusion : deux objets identiques font l’objet du palier suivant
const PALIERS_OBJ = {
  epaves: ["un boulon d’épave", "un rouage encore gras", "un mécanisme qui tourne tout seul", "un moteur d’épave, chaud", "un cœur de vaisseau qui bat"],
  fossiles: ["une écaille fossile", "un os creux qui siffle", "un crâne à trois orbites", "un squelette replié dans une boîte", "un fossile qui respire encore"],
  reliques: ["un tesson gravé", "une pièce qui dit « pile » des deux côtés", "un sceau d’une administration éteinte", "une couronne pour une tête étrange", "un trône portatif, pliant"],
  bizarreries: ["une lueur dans un bocal", "un murmure en boucle", "un petit paradoxe de poche", "un petit miracle, périmé bientôt", "une chose indescriptible, mais polie"]
};
function objetPalier(serie, palier) { return { nom: PALIERS_OBJ[serie][Math.min(palier, 4) - 1], serie, serieNom: SERIE_NOM[serie], palier }; }
// migration des anciennes trouvailles vers des objets de palier 1
for (const o of soute) { if (!o.palier) { const s = Object.keys(SERIE_NOM).find(k => SERIE_NOM[k] === o.serie) || "bizarreries"; o.serie = s; o.serieNom = SERIE_NOM[s]; o.palier = 1; o.nom = PALIERS_OBJ[s][0]; } }
sauver("parsec.soute", soute);

// ===================== La soute : une grille, on glisse, on superpose, ça fusionne =====================
const SERIES_ORDRE = ["epaves", "fossiles", "reliques", "bizarreries"];
const SERIE_COUL = { epaves: "#ef9b4f", fossiles: "#c9d99a", reliques: "#b9aae8", bizarreries: "#8fd3c4" };
const ROMAINS = ["I", "II", "III", "IV", "V"];
// l’image d’un objet : illustrations/objets/<série>-<palier>.webp ; tant qu’elle manque, la tuile garde son symbole et son chiffre
const objetsAbsents = new Set();
function imageObjet(serie, palier) {
  const src = "illustrations/objets/" + serie + "-" + palier + ".webp";
  if (objetsAbsents.has(src)) return "";
  return '<img class="objet" src="' + src + '" alt="" draggable="false" onload="this.parentNode.classList.add(\'illustree\')" onerror="objetsAbsents.add(this.getAttribute(\'src\')); this.remove()">';
}
function rangerSoute() {   // chaque objet a une ligne dans la colonne de sa série
  for (const serie of SERIES_ORDRE) {
    const objs = soute.filter(o => o.serie === serie), prises = new Set();
    for (const o of objs) if (Number.isInteger(o.ligne) && !prises.has(o.ligne)) prises.add(o.ligne); else o.ligne = undefined;
    for (const o of objs) if (!Number.isInteger(o.ligne)) { let l = 0; while (prises.has(l)) l++; o.ligne = l; prises.add(l); }
  }
  sauver("parsec.soute", soute);
}
function ouvrirSoute(message) {
  rangerSoute();
  const page = document.getElementById("page");
  const lignes = Math.max(6, ...soute.map(o => o.ligne + 2));
  let html = '<div class="texte"><h2>La soute</h2><div class="sous">Le vaisseau de ' + joueur.nom + ', ' + soute.length + ' objet' + (soute.length > 1 ? 's' : '') + ' à bord</div>';
  html += '<div class="grille" id="grille">';
  for (const serie of SERIES_ORDRE) html += '<div class="colonne" style="background:' + SERIE_COUL[serie] + '">' + ico(serie) + SERIE_NOM[serie] + '</div>';
  for (let l = 0; l < lignes; l++) for (const serie of SERIES_ORDRE) {
    const o = soute.find(x => x.serie === serie && x.ligne === l);
    html += '<div class="case" data-serie="' + serie + '" data-ligne="' + l + '">' + (o ? '<div class="tuile" data-id="' + o.id + '" style="background:' + SERIE_COUL[serie] + '">' + imageObjet(serie, o.palier || 1) + ico(serie) + '<span>' + ROMAINS[(o.palier || 1) - 1] + '</span></div>' : '') + '</div>';
  }
  html += '</div><p class="gris" id="legende">' + (message || 'Glisse un objet sur son jumeau, même colonne, même palier, pour les bricoler ensemble. Touche un objet pour lire son nom.') + '</p>';
  html += '<p class="gris">Épaves pour la technique, fossiles pour le vivant, reliques pour les civilisations, bizarreries pour la physique tordue.</p>';
  html += '<button type="button" id="fermerFiche">Fermer</button></div>';
  page.innerHTML = html;
  document.getElementById("fiche").classList.remove("cache");
  document.getElementById("fermerFiche").addEventListener("click", fermer);
  let drag = null;
  page.querySelectorAll(".tuile").forEach(t => {
    t.addEventListener("pointerdown", e => {
      e.preventDefault(); t.setPointerCapture(e.pointerId);
      const o = soute.find(x => x.id === t.dataset.id);
      drag = { t, o, x0: e.clientX, y0: e.clientY, bouge: false };
      t.style.zIndex = 10; t.style.transition = "none";
    });
    t.addEventListener("pointermove", e => {
      if (!drag || drag.t !== t) return;
      const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
      if (Math.hypot(dx, dy) > 6) drag.bouge = true;
      t.style.transform = "translate(" + dx + "px," + dy + "px) scale(1.08)";
    });
    const lacher = e => {
      if (!drag || drag.t !== t) return;
      t.style.transform = ""; t.style.zIndex = "";
      // un simple toucher lit l’objet ; on n’écrit pas pendant le glisser, sinon la fenêtre grandit et la grille bouge sous le doigt
      if (!drag.bouge) { const o = drag.o; document.getElementById("legende").innerHTML = "<b>" + o.nom + "</b>, " + o.serieNom.toLowerCase() + " de palier " + (o.palier || 1) + ", " + accords(o.de === "fusion" || o.de === "bricolé à bord" ? "{objet:bricolé|bricolée} à bord" : "{objet:trouvé|trouvée} sur ", o) + (o.de === "fusion" || o.de === "bricolé à bord" ? "" : o.de) + "." + (o.provenance ? " Provenance : " + o.provenance + "." : ""); }
      if (drag.bouge) {
        t.style.visibility = "hidden";
        const cible = document.elementFromPoint(e.clientX, e.clientY);
        t.style.visibility = "";
        const caseC = cible && cible.closest(".case");
        if (caseC && caseC.dataset.serie !== drag.o.serie) { bipSourd(); ouvrirSoute("Chaque série reste dans sa colonne : on ne bricole pas un fossile avec une épave."); }
        else if (caseC) {
          const l = +caseC.dataset.ligne, autre = soute.find(x => x.serie === drag.o.serie && x.ligne === l && x !== drag.o);
          if (!autre) { drag.o.ligne = l; sauver("parsec.soute", soute); ouvrirSoute(); }
          else if ((autre.palier || 1) === (drag.o.palier || 1) && (drag.o.palier || 1) < 5) {
            const pal = drag.o.palier || 1, n = objetPalier(drag.o.serie, pal + 1);
            soute = soute.filter(x => x !== autre && x !== drag.o);
            soute.push({ id: "bri-" + Date.now() + "-" + Math.floor(Math.random() * 1e6), nom: n.nom, tag: "artefact", serie: drag.o.serie, serieNom: n.serieNom, palier: pal + 1, de: "bricolé à bord", usage: "objet", ligne: l });
            sauver("parsec.soute", soute); carillon(); majHud();
            ouvrirSoute("<b>Bricolé.</b> Deux objets, un coup de clé : " + n.nom + ", palier " + (pal + 1) + ".");
          } else { const tmp = autre.ligne; autre.ligne = drag.o.ligne; drag.o.ligne = tmp; sauver("parsec.soute", soute); ouvrirSoute(); }
        }
      }
      drag = null;
    };
    t.addEventListener("pointerup", lacher); t.addEventListener("pointercancel", lacher);
  });
}
