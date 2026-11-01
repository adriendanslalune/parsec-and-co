// Parsec & Co : la carte. Dessin (papier, étoiles, ports, spectacles, vignette), doigts et caméra.
// Script classique : il partage ses variables avec les autres fichiers de js/ (voir l’ordre dans index.html).

const vue = { cx: home.x, cy: home.y, lpp: 0.25 };
const LPP_MIN = 0.0000025, LPP_MAX = 420;
const canvas = document.getElementById("c"), ctx = canvas.getContext("2d");
let W = 0, H = 0, dpr = 1;

// la vie des colonies : des navettes qui vont et viennent, pour rien, pour le plaisir
const navettes = [];
function tickNavettes(t) {
  const cs = [...colonies.values()];
  if (cs.length >= 2 && navettes.length < Math.min(6, cs.length) && Math.random() < 0.02) {
    const a = cs[Math.floor(Math.random() * cs.length)]; let b = cs[Math.floor(Math.random() * cs.length)]; if (b === a) b = cs[(cs.indexOf(a) + 1) % cs.length];
    navettes.push({ a, b, t0: t, d: 6000 + Math.hypot(a.x - b.x, a.y - b.y) * 400 });
  }
  for (let k = navettes.length - 1; k >= 0; k--) if (t - navettes[k].t0 > navettes[k].d) navettes.splice(k, 1);
}
// des spectacles au-dessus des ports : feux d’artifice, escarmouches de petits vaisseaux
const spectacles = [];
const ENCRES = ["#b5523b", "#3f8f80", "#6f5fae", "#c98a3a", "#1b2451"];
function lancerSpectacle() {
  if (reduit || spectacles.length >= 2 || vue.lpp > 3) return;
  const vis = [...colonies.values()].filter(c => { const [x, y] = ecran(c.x, c.y); return x > 40 && x < W - 40 && y > hautBande() + 70 && y < H - 200; });
  if (!vis.length) return;
  const c = vis[Math.floor(Math.random() * vis.length)];
  const type = Math.random() < 0.6 ? "feu" : "bataille";
  spectacles.push({ type, c, t0: performance.now(), d: type === "feu" ? 2800 : 6500, k: Math.random(), ca: ENCRES[Math.floor(Math.random() * 4)], cb: ENCRES[Math.floor(Math.random() * 4)] });
  boucleAnim();
}
function dessinerSpectacles(t) {
  for (let i = spectacles.length - 1; i >= 0; i--) if (t - spectacles[i].t0 > spectacles[i].d) spectacles.splice(i, 1);
  for (const sp of spectacles) {
    const [px, py] = ecran(sp.c.x, sp.c.y), u = t - sp.t0;
    if (sp.type === "feu") {
      [[0, -46, sp.ca, 0], [16, -34, sp.cb, 450]].forEach(([dx, dy, coul, retard]) => {
        const v = u - retard; if (v < 0) return;
        const cx = px + dx, cy = py + dy;
        if (v < 500) { const q = v / 500; ctx.strokeStyle = coul; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(px + dx * q * 0.3, py); ctx.lineTo(px + dx * q, py + dy * q); ctx.stroke(); return; }
        const q = Math.min(1, (v - 500) / 1700); if (q >= 1) return;
        ctx.strokeStyle = coul; ctx.fillStyle = coul; ctx.globalAlpha = 1 - q; ctx.lineWidth = 1.2;
        for (let k = 0; k < 14; k++) {
          const a = k / 14 * Math.PI * 2 + sp.k, r1 = 26 * (1 - Math.pow(1 - q, 2.4)), r0 = Math.max(0, r1 - 7), g = 10 * q * q;
          ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 + g * 0.6); ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1 + g); ctx.stroke();
          ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1 + g, 1.2, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;
      });
    } else {
      const cx = px + 30, cy = py - 30, w = u / 900;
      const posA = [cx + 24 * Math.cos(w), cy + 14 * Math.sin(w)], posB = [cx + 24 * Math.cos(w + Math.PI + 0.7 * Math.sin(u / 500)), cy + 14 * Math.sin(w + Math.PI + 0.7 * Math.sin(u / 500))];
      const vaisseau = (pos, ang, coul) => { ctx.save(); ctx.translate(pos[0], pos[1]); ctx.rotate(ang); ctx.fillStyle = coul; ctx.strokeStyle = "#3b2a1e"; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(5, 0); ctx.lineTo(-4, -3); ctx.lineTo(-2, 0); ctx.lineTo(-4, 3); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); };
      const explose = u > 5000;
      vaisseau(posA, w + Math.PI / 2, sp.ca);
      if (!explose) vaisseau(posB, w + Math.PI * 1.5, sp.cb === sp.ca ? "#1b2451" : sp.cb);
      // les tirs, à tour de rôle
      const tir = Math.floor(u / 450), q = (u % 450) / 220;
      if (!explose && q < 1) { const de = tir % 2 ? posB : posA, vers = tir % 2 ? posA : posB, x = de[0] + (vers[0] - de[0]) * q, y = de[1] + (vers[1] - de[1]) * q, n = Math.hypot(vers[0] - de[0], vers[1] - de[1]) || 1;
        ctx.strokeStyle = tir % 2 ? sp.cb : sp.ca; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - (vers[0] - de[0]) / n * 6, y - (vers[1] - de[1]) / n * 6); ctx.stroke(); }
      if (explose) { const e = (u - 5000) / 1500; ctx.globalAlpha = 1 - e; ctx.fillStyle = "#c98a3a"; ctx.strokeStyle = "#3b2a1e"; ctx.lineWidth = 1;
        for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 + sp.k, r = 4 + 16 * e; ctx.beginPath(); ctx.arc(posB[0] + Math.cos(a) * r, posB[1] + Math.sin(a) * r, 1.6 * (1 - e) + 0.5, 0, Math.PI * 2); ctx.fill(); }
        ctx.beginPath(); ctx.arc(posB[0], posB[1], 3 + 8 * e, 0, Math.PI * 2); ctx.stroke(); ctx.globalAlpha = 1; }
    }
  }
  return spectacles.length > 0;
}

