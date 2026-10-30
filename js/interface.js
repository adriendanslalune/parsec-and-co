// Parsec & Co : l’interface. Symboles, bandeau, message du bas, fenêtres (fiche, Guide), formats.
// Script classique : il partage ses variables avec les autres fichiers de js/ (voir l’ordre dans index.html).

// ===================== Symboles, à l’encre, en ligne claire =====================
const ICO = {
  fusee: "M12 3c3 2 4 6 3 10l-3 3-3-3c-1-4 0-8 3-10z M9 13l-3 2 1 3 2-2 M15 13l3 2-1 3-2-2 M12 8.5v.5",
  etoile: "M12 3.5l2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.4l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z",
  planete: "M7 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0 M3 15.5c2 2 16-1.5 18-6.5",
  caisse: "M4 9h16v11H4z M3 5h18v4H3z M10 13h4",
  boussole: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18 M15.5 8.5l-2 5-5 2 2-5z",
  livre: "M3 6c3-1.5 6-1.5 9 1v12c-3-2.5-6-2.5-9-1z M21 6c-3-1.5-6-1.5-9 1v12c3-2.5 6-2.5 9-1z",
  galaxie: "M12 12a1.4 1.4 0 1 1 1.4 1.4 M13.4 13.4a3 3 0 1 1-3-4.4 M10.4 9a4.6 4.6 0 1 1 5.6 6.7 M16 15.7a6.4 6.4 0 1 1-9.5-9.2",
  maison: "M4 11l8-6.5 8 6.5 M6 9.5V20h12V9.5 M10 20v-5h4v5",
  antenne: "M6 18l3-3 M4.5 9.5a9 9 0 0 0 10 10z M10 14l3.5-3.5 M15 7a3.5 3.5 0 0 1 2 2 M15.5 3.5a7 7 0 0 1 5 5",
  viseur: "M12 3v4 M12 17v4 M3 12h4 M17 12h4 M7 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0",
  lune: "M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z",
  danger: "M12 4l9 16H3z M12 10v4.5 M12 17.5v.5",
  epaves: "M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0 M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.6 5.6l2.1 2.1 M16.3 16.3l2.1 2.1 M5.6 18.4l2.1-2.1 M16.3 7.7l2.1-2.1",
  fossiles: "M5 19C8 9 13.5 5 19 5c0 5.5-4 11.5-14 14z M5 19l8.5-8.5 M10 14l-1-3.5 M12.5 11.5l3 .5",
  reliques: "M3.5 9.5h17 M12 4l8.5 5.5h-17z M6 9.5v8 M10 9.5v8 M14 9.5v8 M18 9.5v8 M3.5 19.5h17",
  bizarreries: "M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12z M9.5 12a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0"
};
function ico(n) { return "<svg class=\"ico\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"" + ICO[n] + "\"/></svg>"; }
document.querySelectorAll("[data-ico]").forEach(el => { el.outerHTML = ico(el.dataset.ico); });

// ===================== Toi : niveau et titre =====================
const PALIERS = [0, 3, 8, 15, 25, 40, 60, 90, 130, 200];
const TITRES = ["Stagiaire du Vide", "Touriste Assermenté", "Arpenteur Approximatif", "Cartographe Malgré Lui", "Dompteur de Cailloux", "Inspecteur des Horizons", "Vétéran Fêlé", "Légende Locale (très locale)", "Grand Explorateur, selon lui-même", "Monument Interstellaire Classé"];
function niveau() { let n = 0; while (n + 1 < PALIERS.length && joueur.xp >= PALIERS[n + 1]) n++; return n; }
function titre() { return TITRES[niveau()]; }
function facteurVitesse() { return 1 + 0.15 * niveau(); }
function gagnerXp(n) { const avant = niveau(); joueur.xp += n; sauver("parsec.joueur", joueur); majHud(); if (niveau() > avant) { carillon(); dire("<b>Promotion.</b> " + joueur.nom + " est désormais <b>" + titre() + "</b>. La Compagnie n’a pas de budget pour une médaille, mais elle y a pensé."); } }
function majHud() {
  document.getElementById("nomJ").textContent = joueur.nom || "…";
  document.getElementById("titreJ").textContent = titre() + ", niveau " + (niveau() + 1);
  const n = niveau(), a = PALIERS[n], b = PALIERS[Math.min(n + 1, PALIERS.length - 1)];
  document.getElementById("xpBar").style.width = (b > a ? Math.min(100, (joueur.xp - a) / (b - a) * 100) : 100) + "%";
  let best = Infinity; for (const c of colonies.values()) best = Math.min(best, Math.hypot(c.x, c.y));
  document.getElementById("dist").textContent = fmt(best);
  document.getElementById("nbCol").innerHTML = ico("planete") + "<span>" + explores.size + "</span> monde" + (explores.size > 1 ? "s" : "") + " " + ico("caisse") + "<span>" + soute.length + "</span> objet" + (soute.length > 1 ? "s" : "");
  document.getElementById("btnSoute").innerHTML = ico("caisse") + "Soute" + (soute.length ? "<span class=\"pastille\">" + soute.length + "</span>" : "");
  document.getElementById("btnGuide").innerHTML = ico("livre") + "Guide" + (explores.size ? "<span class=\"pastille\">" + explores.size + "</span>" : "");
}

