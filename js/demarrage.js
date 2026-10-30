// Parsec & Co : le démarrage. Chargé en dernier, une fois que tout le reste existe.
// Script classique : il partage ses variables avec les autres fichiers de js/ (voir l’ordre dans index.html).

// ===================== Démarrage =====================
for (const f of branchements) f();   // tous les fichiers sont là : on branche les doigts, les boutons, le redimensionnement
setInterval(() => { if (Math.random() < 0.12) lancerSpectacle(); tickVol(); majBlessure(); sauver("parsec.vu", Date.now()); if (navettes.length || colonies.size > 1) demander(); }, 1000);
const vuLe = charger("parsec.vu", 0);
reprise = { depuis: vuLe, arrivees: [] };
tickVol(); majHud();
if (decouverts.size) btnPing.innerHTML = ico("antenne") + "Scruter le vide";
(function finReprise() {
  const r = reprise; reprise = null;
  const att = mondeEnAttente();
  if (!joueur.nom) {
    const page = document.getElementById("page");
    page.innerHTML = "<div class=\"texte\"><h2>Parsec &amp; Co</h2><div class=\"sous\">Fiche d’embauche</div><p>La Compagnie a un monde, " + home.nom + ", un vieux vaisseau avec une soute vide, et un poste d’explorateur, ou d’exploratrice. Le poste, c’est toi. Il manque juste ton nom sur la fiche.</p><p><input id=\"nomJoueur\" type=\"text\" maxlength=\"28\" placeholder=\"Ton nom sur la fiche\"></p><p><button type=\"button\" data-genre=\"m\">Signer : explorateur</button><button type=\"button\" data-genre=\"f\">Signer : exploratrice</button></p></div>";
    document.getElementById("fiche").classList.remove("cache");
    page.querySelectorAll("button[data-genre]").forEach(b => b.addEventListener("click", () => { const v = document.getElementById("nomJoueur").value.trim(); if (!v) return; joueur.nom = v; joueur.genre = b.dataset.genre; sauver("parsec.joueur", joueur); majHud(); fermer(); dire("<b>Bienvenue, " + v + ", " + titre() + ".</b> Le noir autour de " + home.nom + " est plein d’étoiles pâles. L’une d’elles appelle. Écoute."); }));
    return;
  }
  // les fiches signées avant le choix explorateur / exploratrice : la Compagnie pose la question, une seule fois
  if (!joueur.genre) {
    const page = document.getElementById("page");
    page.innerHTML = "<div class=\"texte\"><h2>Mise à jour des fiches</h2><div class=\"sous\">Service du personnel</div><p>La Compagnie refait ses fiches, et la tienne a une case vide. " + joueur.nom + ", tu es :</p><p><button type=\"button\" data-genre=\"m\">Explorateur</button><button type=\"button\" data-genre=\"f\">Exploratrice</button></p></div>";
    document.getElementById("fiche").classList.remove("cache");
    page.querySelectorAll("button[data-genre]").forEach(b => b.addEventListener("click", () => { joueur.genre = b.dataset.genre; sauver("parsec.joueur", joueur); majHud(); fermer(); }));
  }
  if (r.arrivees.length) { const m = r.arrivees[0]; carillon(); dire("<b>Tu es " + accords("{toi:arrivé|arrivée}") + " sur " + m.nom + "</b> pendant ton absence. <button type=\"button\" data-fiche=\"" + m.id + "\">Descendre</button>"); }
  else if (att) dire("<b>" + att.nom + " t’attend.</b> <button type=\"button\" data-fiche=\"" + att.id + "\">Y retourner</button>");
  else if (vol) document.getElementById("papier").dataset.mode = "trajet";
  else if (decouverts.size) { const libres = [...decouverts.values()].filter(e => !explores.has(e.id)).length; dire(libres ? "<b>" + libres + " étoile" + (libres > 1 ? "s" : "") + " repérée" + (libres > 1 ? "s" : "") + ", pas encore visitée" + (libres > 1 ? "s" : "") + ".</b> Les cercles lavande. Touche-en une pour y aller, ou scrute le vide pour en trouver d’autres." : "<b>Tout ce que tu as repéré, tu l’as visité.</b> Scrute le vide : il reste des étoiles qui appellent."); }
  else dire("<b>Autour de " + home.nom + ", des centaines d’étoiles pâles.</b> L’une d’elles appelle. Scrute le vide pour savoir laquelle.");
})();
redim();