// la vignette : ligne claire, aplats, trame de points, et toi, minuscule, devant le monde
// les illustrations : une ou plusieurs images par type de monde (rocheux.webp, rocheux-b.webp, rocheux-c.webp…),
// leur nombre est donné par illustrations/liste.js ; on essaie les noms dans l’ordre, et si aucun fichier n’existe, la vignette dessinée reste
const ILLUSTRATIONS = {};
function illustrations(nombres) { Object.assign(ILLUSTRATIONS, nombres); }
// un monde garde son image ; à la découverte, on lui donne une des images de son type les moins vues parmi tes mondes
function illustrationDe(m) {
  const n = ILLUSTRATIONS[m.type] || 0; if (!n) return m.type;
  if (!Number.isInteger(m.illu) || m.illu >= n) {
    const vues = new Array(n).fill(0);
    for (const x of explores.values()) if (x !== m && x.type === m.type && Number.isInteger(x.illu) && x.illu < n) vues[x.illu]++;
    const min = Math.min(...vues), libres = vues.map((v, i) => v === min ? i : -1).filter(i => i >= 0);
    m.illu = libres[Math.floor(hash(Math.round(m.x * 1000), Math.round(m.y * 1000), 5, seed + 77) * libres.length)];
    sauver("parsec.explores", [...explores.values()]);
  }
  return m.illu ? m.type + "-" + String.fromCharCode(97 + m.illu) : m.type;
}
const illusAbsentes = new Set();
function illustrer(noms) {
  const cadre = document.querySelector("#page .image"); if (!cadre) return;
  (function essayer(k) {
    if (k >= noms.length) return;
    const src = "illustrations/" + noms[k] + ".webp";
    if (illusAbsentes.has(src)) { essayer(k + 1); return; }
    const img = new Image();
    img.onload = () => { if (!cadre.isConnected) return; img.className = "illu"; img.alt = ""; cadre.classList.add("illustree"); cadre.insertBefore(img, cadre.querySelector(".manchette")); };
    img.onerror = () => { illusAbsentes.add(src); essayer(k + 1); };
    img.src = src;
  })(0);
}
function dessinerPlanete(cv, m) {
  // la case a la taille de la page : on dessine à sa vraie taille, sans étirer
  const w = Math.max(200, Math.min(520, window.innerWidth - 24) - 3), h = Math.max(190, window.innerHeight * 0.36), d = Math.min(window.devicePixelRatio || 1, 2.5);
  cv.width = Math.round(w * d); cv.height = Math.round(h * d);
  const g = cv.getContext("2d"), ENCRE = "#1b2451", PAPIER = "#f1e2bc";
  g.setTransform(d, 0, 0, d, 0, 0);
  const hh = (a, b) => hash(Math.round(m.x * 1000), Math.round(m.y * 1000), a, b);
  // ciel en trois aplats
  [["#1d2554", 0], ["#283069", 0.36], ["#3a4283", 0.62]].forEach(([c, y]) => { g.fillStyle = c; g.fillRect(0, h * y, w, h); });
  // trame dans le ciel du haut
  g.fillStyle = "rgba(241,226,188,0.10)";
  for (let y = 4; y < h * 0.34; y += 7) for (let x = (y / 7 % 2) * 3.5; x < w; x += 7) { const r = 1.3 * (1 - y / (h * 0.34)); if (r > 0.2) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); } }
  // étoiles, dont quelques croix d’encre claire
  for (let k = 0; k < 40; k++) { const x = hh(k, 1) * w, y = hh(k, 2) * h * 0.6, big = hh(k, 3) > 0.85; g.fillStyle = PAPIER;
    if (big) { g.strokeStyle = PAPIER; g.lineWidth = 1; g.beginPath(); g.moveTo(x - 4, y); g.lineTo(x + 4, y); g.moveTo(x, y - 4); g.lineTo(x, y + 4); g.stroke(); }
    else { g.globalAlpha = 0.5 + 0.5 * hh(k, 4); g.beginPath(); g.arc(x, y, 0.9, 0, Math.PI * 2); g.fill(); g.globalAlpha = 1; } }
  // la planète : aplat, bandes, terminateur, trait d’encre
  const R = h * 0.34, cx = w * 0.64, cy = h * 0.42;
  const anneaux = m.type === "gazeux" || m.type === "etrange" || hh(5, 5) > 0.88;
  if (anneaux) { g.strokeStyle = PAPIER; g.lineWidth = 2; g.beginPath(); g.ellipse(cx, cy, R * 1.65, R * 0.32, -0.28, Math.PI, Math.PI * 2); g.stroke(); }
  g.save(); g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.clip();
  g.fillStyle = m.c1; g.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  const nb = m.type === "gazeux" ? 6 : 3;
  for (let k = 0; k < nb; k++) { const y = cy - R + (k + 0.5 + hh(k, 6) * 0.5) * (2 * R / nb); g.fillStyle = m.c2; g.globalAlpha = 0.28; g.fillRect(cx - R, y, 2 * R, R * (0.08 + 0.12 * hh(k, 7))); g.globalAlpha = 1; g.strokeStyle = "rgba(27,36,81,0.35)"; g.lineWidth = 1; g.beginPath(); g.moveTo(cx - R, y); g.lineTo(cx + R, y); g.stroke(); }
  g.fillStyle = m.c2; g.globalAlpha = 0.6; g.beginPath(); g.arc(cx + R * 0.45, cy + R * 0.25, R * 1.05, 0, Math.PI * 2); g.arc(cx + R * 2, cy, R * 3, 0, Math.PI * 2, true); g.fill(); g.globalAlpha = 1;
  if (m.type === "habite") { g.fillStyle = "#f7d774"; for (let k = 0; k < 16; k++) { const a = Math.PI * (0.05 + 0.5 * hh(k, 8)), r = R * (0.3 + 0.6 * hh(k, 9)); g.fillRect(cx + r * Math.cos(a), cy + r * Math.sin(a), 2.5, 2.5); } }
  g.restore();
  g.strokeStyle = ENCRE; g.lineWidth = 2.5; g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.stroke();
  if (anneaux) { g.strokeStyle = PAPIER; g.lineWidth = 2; g.beginPath(); g.ellipse(cx, cy, R * 1.65, R * 0.32, -0.28, 0, Math.PI); g.stroke(); }
  // le sol, au premier plan, en aplat cerné d’encre
  const sol = (TYPE[m.type] || {}).sol || "#c9b6a4", base = h * 0.78, pts = [];
  for (let i = 0; i <= 12; i++) pts.push([i * w / 12, base - (m.type === "glace" ? 22 * hh(i, 10) * (i % 2) : m.type === "desert" ? 10 * Math.sin(i * 1.3 + hh(1, 11) * 6) : 16 * hh(i, 10))]);
  g.fillStyle = sol; g.beginPath(); g.moveTo(0, h); pts.forEach(([x, y]) => g.lineTo(x, y)); g.lineTo(w, h); g.closePath(); g.fill();
  g.strokeStyle = ENCRE; g.lineWidth = 2.5; g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke();
  // trame d’ombre sur le sol
  g.fillStyle = "rgba(27,36,81,0.22)";
  for (let y = base + 10; y < h; y += 6) for (let x = (y / 6 % 2) * 3; x < w * 0.5; x += 6) { const r = 1.4 * (1 - x / (w * 0.5)); if (r > 0.15) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); } }
  // toi : une silhouette minuscule, scaphandre et ombre portée
  const fx = w * 0.2, fy = pts[2][1] + (pts[3][1] - pts[2][1]) * 0.4;
  g.strokeStyle = "rgba(27,36,81,0.5)"; g.lineWidth = 2; g.beginPath(); g.moveTo(fx, fy); g.lineTo(fx - 26, fy + 6); g.stroke();
  g.fillStyle = "#ef9b4f"; g.strokeStyle = ENCRE; g.lineWidth = 1.5;
  g.beginPath(); g.rect(fx - 4, fy - 15, 8, 10); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(fx - 2, fy - 5); g.lineTo(fx - 3, fy); g.moveTo(fx + 2, fy - 5); g.lineTo(fx + 3, fy); g.stroke();
  g.fillStyle = PAPIER; g.beginPath(); g.arc(fx, fy - 19, 5, 0, Math.PI * 2); g.fill(); g.stroke();
  g.fillStyle = "#8fd3c4"; g.beginPath(); g.arc(fx + 1.5, fy - 19.5, 2.2, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.moveTo(fx + 4, fy - 12); g.lineTo(fx + 11, fy - 22); g.stroke();   // le bras levé, comme on montre un monde
  // cadre de case
  g.strokeStyle = ENCRE; g.lineWidth = 3; g.strokeRect(1.5, 1.5, w - 3, h - 3);
}

