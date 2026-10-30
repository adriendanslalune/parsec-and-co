// Parsec & Co : la galaxie. Une formule, pas une base de données : graine + position donnent toujours la même étoile, le même nom.
// Script classique : il partage ses variables avec les autres fichiers de js/ (voir l’ordre dans index.html).

// ===================== Formule de la galaxie =====================
function hash(a, b, c, d) {
  let h = (Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263) + Math.imul(c | 0, 2246822519) + Math.imul(d | 0, 3266489917)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
const R_MAX = 55000;
function densite(x, y) {
  const r = Math.hypot(x, y); if (r > R_MAX) return 0;
  const t = Math.atan2(y, x), spirale = Math.log(Math.max(r, 300) / 300) / 0.26;
  let bras = 0.5 + 0.5 * Math.cos(2 * (t - spirale)); bras = Math.pow(bras, 2.2);
  const disque = Math.exp(-r / 8500) * (0.28 + 0.72 * bras), bulbe = 2.2 * Math.exp(-r / 1300);
  const bord = r > 45000 ? Math.exp(-(r - 45000) / 3000) : 1;
  return (disque + bulbe) * bord;
}
const SYL1 = ["Vor", "Tal", "Mé", "Kol", "Ambre", "Oli", "Zé", "Bru", "Fal", "Nim", "Quar", "Sol", "Vel", "Tru", "Pal", "Ygg", "Hou", "Bis", "Cal", "Dro"];
const SYL2 = ["bek", "mira", "thon", "dune", "lune", "quin", "ros", "van", "pax", "lo", "ste", "nar", "kou", "min", "ba", "ren", "cotte", "pic", "tane", "ule"];
const SUFF = ["", "", "", " Majeure", " Mineure", "-3", "-7", " Prime", " la Verte", " du Bas", " Nord", "-II", " l’Oubliée", " Bis"];
function nomDe(a, b, c) { return SYL1[Math.floor(hash(a, b, c, 11) * SYL1.length)] + SYL2[Math.floor(hash(a, b, c, 12) * SYL2.length)] + SUFF[Math.floor(hash(a, b, c, 13) * SUFF.length)]; }

const TAILLE_0 = 14, L_BROUILLARD = 4;
const COULEURS = ["#f4e9cf", "#f4e9cf", "#f4e9cf", "#8fd3c4", "#b9aae8", "#ef9b4f"];
let seed;
function etoilesCellule(L, i, j) {
  const s = TAILLE_0 * Math.pow(2, L), dCell = densite((i + 0.5) * s, (j + 0.5) * s);
  if (dCell <= 0) return [];
  const attendu = dCell * 1.6 * Math.pow(2, Math.max(0, 4 - L));
  const n = Math.min(14, Math.floor(attendu) + (hash(i, j, L, seed) < attendu % 1 ? 1 : 0));
  const out = [];
  for (let k = 0; k < n; k++) out.push({
    id: L + ":" + i + ":" + j + ":" + k,
    x: (i + hash(i, j, L * 4 + k, seed + 1)) * s, y: (j + hash(i, j, L * 4 + k, seed + 2)) * s,
    b: hash(i, j, L * 4 + k, seed + 3), c: COULEURS[Math.floor(hash(i, j, L * 4 + k, seed + 4) * COULEURS.length)],
    nom: nomDe(i * 7 + k, j * 13 + L, seed)
  });
  return out;
}
const UA = 1 / 63241;
const COULEURS_PLANETES = ["#ef9b4f", "#8fd3c4", "#b9aae8", "#f4e9cf", "#e08a7a", "#c9d99a", "#9fb4e8"];
function planetesDe(e) {
  const g = e.id ? e.id.length * 31 + e.id.charCodeAt(0) : 1;
  const h = (a, b) => hash(Math.round(e.x * 1000), Math.round(e.y * 1000) + a, b, g);
  const n = 1 + Math.floor(h(0, 1) * 7), out = [];
  for (let k = 0; k < n; k++) out.push({ a: 0.35 * Math.pow(1.8, k) * (0.8 + 0.4 * h(k, 2)), r: 1.6 + 3.2 * h(k, 3), phase: h(k, 4) * Math.PI * 2, c: COULEURS_PLANETES[Math.floor(h(k, 5) * COULEURS_PLANETES.length)] });
  return out;
}
function tirerDepart(seed) {
  for (let k = 0; k < 400; k++) {
    const r = 3000 + hash(seed, k, 1, 5) * 42000, t = hash(seed, k, 2, 5) * Math.PI * 2, x = r * Math.cos(t), y = r * Math.sin(t);
    if (hash(seed, k, 3, 5) < densite(x, y)) return { x, y, nom: nomDe(seed, 1, 2) };
  }
  return { x: 26000, y: 0, nom: nomDe(seed, 1, 2) };
}
