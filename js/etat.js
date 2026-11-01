// Parsec & Co : la sauvegarde (localStorage, clés parsec.*) et l’état de la partie.
// Script classique : il partage ses variables avec les autres fichiers de js/ (voir l’ordre dans index.html).

// ===================== Les écouteurs : branchés une fois tout chargé =====================
// les fichiers arrivent un par un : un toucher ou un redimensionnement entre deux fichiers ne doit rien déclencher
// avant que tout existe ; chaque addEventListener passe donc par brancher(), et demarrage.js les branche d’un coup
const branchements = [];
function brancher(f) { branchements.push(f); }

// ===================== Sauvegarde et état =====================
function charger(cle, defaut) { try { const v = localStorage.getItem(cle); return v === null ? defaut : JSON.parse(v); } catch (e) { return defaut; } }
function sauver(cle, v) { try { localStorage.setItem(cle, JSON.stringify(v)); } catch (e) {} }
seed = charger("parsec.seed", null);
if (!Number.isFinite(seed)) { seed = Math.floor(Math.random() * 1e9); sauver("parsec.seed", seed); }
const home = tirerDepart(seed);
const decouverts = new Map(); for (const e of charger("parsec.decouverts", [])) decouverts.set(e.id, e);
const explores = new Map(); for (const m of charger("parsec.explores", [])) explores.set(m.id, m);
// tout ce que tu explores est un comptoir de la Compagnie : il écoute, les navettes y passent
const colonies = new Map();
function majComptoirs() { colonies.clear(); colonies.set("home", { id: "home", nom: home.nom, x: home.x, y: home.y }); for (const m of explores.values()) if (m.vu) colonies.set(m.id, { id: m.id, nom: m.nom, x: m.x, y: m.y }); }
majComptoirs();
let joueur = charger("parsec.joueur", null) || { nom: "", xp: 0 };
if (!joueur.xp) joueur.xp = 0;
const vieux = charger("parsec.equipage", null); if (vieux && vieux.length && !joueur.nom) { joueur.nom = vieux[0].nom; joueur.xp = vieux[0].xp || 0; }
const VITESSE = 20000, PORTEE = 160;
let vol = charger("parsec.vol", null);             // { versId, deX, deY, t0, t1 } : ton vaisseau en route
if (!vol) { const anc = charger("parsec.explorateurs", []); if (anc.length) { vol = anc[0]; sauver("parsec.vol", vol); } }
try { localStorage.removeItem("parsec.blesse"); } catch (e) {}   // l’ancienne convalescence, supprimée : on oublie l’heure de fin