// ===================== Dessin : une carte ancienne, encre sépia sur papier =====================
const PAPIER_C = "#efe6d2", SEPIA = "#3b2a1e", BRIQUE = "#b5523b", VDG = "#3f8f80", LAV = "#6f5fae", OCRE = "#c98a3a";
const sepia = a => "rgba(59,42,30," + a + ")";
const BRUME_N = 520, BRUME_LY = 2 * (R_MAX + 2000);
const brume = document.createElement("canvas"); brume.width = brume.height = BRUME_N;
(function () { const g = brume.getContext("2d"), img = g.createImageData(BRUME_N, BRUME_N), d = img.data, pas = BRUME_LY / BRUME_N;
  for (let j = 0; j < BRUME_N; j++) for (let i = 0; i < BRUME_N; i++) { const x = (i + 0.5) * pas - BRUME_LY / 2, y = (j + 0.5) * pas - BRUME_LY / 2, v = Math.min(1, densite(x, y) * 0.55), k = (j * BRUME_N + i) * 4, chaud = Math.exp(-Math.hypot(x, y) / 2500); d[k] = 120 + 70 * chaud; d[k + 1] = 92 + 30 * chaud; d[k + 2] = 70 - 20 * chaud; d[k + 3] = Math.round(255 * Math.pow(v, 0.8) * 0.55); }
  g.putImageData(img, 0, 0); })();