// ===================== Fiches, Guide, Soute =====================
function mast() { return "<div class=\"mast\"><span>Parsec &amp; Co</span><span>Le Guide, n° " + explores.size + "</span></div>"; }
function fermer() { document.getElementById("fiche").classList.add("cache"); }
// une fenêtre se ferme d’un glisser vers le bas, ou d’un toucher sur le fond sombre
(function () {
  const f = document.getElementById("fiche"), page = document.getElementById("page");
  f.addEventListener("pointerdown", e => { if (e.target === f) fermer(); });
  let s = null;
  page.addEventListener("touchstart", e => { if (e.target.closest(".tuile") || e.touches.length !== 1) { s = null; return; } s = { y: e.touches[0].clientY, haut: page.scrollTop <= 0, t: performance.now() }; }, { passive: true });
  page.addEventListener("touchmove", e => { if (!s || !s.haut) return; const dy = e.touches[0].clientY - s.y; if (dy > 0) { e.preventDefault(); page.style.transform = "translateY(" + Math.min(dy, 160) + "px) rotate(0.5deg)"; } }, { passive: false });
  const fin = e => { if (!s) return; const dy = (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : s.y) - s.y, vite = performance.now() - s.t < 350; page.style.transform = ""; if (s.haut && (dy > 110 || (vite && dy > 50))) fermer(); s = null; };
  page.addEventListener("touchend", fin); page.addEventListener("touchcancel", fin);
})();
function ouvrirFiche(m, nouveau) {
  if (!m.exp || !m.exp.finie) { if (!m.vu) { commencerExpedition(m); return; } }
  m.vu = true; sauver("parsec.explores", [...explores.values()]);
  const page = document.getElementById("page"), t = TYPE[m.type];
  let html = mast() + "<div class=\"image\"><canvas id=\"cvFiche\" width=\"520\" height=\"340\"></canvas><div class=\"manchette\">" + (nouveau ? "Nouveau monde" : "Le Guide") + "</div></div>";
  html += "<div class=\"texte\"><h2>" + m.nom + "</h2><div class=\"sous\">" + m.titre + ", à " + fmtD(m.d) + " années-lumière, visité par " + joueur.nom + "</div>";
  html += "<div class=\"faits\"><span class=\"fait\">" + ico("danger") + "Danger " + "●".repeat(m.danger) + "○".repeat(5 - m.danger) + "</span></div>";
  html += "<p>" + m.texte + "</p>";
  if (m.exp) for (const j of m.exp.journal) html += "<div class=\"journal\">" + j + "</div>";
  html += "<p><b>Expédition terminée.</b> " + m.nom + " est désormais un port de la Compagnie : il tend l’oreille au vide pour toi, et tu pourras y revenir.</p>";
  html += "<button type=\"button\" id=\"fermerFiche\">Fermer</button></div>";
  page.innerHTML = html;
  dessinerPlanete(document.getElementById("cvFiche"), m);
  document.getElementById("fiche").classList.remove("cache");
  document.getElementById("fermerFiche").addEventListener("click", fermer);
  majHud();
}
function ouvrirGuide() {
  const page = document.getElementById("page");
  let html = "<div class=\"texte\"><h2>Le Guide</h2><div class=\"sous\">" + explores.size + " monde" + (explores.size > 1 ? "s" : "") + " exploré" + (explores.size > 1 ? "s" : "") + " · " + decouverts.size + " étoile" + (decouverts.size > 1 ? "s" : "") + " repérée" + (decouverts.size > 1 ? "s" : "") + "</div><div class=\"liste\">";
  if (!explores.size) html += "<p>Encore vide. Repère une étoile en écoutant le noir, touche-la, et pars.</p>";
  for (const m of explores.values()) html += "<button type=\"button\" data-fiche=\"" + m.id + "\">" + m.nom + " — " + m.titre + (!m.vu ? " · <span class=\"gris\">en cours</span>" : "") + "</button>";
  html += "</div><button type=\"button\" id=\"fermerFiche\">Fermer</button></div>";
  page.innerHTML = html;
  document.getElementById("fiche").classList.remove("cache");
  document.getElementById("fermerFiche").addEventListener("click", fermer);
  page.querySelectorAll("button[data-fiche]").forEach(b => b.addEventListener("click", () => ouvrirFiche(explores.get(b.dataset.fiche), false)));
}

document.getElementById("btnGuide").addEventListener("click", ouvrirGuide);
document.getElementById("btnSoute").addEventListener("click", () => ouvrirSoute());
function dire(html) { const p = document.getElementById("papier"); p.innerHTML = html; p.classList.remove("cache"); }
document.getElementById("papier").addEventListener("click", ev => {
  const b = ev.target.closest("button[data-fiche]"); if (b && explores.get(b.dataset.fiche)) { ouvrirFiche(explores.get(b.dataset.fiche), true); return; }
  const p = ev.target.closest("button[data-partir]"); if (p && decouverts.get(p.dataset.partir)) partir(decouverts.get(p.dataset.partir));
});
function panneauEtoile(e) {
  const m = explores.get(e.id);
  if (m) { ouvrirFiche(m, false); return; }
  dire("<b>" + e.nom + ".</b> Une étoile à " + fmtD(e.d) + " années-lumière. Personne n’y est encore allé. <button type=\"button\" data-partir=\"" + e.id + "\">Y aller (" + dureeTxt(dureeVers(e)) + ")</button>");
}

function fmt(n) { return Math.round(n).toLocaleString("fr-FR"); }
function fmtD(n) { return (n < 100 ? Math.round(n * 10) / 10 : Math.round(n)).toLocaleString("fr-FR"); }
function dureeTxt(ms) { const s = Math.ceil(ms / 1000); if (s < 60) return s + " s"; const m = Math.floor(s / 60); if (m < 60) return m + " min" + (s % 60 && m < 10 ? " " + (s % 60) + " s" : ""); const h = Math.floor(m / 60); if (h < 48) return h + " h " + (m % 60) + " min"; return Math.floor(h / 24) + " j " + (h % 24) + " h"; }