function ecran(x, y) { return [(x - vue.cx) / vue.lpp + W / 2, (y - vue.cy) / vue.lpp + H / 2]; }
// un point de l’écran → sa position dans la galaxie
function versGalaxie(sx, sy) { return [vue.cx + (sx - W / 2) * vue.lpp, vue.cy + (sy - H / 2) * vue.lpp]; }
function rayonSysteme() { return Math.min(16, 0.00004 / vue.lpp); }
function hautBande() { const h = document.querySelector(".hud"); return h ? h.getBoundingClientRect().bottom + 8 : 0; }
function pasJoli(v) { const p = Math.pow(10, Math.floor(Math.log10(v))), m = v / p; return (m >= 5 ? 5 : m >= 2 ? 2 : 1) * p; }
function dessinerFond() {
  ctx.fillStyle = PAPIER_C; ctx.fillRect(0, 0, W, H);
  // le quadrillage du cartographe, accroché au monde
  const pas = pasJoli(150 * vue.lpp), x0 = vue.cx - W / 2 * vue.lpp, y0 = vue.cy - H / 2 * vue.lpp;
  ctx.lineWidth = 1;
  for (let k = Math.floor(x0 / pas); k * pas < x0 + W * vue.lpp; k++) { const [sx] = ecran(k * pas, 0); ctx.strokeStyle = sepia(k % 5 ? 0.06 : 0.12); ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, H); ctx.stroke(); }
  for (let k = Math.floor(y0 / pas); k * pas < y0 + H * vue.lpp; k++) { const [, sy] = ecran(0, k * pas); ctx.strokeStyle = sepia(k % 5 ? 0.06 : 0.12); ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(W, sy); ctx.stroke(); }
}
function vieillir() {   // les bords roussis du papier
  const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
  g.addColorStop(0, "rgba(120,80,40,0)"); g.addColorStop(1, "rgba(120,80,40,0.22)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
function dessinerEtoiles() {
  const x0 = vue.cx - W / 2 * vue.lpp, y0 = vue.cy - H / 2 * vue.lpp, x1 = vue.cx + W / 2 * vue.lpp, y1 = vue.cy + H / 2 * vue.lpp, cellesRef = 700;
  ctx.fillStyle = SEPIA;
  for (let L = 0; L <= 15; L++) {
    const s = TAILLE_0 * Math.pow(2, L); if (s > BRUME_LY) break;
    const spx = s / vue.lpp, celles = (W / spx) * (H / spx); if (celles > 4 * cellesRef) continue;
    const fondu = celles <= cellesRef ? 1 : 1 - (celles - cellesRef) / (3 * cellesRef);
    const i0 = Math.floor(x0 / s), i1 = Math.floor(x1 / s), j0 = Math.floor(y0 / s), j1 = Math.floor(y1 / s);
    if ((i1 - i0 + 1) * (j1 - j0 + 1) > 6000) continue;
    const rayonBase = Math.max(0.5, 0.9 + 0.55 * Math.log2(spx / Math.sqrt(W * H / cellesRef))), poussiere = L < L_BROUILLARD;
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) for (const e of etoilesCellule(L, i, j)) {
      if (poussiere && decouverts.has(e.id)) continue;
      const [sx, sy] = ecran(e.x, e.y), r = Math.min(3.2, rayonBase * (0.6 + 0.8 * e.b)) * (poussiere ? 0.75 : 1) + rayonSysteme();
      ctx.globalAlpha = fondu * (poussiere ? 0.14 + 0.22 * e.b : 0.22 + 0.36 * e.b);
      if (e.b > 0.975 && r > 1.4) { ctx.strokeStyle = SEPIA; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sx - r * 2, sy); ctx.lineTo(sx + r * 2, sy); ctx.moveTo(sx, sy - r * 2); ctx.lineTo(sx, sy + r * 2); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}
function dessinerReperes() {   // tes étoiles : repérées en lavande cerclée, visitées en vert-de-gris plein
  if (vue.lpp >= 12) return;
  for (const e of decouverts.values()) {
    const [sx, sy] = ecran(e.x, e.y), m = explores.get(e.id);
    if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;
    const r = 3 + 3 * Math.max(0, Math.min(1, 1 - Math.log10(vue.lpp * 100) / 3)) + rayonSysteme();
    ctx.fillStyle = PAPIER_C; ctx.beginPath(); ctx.arc(sx, sy, r + 2.5, 0, Math.PI * 2); ctx.fill();
    if (m && m.vu) { ctx.fillStyle = VDG; ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = SEPIA; ctx.lineWidth = 1.2; ctx.stroke(); }
    else { ctx.strokeStyle = LAV; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = LAV; ctx.beginPath(); ctx.arc(sx, sy, 1.4, 0, Math.PI * 2); ctx.fill(); }
  }
}
function dessinerSysteme(e, t, nomChez) {
  const [sx, sy] = ecran(e.x, e.y), vis = Math.max(0, Math.min(1, (0.004 - vue.lpp) / 0.003)); if (vis <= 0) return false;
  const pl = planetesDe(e); let chez = -1;
  if (nomChez) chez = Math.min(pl.length - 1, 1 + Math.floor(hash(seed, 7, 7, 7) * Math.min(2, pl.length - 1)));
  pl.forEach((p, k) => {
    const rr = p.a * UA / vue.lpp; if (rr < 4 || rr > 6000) return;
    ctx.strokeStyle = sepia(0.22 * vis); ctx.lineWidth = 1; ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.arc(sx, sy, rr, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    const ang = p.phase + (t / 1000 / (60 * Math.sqrt(p.a * p.a * p.a))) * Math.PI * 2, px = sx + rr * Math.cos(ang), py = sy + rr * Math.sin(ang);
    ctx.globalAlpha = vis; ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = SEPIA; ctx.lineWidth = 1; ctx.stroke();
    if (k === chez) { ctx.strokeStyle = VDG; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(px, py, p.r + 5, 0, Math.PI * 2); ctx.stroke(); ctx.font = "italic 700 14px Vollkorn, serif"; ctx.fillStyle = SEPIA; ctx.fillText(nomChez, px + p.r + 9, py + 5); }
    ctx.globalAlpha = 1;
  });
  return true;
}
function dessinerSystemes(t) {
  if (vue.lpp > 0.004) return false; let anime = false;
  const x0 = vue.cx - W / 2 * vue.lpp - 0.01, y0 = vue.cy - H / 2 * vue.lpp - 0.01, x1 = vue.cx + W / 2 * vue.lpp + 0.01, y1 = vue.cy + H / 2 * vue.lpp + 0.01;
  for (let L = 0; L < L_BROUILLARD; L++) { const s = TAILLE_0 * Math.pow(2, L); for (let i = Math.floor(x0 / s); i <= Math.floor(x1 / s); i++) for (let j = Math.floor(y0 / s); j <= Math.floor(y1 / s); j++) for (const e of etoilesCellule(L, i, j)) if (e.x > x0 && e.x < x1 && e.y > y0 && e.y < y1) anime = dessinerSysteme(e, t, null) || anime; }
  return dessinerSysteme(home, t, home.nom) || anime;
}
function roseDesVents(px, py, ang) {
  ctx.save(); ctx.translate(px, py);
  ctx.strokeStyle = SEPIA; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.stroke();
  ctx.rotate(ang);
  for (let k = 0; k < 4; k++) { ctx.save(); ctx.rotate(k * Math.PI / 2); const long = k === 0 ? 17 : 11;
    ctx.fillStyle = k === 0 ? BRIQUE : SEPIA; ctx.beginPath(); ctx.moveTo(long, 0); ctx.lineTo(0, -3.5); ctx.lineTo(0, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = PAPIER_C; ctx.beginPath(); ctx.moveTo(long, 0); ctx.lineTo(0, 3.5); ctx.lineTo(0, 0); ctx.closePath(); ctx.fill(); ctx.strokeStyle = SEPIA; ctx.stroke(); ctx.restore(); }
  ctx.restore();
  ctx.font = "italic 13px Vollkorn, serif"; ctx.fillStyle = SEPIA; ctx.textAlign = "center"; ctx.fillText("vers le centre", px, py + 34); ctx.textAlign = "left";
}
function dessiner() {
  const t = performance.now();
  // le navigateur peut rendre un contexte remis à zéro (Android libère la carte quand l’appli passe en arrière-plan) : on redonne l’échelle à chaque image
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  dessinerFond();
  const aBrume = Math.max(0, Math.min(1, (vue.lpp - 2) / 30));
  if (aBrume > 0) { const [bx, by] = ecran(-BRUME_LY / 2, -BRUME_LY / 2); ctx.globalAlpha = aBrume; ctx.globalCompositeOperation = "multiply"; ctx.drawImage(brume, bx, by, BRUME_LY / vue.lpp, BRUME_LY / vue.lpp); ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1; }
  dessinerEtoiles();
  let enCours = dessinerSystemes(t);
  const [hx, hy] = ecran(home.x, home.y);
  // le territoire de la Compagnie : hachures vert-de-gris, accrochées au monde
  if (vue.lpp < 40) {
    const aT = Math.max(0, Math.min(1, (40 - vue.lpp) / 30)), rayonT = Math.max(14, 6 / vue.lpp);
    ctx.save(); ctx.beginPath();
    for (const c of colonies.values()) { const [cx, cy] = ecran(c.x, c.y); if (cx < -rayonT || cx > W + rayonT || cy < -rayonT || cy > H + rayonT) continue; ctx.moveTo(cx + rayonT, cy); ctx.arc(cx, cy, rayonT, 0, Math.PI * 2); }
    ctx.fillStyle = "rgba(63,143,128," + (0.08 * aT) + ")"; ctx.fill(); ctx.clip();
    const dec = (((vue.cy - vue.cx) / vue.lpp) % 7 + 7) % 7;
    ctx.strokeStyle = "rgba(63,143,128," + (0.4 * aT) + ")"; ctx.lineWidth = 1; ctx.beginPath();
    for (let k = -H + dec; k < W; k += 7) { ctx.moveTo(k, 0); ctx.lineTo(k + H, H); }
    ctx.stroke(); ctx.restore();
  }
  dessinerReperes();
  tickNavettes(t);
  if (choixPoste) for (const c of colonies.values()) { const [cx, cy] = ecran(c.x, c.y); ctx.strokeStyle = BRIQUE; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, 14 + 4 * Math.sin(t / 250), 0, Math.PI * 2); ctx.stroke(); enCours = true; }
  if (navettes.length && vue.lpp < 12) { enCours = true; for (const n of navettes) { const u = (t - n.t0) / n.d, [ax, ay] = ecran(n.a.x + (n.b.x - n.a.x) * u, n.a.y + (n.b.y - n.a.y) * u); ctx.fillStyle = SEPIA; ctx.fillRect(ax - 3, ay - 1.2, 6, 2.4); } }
  if (dessinerSpectacles(t)) enCours = true;
  // ping et antenne
  for (const c of cercles) {
    const [cx, cy] = ecran(c.x, c.y), age = (t - c.t0) / 1000, rFinal = c.r / vue.lpp, prog = Math.min(1, age / 1.2); if (prog < 1) enCours = true;
    const rr = rFinal * (prog < 1 ? (1 - Math.pow(1 - prog, 3)) : 1);
    ctx.strokeStyle = prog < 1 ? BRIQUE : sepia(0.6); ctx.lineWidth = prog < 1 ? 2.5 : 1.3; ctx.setLineDash(prog < 1 ? [] : [6, 5]);
    ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    if (prog >= 1) { ctx.font = "italic 14px Vollkorn, serif"; ctx.fillStyle = SEPIA; ctx.fillText(fmtD(c.r) + " années-lumière", cx + rr * 0.7071 + 6, cy - rr * 0.7071 - 6); }
  }
  if (radio && cercles.length) {
    enCours = true; const force = forceRadio(); majRadioAudio(force);
    const [px, py] = ecran(radio.poste.x, radio.poste.y), r0 = cercles[0].r / vue.lpp, L = Math.max(W, H) * 2;
    ctx.strokeStyle = "rgba(181,82,59," + (0.3 + 0.6 * force) + ")"; ctx.lineWidth = 1 + 2 * force; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(radio.ang) * L, py + Math.sin(radio.ang) * L); ctx.stroke();
    const qx = px + Math.cos(radio.ang) * r0, qy = py + Math.sin(radio.ang) * r0; ctx.font = "16px Bowlby One, Arial Black, sans-serif"; ctx.fillStyle = BRIQUE; ctx.fillText("?", qx - 5, qy + 6);
    ctx.strokeStyle = sepia(0.18); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(px, py, 34, -Math.PI / 2, Math.PI * 1.5); ctx.stroke();
    ctx.strokeStyle = force > 0.85 ? VDG : BRIQUE; ctx.beginPath(); ctx.arc(px, py, 34, -Math.PI / 2, -Math.PI / 2 + force * Math.PI * 2); ctx.stroke();
    ctx.font = "italic 700 13px Vollkorn, serif"; ctx.fillStyle = SEPIA; ctx.textAlign = "center"; ctx.fillText(Math.round(force * 100) + " %", px, py + 54); ctx.textAlign = "left";
  }
  if (flash) { const age = (t - flash.t0) / 1000, [fx, fy] = ecran(flash.x, flash.y); if (age < 2.2) { enCours = true; ctx.strokeStyle = "rgba(181,82,59," + (1 - age / 2.2) + ")"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(fx, fy, 6 + age * 40, 0, Math.PI * 2); ctx.stroke(); } else flash = null; }
  // ton vaisseau en vol
  const pv = positionVol();
  if (pv) {
    enCours = true; const [ax, ay] = ecran(pv.x, pv.y), [vx, vy] = ecran(pv.vers.x, pv.vers.y), [dx, dy] = ecran(pv.dx, pv.dy);
    ctx.strokeStyle = "rgba(181,82,59,0.6)"; ctx.lineWidth = 1.2; ctx.setLineDash([2, 5]); ctx.beginPath(); ctx.moveTo(dx, dy); ctx.lineTo(vx, vy); ctx.stroke(); ctx.setLineDash([]);
    const ang = Math.atan2(vy - ay, vx - ax); ctx.save(); ctx.translate(ax, ay); ctx.rotate(ang);
    ctx.strokeStyle = SEPIA; ctx.lineWidth = 1;
    ctx.fillStyle = BRIQUE; ctx.beginPath(); ctx.moveTo(-5, -3); ctx.lineTo(-11, -8); ctx.lineTo(-9, -2); ctx.closePath(); ctx.moveTo(-5, 3); ctx.lineTo(-11, 8); ctx.lineTo(-9, 2); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = OCRE; ctx.beginPath(); ctx.moveTo(-9, -1.8); ctx.lineTo(-14 - 3 * Math.abs(Math.sin(t / 70)), 0); ctx.lineTo(-9, 1.8); ctx.closePath(); ctx.fill();
    ctx.fillStyle = PAPIER_C; ctx.beginPath(); ctx.ellipse(0, 0, 9, 3.6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = BRIQUE; ctx.beginPath(); ctx.moveTo(5, -2.9); ctx.quadraticCurveTo(13, 0, 5, 2.9); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = VDG; ctx.beginPath(); ctx.arc(0.5, 0, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.font = "italic 700 14px Vollkorn, serif"; ctx.fillStyle = BRIQUE; ctx.fillText(joueur.nom.split(" ")[0] + ", " + pv.reste, ax + 14, ay - 9);
  }
  // le centre : rose des vents s’il est hors de la carte, soleil s’il y est
  const [gx, gy] = ecran(0, 0);
  if (gx < 0 || gx > W || gy < 0 || gy > H) { roseDesVents(W - 36, hautBande() + 40, Math.atan2(gy - H / 2, gx - W / 2)); }
  else { ctx.strokeStyle = BRIQUE; ctx.lineWidth = 1.5; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; ctx.beginPath(); ctx.moveTo(gx + Math.cos(a) * 6, gy + Math.sin(a) * 6); ctx.lineTo(gx + Math.cos(a) * 11, gy + Math.sin(a) * 11); ctx.stroke(); }
    ctx.fillStyle = BRIQUE; ctx.beginPath(); ctx.arc(gx, gy, 4, 0, Math.PI * 2); ctx.fill(); ctx.font = "italic 700 14px Vollkorn, serif"; ctx.fillStyle = SEPIA; ctx.fillText("Sagittarius A*", gx + 15, gy + 5); }
  // ton monde
  const proche = Math.max(0, Math.min(1, 1 - Math.log10(vue.lpp * 100) / 4)), r = 1.6 + 5 * proche + rayonSysteme();
  ctx.fillStyle = PAPIER_C; ctx.beginPath(); ctx.arc(hx, hy, r + 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = VDG; ctx.beginPath(); ctx.arc(hx, hy, r, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = SEPIA; ctx.lineWidth = 1.2; ctx.stroke();
  if (proche > 0.05 && vue.lpp > 0.004) { ctx.strokeStyle = sepia(0.8 * proche); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(hx, hy, r + 6 + 6 * proche, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(hx, hy, r + 9 + 6 * proche, 0, Math.PI * 2); ctx.stroke(); }
  if (vue.lpp > 30) { ctx.strokeStyle = sepia(0.35); ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(gx, gy); ctx.stroke(); ctx.setLineDash([]); }
  if (vue.lpp > 0.004) { ctx.font = "italic 700 15px Vollkorn, serif"; ctx.fillStyle = SEPIA; ctx.fillText(home.nom, hx + r + 16, hy + 5); }
  vieillir();
  majEchelle();
  return enCours;
}
function majEchelle() {
  const enLy = 110 * vue.lpp;
  const unite = enLy >= 0.5 ? { v: 1, s: " al", p: " al" } : enLy / UA >= 1 ? { v: UA, s: " UA", p: " UA" } : { v: UA / 149.6, s: " million de km", p: " millions de km" };
  const cible = enLy / unite.v, p = Math.pow(10, Math.floor(Math.log10(cible))), m = cible / p, n = (m >= 5 ? 5 : m >= 2 ? 2 : 1) * p;
  document.getElementById("barre").style.width = (n * unite.v / vue.lpp) + "px";
  document.getElementById("txtEchelle").textContent = fmt(n) + (n === 1 ? unite.s : unite.p);
}
function redim() { dpr = Math.min(window.devicePixelRatio || 1, 2.5); W = window.innerWidth; H = window.innerHeight; canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); dessiner(); }
brancher(() => window.addEventListener("resize", redim));
// au retour de l’appli, ou quand le navigateur rend la carte qu’il avait libérée, on la reprend à la bonne taille
brancher(() => document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") redim(); }));
brancher(() => window.addEventListener("pageshow", redim));
brancher(() => canvas.addEventListener("contextrestored", redim));
let animEnCours = false;
function boucleAnim() { if (animEnCours) return; animEnCours = true; (function pas() { const encore = dessiner(); if (encore) requestAnimationFrame(pas); else animEnCours = false; })(); }
let demande = false;
function demander() { if (!demande) { demande = true; requestAnimationFrame(() => { demande = false; boucleAnim(); }); } }

// ===================== Doigts =====================
const pointeurs = new Map(); let pinch = null, depart = null, bouge = false, tourneAntenne = false;
brancher(() => canvas.addEventListener("pointerdown", e => {
  canvas.setPointerCapture(e.pointerId); pointeurs.set(e.pointerId, { x: e.clientX, y: e.clientY }); depart = { x: e.clientX, y: e.clientY }; bouge = false;
  tourneAntenne = false;
  if (radio && pointeurs.size === 1) { const [px, py] = ecran(radio.poste.x, radio.poste.y); tourneAntenne = Math.hypot(e.clientX - px, e.clientY - py) < Math.max(90, cercles.length ? cercles[0].r / vue.lpp + 40 : 0); }
  if (pointeurs.size === 2) { const [a, b] = [...pointeurs.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), lpp: vue.lpp }; }
  arreterVol();
}));
brancher(() => canvas.addEventListener("pointermove", e => {
  if (!pointeurs.has(e.pointerId)) return;
  const prev = pointeurs.get(e.pointerId), cur = { x: e.clientX, y: e.clientY };
  if (depart && Math.hypot(cur.x - depart.x, cur.y - depart.y) > 8) bouge = true;
  if (pointeurs.size === 1 && radio && tourneAntenne) { const [px, py] = ecran(radio.poste.x, radio.poste.y); radio.ang = Math.atan2(cur.y - py, cur.x - px); }
  else if (pointeurs.size === 1) { vue.cx -= (cur.x - prev.x) * vue.lpp; vue.cy -= (cur.y - prev.y) * vue.lpp; }
  else if (pointeurs.size === 2 && pinch) { pointeurs.set(e.pointerId, cur); const [a, b] = [...pointeurs.values()]; zoomVers((a.x + b.x) / 2, (a.y + b.y) / 2, pinch.lpp * pinch.d / Math.max(Math.hypot(a.x - b.x, a.y - b.y), 1)); }
  pointeurs.set(e.pointerId, cur); demander();
}));
brancher(() => canvas.addEventListener("pointerup", e => {
  const unSeul = pointeurs.size === 1; pointeurs.delete(e.pointerId); if (pointeurs.size < 2) pinch = null;
  if (unSeul && !bouge) {
    if (radio) { if (!tourneAntenne) annulerEcoute(); }
    else if (choixPoste) { const c = colonieTouchee(e.clientX, e.clientY); if (c) ecouterDepuis(c); else annulerEcoute(); }
    else { const et = etoileTouchee(e.clientX, e.clientY); if (et) panneauEtoile(et); }
  }
}));
// un simple toucher n’importe où annule ce qu’on était en train de faire
function annulerEcoute() {
  arreterRadio(); radio = null; choixPoste = false; signal = null; cercles = [];
  btnPing.innerHTML = ico("antenne") + "Scruter le vide";
  dire("<b>Laisse tomber.</b> Le vide attendra, il a l’habitude.");
  demander();
}
brancher(() => canvas.addEventListener("pointercancel", e => { pointeurs.delete(e.pointerId); if (pointeurs.size < 2) pinch = null; }));
brancher(() => canvas.addEventListener("wheel", e => { e.preventDefault(); arreterVol(); zoomVers(e.clientX, e.clientY, vue.lpp * Math.exp(e.deltaY * 0.0015)); demander(); }, { passive: false }));
function zoomVers(sx, sy, lppNouveau) { lppNouveau = Math.max(LPP_MIN, Math.min(LPP_MAX, lppNouveau)); const [wx, wy] = versGalaxie(sx, sy); vue.lpp = lppNouveau; vue.cx = wx - (sx - W / 2) * vue.lpp; vue.cy = wy - (sy - H / 2) * vue.lpp; }
function etoileTouchee(sx, sy) { let best = null, bd = 22; for (const e of decouverts.values()) { const [ex, ey] = ecran(e.x, e.y); const d = Math.hypot(ex - sx, ey - sy); if (d < bd) { bd = d; best = e; } } return best; }
function colonieTouchee(sx, sy) { let best = null, bd = 28; for (const c of colonies.values()) { const [ex, ey] = ecran(c.x, c.y); const d = Math.hypot(ex - sx, ey - sy); if (d < bd) { bd = d; best = c; } } return best; }

// ===================== Vol de caméra =====================
let volCam = null;
const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function animerVers(cx, cy, lpp, duree) {
  arreterVol(); const de = { cx: vue.cx, cy: vue.cy, l: Math.log(vue.lpp) }, a = { cx, cy, l: Math.log(lpp) };
  if (reduit) { vue.cx = cx; vue.cy = cy; vue.lpp = lpp; demander(); return; }
  const t0 = performance.now();
  (function pas(t) { let u = Math.min(1, (t - t0) / duree); u = u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; vue.cx = de.cx + (a.cx - de.cx) * u; vue.cy = de.cy + (a.cy - de.cy) * u; vue.lpp = Math.exp(de.l + (a.l - de.l) * u); if (!animEnCours) dessiner(); volCam = u < 1 ? requestAnimationFrame(pas) : null; })(t0);
}
function arreterVol() { if (volCam) { cancelAnimationFrame(volCam); volCam = null; } }
const btnVoir = document.getElementById("btnVoir"); let loin = false;
brancher(() => btnVoir.addEventListener("click", () => { if (!loin) { animerVers(0, 0, (2 * R_MAX + 6000) / Math.min(W, H), 7000); btnVoir.innerHTML = ico("maison") + "Chez moi"; } else { animerVers(home.x, home.y, 0.25, 5000); btnVoir.innerHTML = ico("galaxie") + "Galaxie"; } loin = !loin; }));
