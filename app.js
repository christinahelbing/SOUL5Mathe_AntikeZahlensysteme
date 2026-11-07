/* Zeitreise der Zahlen – SOUL Mathematik Klasse 5, Zusatzbaustein Z1 */
'use strict';

const APP = document.getElementById('app');
const KEY = 'zeitreise-z1';
const TEACHER_CODE = 'Z1LEHRER';
const RESET_CODE = 'Z1NEUSTART';

/* ---------- Speicher ---------- */
function blank() {
  return { v: 1, name: '', started: null, introSeen: false, finaleSeen: false, ch: {}, ws: {}, solved: {}, teacher: false, showNums: false };
}
function load() {
  try {
    const x = JSON.parse(localStorage.getItem(KEY));
    if (x && x.v === 1) return Object.assign(blank(), x);
  } catch (e) { /* leer */ }
  return blank();
}
let S = load();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* leer */ } }

(function urlFlags() {
  try {
    const q = new URLSearchParams(location.search);
    if (q.has('lehrer')) {
      S.teacher = q.get('lehrer') !== '0';
      save();
      history.replaceState(null, '', location.pathname);
    }
  } catch (e) { /* leer */ }
})();

/* ---------- Hilfen ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const today = () => new Date().toLocaleDateString('de-DE');
const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const range = n => Array.from({ length: n }, (_, i) => i);
const fmt = n => n >= 10000 ? n.toLocaleString('de-DE').replace(/\./g, '\u202F') : String(n);
const PRAISE = ['Richtig!', 'Genau so.', 'Stimmt!', 'Super gemacht.', 'Volltreffer!', 'Klasse!'];

/* ---------- Römische Zahlen ---------- */
const RV = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
function toRoman(n) {
  const t = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let s = ''; for (const [v, r] of t) while (n >= v) { s += r; n -= v; } return s;
}
function toRomanAdd(n) {
  const t = [[1000, 'M'], [500, 'D'], [100, 'C'], [50, 'L'], [10, 'X'], [5, 'V'], [1, 'I']];
  let s = ''; for (const [v, r] of t) while (n >= v) { s += r; n -= v; } return s;
}
function romanValue(s) {
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    const a = RV[s[i]], b = RV[s[i + 1]] || 0;
    if (!a) return NaN;
    sum += a < b ? -a : a;
  }
  return sum;
}
const naiveSum = s => [...s].reduce((a, c) => a + (RV[c] || 0), 0);
const isStandard = s => { const v = romanValue(s); return v > 0 && v < 4000 && toRoman(v) === s; };
const isAdditive = s => { const v = romanValue(s); return v > 0 && toRomanAdd(v) === s; };
function romanTokens(s) {
  const out = []; let i = 0;
  while (i < s.length) {
    const a = RV[s[i]], b = RV[s[i + 1]] || 0;
    if (a < b) { out.push({ r: s[i] + s[i + 1], v: b - a, sub: [s[i + 1], s[i]] }); i += 2; }
    else { let j = i; while (s[j] === s[i]) j++; out.push({ r: s.slice(i, j), v: a * (j - i) }); i = j; }
  }
  return out;
}
function wayRead(s) {
  const tk = romanTokens(s);
  const parts = tk.map(t => t.sub
    ? `<span class="rn">${t.r}</span> (${RV[t.sub[0]]} − ${RV[t.sub[1]]} = ${fmt(t.v)})`
    : `<span class="rn">${t.r}</span> (${fmt(t.v)})`);
  return `${parts.join(' + ')} = <b>${fmt(romanValue(s))}</b>`;
}
function decompose(n) {
  const parts = []; let p = 1000;
  while (p >= 1) { const d = Math.floor(n / p) % 10; if (p === 1000) parts.push(Math.floor(n / 1000) * 1000); else if (d) parts.push(d * p); p /= 10; }
  return parts.filter(x => x > 0);
}
function wayWrite(n, mode) {
  const parts = decompose(n);
  const f = mode === 'short' ? toRoman : toRomanAdd;
  return `${fmt(n)} = ${parts.map(fmt).join(' + ')} = ${parts.map(p => `<span class="rn">${f(p)}</span>`).join(' + ')} = <b class="rn">${f(n)}</b>`;
}

/* ---------- Maya-Zahlen ---------- */
function toMaya(n) { if (n === 0) return [0]; const d = []; while (n > 0) { d.unshift(n % 20); n = Math.floor(n / 20); } return d; }
const PLACE = [1, 20, 400, 8000, 160000];
const fromMaya = d => d.reduce((a, v) => a * 20 + v, 0);
const glyphCache = {};
function glyph(v) {
  if (glyphCache[v]) return glyphCache[v];
  let inner = '';
  if (v === 0) {
    inner = '<path d="M12 52 Q50 14 88 52 Q50 86 12 52Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>' +
      '<path d="M26 50 Q50 34 74 50" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M30 61 Q50 52 70 61" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>';
  } else {
    const bars = Math.floor(v / 5), dots = v % 5;
    const items = []; if (dots) items.push(['d', 15]); for (let i = 0; i < bars; i++) items.push(['b', 12]);
    const gap = 7; const h = items.reduce((a, it) => a + it[1], 0) + gap * (items.length - 1);
    let y = 50 - h / 2;
    for (const [k, hh] of items) {
      if (k === 'd') {
        const sp = 19, x0 = 50 - (dots - 1) * sp / 2;
        for (let i = 0; i < dots; i++) inner += `<circle cx="${x0 + i * sp}" cy="${y + hh / 2}" r="7.2" fill="currentColor"/>`;
      } else inner += `<rect x="12" y="${y}" width="76" height="${hh}" rx="4" fill="currentColor"/>`;
      y += hh + gap;
    }
  }
  return (glyphCache[v] = `<svg class="glyph" viewBox="0 0 100 100" aria-label="${v}">${inner}</svg>`);
}
function stackHTML(digits, labels) {
  const L = digits.length;
  return `<div class="mstack">${digits.map((d, i) => {
    const pl = PLACE[L - 1 - i];
    return `<div class="mlev">${labels ? `<span class="mlab">· ${fmt(pl)}</span>` : ''}<div class="mtile">${glyph(d)}</div></div>`;
  }).join('')}</div>`;
}
function wayMayaRead(n) {
  const d = toMaya(n), L = d.length;
  return d.map((v, i) => `${v} · ${fmt(PLACE[L - 1 - i])}`).join(' + ') + ` = <b>${fmt(n)}</b>`;
}
function wayMayaBuild(n) {
  const d = toMaya(n), L = d.length; let rest = n; const lines = [];
  d.forEach((v, i) => {
    const pl = PLACE[L - 1 - i];
    if (pl === 1) lines.push(`Rest ${fmt(rest)} kommt in die unterste Etage${v === 0 ? ': die Muschel' : ''}.`);
    else lines.push(`${fmt(pl)} passt ${v}-mal in ${fmt(rest)}${v ? ` (${fmt(v * pl)})` : ', also Muschel'}. Rest: ${fmt(rest - v * pl)}.`);
    rest -= v * pl;
  });
  return `<ol class="way">${lines.map(l => `<li>${l}</li>`).join('')}</ol><div class="glyphrow"><div>${stackHTML(d, true)}</div></div>`;
}
function rich(html) {
  return html
    .replace(/\[\[g(\d+)\]\]/g, (_, v) => `<span class="ig">${glyph(+v)}</span>`)
    .replace(/\[\[n(\d+)\]\]/g, (_, v) => `<span class="istack">${stackHTML(toMaya(+v), false)}</span>`)
    .replace(/\[\[table19\]\]/g, () => `<div class="gtable">${range(20).map(v => `<div><span>${v}</span>${glyph(v)}</div>`).join('')}</div>`);
}

/* ---------- Bilder ---------- */
const bgMemo = {};
function setBg(el, key) {
  if (!el) return;
  const apply = url => { if (url) el.style.backgroundImage = `url("${url}")`; el.classList.toggle('noimg', !url); };
  if (key in bgMemo) return apply(bgMemo[key]);
  const tries = [`img/${key}.webp`, `img/${key}.jpg`, `img/${key}.png`];
  (function next(i) {
    if (i >= tries.length) { bgMemo[key] = null; return apply(null); }
    const im = new Image();
    im.onload = () => { bgMemo[key] = tries[i]; apply(tries[i]); };
    im.onerror = () => next(i + 1);
    im.src = tries[i];
  })(0);
}
function portraitHTML(who) {
  const p = PEOPLE[who];
  if (!p || !p.img) return '';
  return `<div class="portrait" data-who="${who}"><img src="img/${p.img}.png" alt="${p.name}"><div class="avatar" style="background:${p.color}">${p.name[0]}</div></div>`;
}
function wirePortraits(root) {
  root.querySelectorAll('.portrait img').forEach(img => {
    const fail = () => img.parentNode.classList.add('fb');
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });
}

/* ---------- Kleine Bausteine ---------- */
function confetti() {
  const box = document.createElement('div'); box.className = 'confetti';
  const cols = ['#c9a227', '#b5532f', '#1f6f5c', '#d49a3a', '#f4ede0', '#7a1f1a'];
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('i');
    s.style.left = Math.random() * 100 + 'vw';
    s.style.background = pick(cols);
    s.style.animationDelay = Math.random() * 0.6 + 's';
    s.style.animationDuration = 1.8 + Math.random() * 1.4 + 's';
    s.style.transform = `rotate(${rnd(360)}deg)`;
    box.appendChild(s);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 4000);
}
function modal(html, buttons) {
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="mcard">${html}<div class="mbtns">${buttons.map((b, i) => `<button class="btn ${b.cls || ''}" data-i="${i}">${b.label}</button>`).join('')}</div></div>`;
  document.body.appendChild(m);
  m.querySelectorAll('.mbtns button').forEach(btn => btn.onclick = () => { const b = buttons[+btn.dataset.i]; if (!b.keep) m.remove(); b.go && b.go(m); });
  return m;
}
function stampSVG(jid, idx, title, done) {
  const rom = jid === 'rom';
  const col = done ? (rom ? '#9c3b22' : '#1f6f5c') : '#b9ad97';
  const mark = rom
    ? `<text x="60" y="70" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="34" fill="${col}">${toRoman(idx + 1)}</text>`
    : `<g transform="translate(36 30) scale(.48)" style="color:${col}">${glyph(idx + 1).replace('<svg class="glyph" viewBox="0 0 100 100"', '<svg width="100" height="100" viewBox="0 0 100 100"')}</g>`;
  const shape = rom
    ? `<circle cx="60" cy="60" r="54" fill="none" stroke="${col}" stroke-width="5"/><circle cx="60" cy="60" r="45" fill="none" stroke="${col}" stroke-width="2" stroke-dasharray="3 4"/>`
    : `<rect x="8" y="8" width="104" height="104" rx="18" fill="none" stroke="${col}" stroke-width="5"/><rect x="18" y="18" width="84" height="84" rx="10" fill="none" stroke="${col}" stroke-width="2" stroke-dasharray="3 4"/>`;
  return `<svg class="stamp ${done ? 'on' : 'off'}" viewBox="0 0 120 120">${shape}${mark}<text x="60" y="${rom ? 96 : 98}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="${Math.min(11, 150 / title.length)}" fill="${col}">${esc(title.toUpperCase())}</text></svg>`;
}
function starsHTML(n) { return `<span class="stars">${[1, 2, 3].map(i => `<span class="${i <= n ? 'on' : ''}">★</span>`).join('')}</span>`; }

/* ---------- Zustand je Kapitel ---------- */
const chState = id => (S.ch[id] = S.ch[id] || { i: 0, first: 0, tasks: 0, done: false });
const isTask = st => !['story', 'learn', 'fact', 'sudoku'].includes(st.t);
const journeyDone = jid => JOURNEYS[jid].chapters.every(c => S.ch[c.id] && S.ch[c.id].done);
const doneCount = jid => JOURNEYS[jid].chapters.filter(c => S.ch[c.id] && S.ch[c.id].done).length;
function unlocked(jid, idx) {
  if (S.teacher || idx === 0) return true;
  const prev = JOURNEYS[jid].chapters[idx - 1];
  return !!(S.ch[prev.id] && S.ch[prev.id].done);
}

/* ---------- Navigation ---------- */
let route = { v: 'hub' };
function go(r) { route = r; render(); window.scrollTo(0, 0); }
function theme(t) { document.body.className = 't-' + t + (S.teacher ? ' teacher' : ''); }
function render() {
  if (!S.name) return viewWelcome();
  if (!S.introSeen) return viewStory(INTRO, 'start', 'museum', () => { S.introSeen = true; save(); go({ v: 'hub' }); });
  ({ hub: viewHub, journey: viewJourney, chapter: viewChapter, pass: viewPass, workshop: viewWorkshop, ws: viewWsSudoku, finale: viewFinale }[route.v] || viewHub)();
}

/* ---------- Willkommen ---------- */
function viewWelcome() {
  theme('museum');
  APP.innerHTML = `<div class="screen"><div class="bg" id="bg"></div><div class="stage center">
    <div class="card welcome">
      <div class="hg-small">${hourglassSVG(false, false)}</div>
      <h1>Die Zahlen-Sanduhr</h1>
      <p>Eine Zeitreise zu den Römern und zu den Maya</p>
      <label for="nm">Wie heißt du? (nur dein Vorname)</label>
      <input id="nm" maxlength="20" autocomplete="off" autocapitalize="words" enterkeyhint="go">
      <button class="btn big" id="go">Los geht’s</button>
    </div></div></div>`;
  setBg(document.getElementById('bg'), 'start');
  const inp = document.getElementById('nm');
  const ok = () => {
    const v = inp.value.trim();
    if (!v) { inp.classList.add('shake'); setTimeout(() => inp.classList.remove('shake'), 500); return; }
    S.name = v; S.started = today(); save(); render();
  };
  document.getElementById('go').onclick = ok;
  inp.onkeydown = e => { if (e.key === 'Enter') ok(); };
}

/* ---------- Erzählsequenz (Intro/Finale) ---------- */
function viewStory(lines, scene, th, done) {
  theme(th);
  let i = 0;
  const draw = () => {
    const l = lines[i];
    APP.innerHTML = `<div class="screen"><div class="bg" id="bg"></div><div class="stage bottom">
      ${th === 'museum' ? `<div class="storyart">${hourglassSVG(scene === 'E1', scene === 'E1')}</div>` : ''}
      ${storyHTML(l)}
      <div class="row end"><button class="btn big" id="nx">${i < lines.length - 1 ? 'Weiter' : 'Los'}</button></div>
    </div></div>`;
    setBg(document.getElementById('bg'), scene);
    wirePortraits(APP);
    document.getElementById('nx').onclick = () => { i++; if (i < lines.length) draw(); else done(); };
  };
  draw();
}
function storyHTML(l) {
  const txt = l.text.replace(/\{name\}/g, esc(S.name));
  if (l.who === 'erz') return `<div class="narr">${txt}</div>`;
  return `<div class="speech">${portraitHTML(l.who)}<div class="bubble"><div class="who">${PEOPLE[l.who].name}</div>${txt}</div></div>`;
}

/* ---------- Museum ---------- */
function hourglassSVG(romOk, mayaOk) {
  const ringR = romOk ? 'ring ok rom' : 'ring broken';
  const ringM = mayaOk ? 'ring ok maya' : 'ring broken';
  return `<svg class="hourglass" viewBox="0 0 300 300" aria-hidden="true">
    <defs><path id="rp" d="M150 22 a128 128 0 1 1 -0.1 0"/></defs>
    <circle cx="150" cy="150" r="128" class="${ringR}"/>
    ${romOk ? '<text class="ringtxt"><textPath href="#rp">I · II · III · IV · V · VI · VII · VIII · IX · X · XI · XII · XIII · XIV · XV · XVI · XVII ·</textPath></text>' : ''}
    <circle cx="150" cy="150" r="108" class="${ringM}" ${mayaOk ? 'stroke-dasharray="3 9 26 9" stroke-linecap="round"' : ''}/>
    <g class="glass">
      <rect x="92" y="56" width="116" height="14" rx="5" class="brass"/>
      <rect x="92" y="230" width="116" height="14" rx="5" class="brass"/>
      <rect x="96" y="70" width="8" height="160" class="brass"/><rect x="196" y="70" width="8" height="160" class="brass"/>
      <path d="M110 72 H190 Q190 120 156 148 Q150 152 156 152 Q190 180 190 228 H110 Q110 180 144 152 Q150 150 144 148 Q110 120 110 72Z" class="bulb"/>
      <path d="M122 100 H178 Q172 124 150 140 Q128 124 122 100Z" class="sand"/>
      <path d="M118 226 Q150 186 182 226Z" class="sand"/>
      <line x1="150" y1="148" x2="150" y2="210" class="stream"/>
    </g></svg>`;
}
function viewHub() {
  theme('museum');
  const r = doneCount('rom'), m = doneCount('maya');
  const both = journeyDone('rom') && journeyDone('maya');
  if (both && !S.finaleSeen) return go({ v: 'finale' });
  APP.innerHTML = `<div class="screen"><div class="bg" id="bg"></div><div class="stage scroll">
    <div class="hub">
      <header class="hubhead">
        <div><h1>Die Zahlen-Sanduhr</h1><p>Hallo ${esc(S.name)}! ${both ? 'Die Sanduhr ist repariert.' : 'Wähle ein Tor für deine Zeitreise.'}</p></div>
        ${S.teacher ? '<span class="badge">Lehrkraft-Modus</span>' : ''}
      </header>
      <div class="hubmain">
        <button class="gate rom" id="g-rom">
          <span class="gtitle">Reise nach Rom</span><span class="gsub">${JOURNEYS.rom.sub}</span>
          <span class="prog"><i style="width:${r * 20}%"></i></span><span class="gcount">${r} von 5 Stationen</span>
        </button>
        <div class="hg">${hourglassSVG(journeyDone('rom'), journeyDone('maya'))}</div>
        <button class="gate maya" id="g-maya">
          <span class="gtitle">Reise zu den Maya</span><span class="gsub">${JOURNEYS.maya.sub}</span>
          <span class="prog"><i style="width:${m * 20}%"></i></span><span class="gcount">${m} von 5 Stationen</span>
        </button>
      </div>
      <div class="hubfoot">
        <button class="btn ghost" id="b-pass">Mein Zeitreisepass</button>
        <button class="btn ghost" id="b-ws">Sudoku-Werkstatt</button>
      </div>
    </div></div></div>`;
  setBg(document.getElementById('bg'), both ? 'E1' : 'start');
  document.getElementById('g-rom').onclick = () => go({ v: 'journey', j: 'rom' });
  document.getElementById('g-maya').onclick = () => go({ v: 'journey', j: 'maya' });
  document.getElementById('b-pass').onclick = () => go({ v: 'pass' });
  document.getElementById('b-ws').onclick = () => go({ v: 'workshop' });
}
function viewFinale() {
  viewStory(FINALE, 'E1', 'museum', () => { S.finaleSeen = true; save(); confetti(); go({ v: 'pass' }); });
}

/* ---------- Reisekarte ---------- */
function viewJourney() {
  const jid = route.j, J = JOURNEYS[jid];
  theme(jid);
  APP.innerHTML = `<div class="screen"><div class="bg" id="bg"></div>
    <header class="top"><button class="btn back" id="bk">Museum</button><h2>${J.title}</h2><span></span></header>
    <div class="stage scroll"><div class="map">
      ${J.chapters.map((c, i) => {
        const st = S.ch[c.id], done = st && st.done, open = unlocked(jid, i);
        const started = st && !done && st.i > 0;
        const num = jid === 'rom' ? `<span class="rn">${toRoman(i + 1)}</span>` : `<span class="ig">${glyph(i + 1)}</span>`;
        return `<button class="station ${done ? 'done' : ''} ${open ? '' : 'locked'}" data-i="${i}" ${open ? '' : 'disabled'}>
          <span class="snum">${num}</span>
          <span class="stitle">${c.title}</span>
          <span class="sstate">${done ? starsHTML(st.stars) : open ? (started ? 'weitermachen' : 'starten') : 'noch verschlossen'}</span>
          ${done ? `<span class="sstamp">${stampSVG(jid, i, c.stamp, true)}</span>` : ''}
        </button>`;
      }).join('<span class="path"></span>')}
    </div></div></div>`;
  setBg(document.getElementById('bg'), J.chapters[Math.min(doneCount(jid), 4)].scene);
  document.getElementById('bk').onclick = () => go({ v: 'hub' });
  APP.querySelectorAll('.station:not(.locked)').forEach(b => b.onclick = () => go({ v: 'chapter', j: jid, c: +b.dataset.i }));
}

/* ---------- Kapitel ---------- */
let attempts = 0;
function chapterRules(J, ci) {
  const out = [];
  J.chapters.slice(0, ci + 1).forEach(c => c.steps.forEach(s => { if (s.t === 'learn') out.push(s); }));
  return out;
}
function viewChapter() {
  const jid = route.j, J = JOURNEYS[jid], ch = J.chapters[route.c], st = chState(ch.id);
  theme(jid);
  if (st.done && st.i >= ch.steps.length) st.i = 0; // nochmal spielen
  const step = ch.steps[st.i];
  attempts = 0;
  const prog = Math.round(st.i / ch.steps.length * 100);
  const isSud = step.t === 'sudoku';
  APP.innerHTML = `<div class="screen"><div class="bg ${isSud ? 'dim' : ''}" id="bg"></div>
    <header class="top">
      <button class="btn back" id="bk">Karte</button>
      <div class="ttl"><h2>${ch.title}</h2><span class="prog thin"><i style="width:${prog}%"></i></span></div>
      <button class="btn ghost small" id="rules">Regeln</button>
    </header>
    <div class="stage ${step.t === 'story' ? 'bottom' : 'center'} scroll" id="stage"></div></div>`;
  setBg(document.getElementById('bg'), ch.scene);
  document.getElementById('bk').onclick = () => go({ v: 'journey', j: jid });
  document.getElementById('rules').onclick = () => {
    const rules = chapterRules(J, route.c);
    modal(`<h3>Deine Regelkarten</h3>${rules.length ? rules.map(r => `<div class="rulecard"><h4>${r.title}</h4>${rich(r.html)}</div>`).join('') : '<p>Hier gibt es noch keine Regelkarten.</p>'}`, [{ label: 'Schließen' }]);
  };
  const stage = document.getElementById('stage');
  const next = () => { st.i++; save(); if (st.i >= ch.steps.length) finishChapter(jid, route.c); else viewChapter(); };

  if (step.t === 'story') {
    stage.innerHTML = `${storyHTML(step)}<div class="row end"><button class="btn big" id="nx">Weiter</button></div>`;
    wirePortraits(stage);
    document.getElementById('nx').onclick = next;
    return;
  }
  if (step.t === 'learn' || step.t === 'fact') {
    stage.innerHTML = `<div class="card ${step.t}"><div class="kicker">${step.t === 'learn' ? 'Regelkarte' : 'Wissenshappen'}</div><h3>${step.title}</h3>${rich(step.html)}
      <div class="row end"><button class="btn big" id="nx">${step.t === 'learn' ? 'Verstanden' : 'Weiter'}</button></div></div>`;
    document.getElementById('nx').onclick = next;
    return;
  }
  if (isSud) {
    st.sud = st.sud || newSudoku(step.kind, step.diff);
    save();
    sudokuView(stage, st.sud, {
      onSolved: () => { confetti(); },
      doneLabel: 'Weiter', onDone: () => { delete st.sud; next(); }
    });
    return;
  }
  // Aufgaben
  stage.innerHTML = `<div class="card task"><div class="kicker">Aufgabe</div><div id="tq"></div><div id="tw"></div>
    <div id="fb" class="fb"></div>
    <div class="row end">${S.teacher ? '<button class="btn ghost small" id="skip">Überspringen</button>' : ''}<button class="btn big hidden" id="nx">Weiter</button></div></div>`;
  const win = () => {
    if (attempts === 0) st.first++;
    st.tasks++;
    const fb = document.getElementById('fb');
    fb.className = 'fb ok'; fb.innerHTML = `<b>${pick(PRAISE)}</b>${step.after ? ' ' + step.after : ''}`;
    document.getElementById('nx').classList.remove('hidden');
    document.getElementById('nx').onclick = next;
    APP.querySelectorAll('.lockable').forEach(b => b.disabled = true);
    document.getElementById('nx').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };
  const fail = (tip, way) => {
    attempts++;
    const fb = document.getElementById('fb');
    fb.className = 'fb bad';
    fb.innerHTML = `<b>Noch nicht.</b> ${tip || ''}${attempts >= 2 && way ? '<button class="btn link" id="wy">Lösungsweg zeigen</button><div id="wyb" class="hidden way">' + way + '</div>' : ''}`;
    const card = APP.querySelector('.card.task'); card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    const wy = document.getElementById('wy');
    if (wy) wy.onclick = () => { const wb = document.getElementById('wyb'); wb.classList.remove('hidden'); wy.remove(); wb.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
  };
  if (S.teacher) document.getElementById('skip').onclick = win;
  TASKS[step.t](step, document.getElementById('tq'), document.getElementById('tw'), win, fail, route.c);
}
function finishChapter(jid, ci) {
  const J = JOURNEYS[jid], ch = J.chapters[ci], st = chState(ch.id);
  const total = ch.steps.filter(isTask).length;
  const ratio = total ? Math.min(1, st.first / total) : 1;
  const stars = ratio >= 0.8 ? 3 : ratio >= 0.5 ? 2 : 1;
  const firstTime = !st.done;
  st.stars = Math.max(st.stars || 0, stars);
  st.done = true; st.date = st.date || today(); st.i = 0; st.first = 0; st.tasks = 0;
  save();
  confetti();
  const jd = journeyDone(jid);
  modal(`<div class="reward">${stampSVG(jid, ci, ch.stamp, true)}</div>
    <h3>${firstTime ? 'Neuer Stempel!' : 'Station nochmal geschafft!'}</h3>
    <p>Stempel „${ch.stamp}“ für deinen Zeitreisepass.</p>${starsHTML(stars)}
    ${jd && ci === 4 ? `<p class="ringmsg">Der <b>${J.ring}</b> ist zurück in der Sanduhr.</p>` : ''}`,
    [{ label: jd && ci === 4 ? 'Zurück ins Museum' : 'Zur Karte', cls: 'big', go: () => go(jd && ci === 4 ? { v: 'hub' } : { v: 'journey', j: jid }) }]);
}

/* ---------- Aufgabentypen ---------- */
function numPad(host, onCheck, maxLen = 6) {
  let val = '';
  host.innerHTML = `<div class="answer"><span class="disp" id="disp"></span></div>
    <div class="numpad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => `<button class="key lockable" data-k="${d}">${d}</button>`).join('')}
    <button class="key lockable del" data-k="del">⌫</button><button class="key lockable" data-k="0">0</button><button class="key lockable go" data-k="ok">Prüfen</button></div>`;
  const disp = host.querySelector('#disp');
  const show = () => { disp.textContent = val ? fmt(+val) : ''; disp.classList.toggle('empty', !val); };
  show();
  host.querySelectorAll('.key').forEach(b => b.onclick = () => {
    const k = b.dataset.k;
    if (k === 'del') val = val.slice(0, -1);
    else if (k === 'ok') { if (val) onCheck(+val); return; }
    else if (val.length < maxLen) val = (val === '0' ? '' : val) + k;
    show();
  });
}
function romanPad(host, onCheck) {
  let val = '';
  host.innerHTML = `<div class="answer"><span class="disp rn" id="disp"></span></div>
    <div class="rpad">${'IVXLCDM'.split('').map(c => `<button class="key lockable rk" data-k="${c}"><span class="rn">${c}</span><small>${RV[c]}</small></button>`).join('')}</div>
    <div class="rpad2"><button class="key lockable del" data-k="del">⌫ löschen</button><button class="key lockable go" data-k="ok">Prüfen</button></div>`;
  const disp = host.querySelector('#disp');
  const show = () => { disp.textContent = val; disp.classList.toggle('empty', !val); };
  show();
  host.querySelectorAll('.key').forEach(b => b.onclick = () => {
    const k = b.dataset.k;
    if (k === 'del') val = val.slice(0, -1);
    else if (k === 'ok') { if (val) onCheck(val); return; }
    else if (val.length < 16) val += k;
    show();
  });
}
const TASKS = {
  choice(step, q, w, win, fail) {
    q.innerHTML = `<p class="q">${rich(step.q)}</p>`;
    const order = shuffle(range(step.options.length));
    w.innerHTML = `<div class="choices">${order.map(i => `<button class="choice lockable" data-i="${i}">${rich(step.options[i])}</button>`).join('')}</div>`;
    w.querySelectorAll('.choice').forEach(b => b.onclick = () => {
      if (+b.dataset.i === step.answer) { b.classList.add('right'); win(); }
      else { b.classList.add('wrong'); b.disabled = true; fail(step.tip); }
    });
  },
  read(step, q, w, win, fail, ci) {
    const look = step.look || 'tablet';
    q.innerHTML = `<p class="q">${step.q || 'Welche Zahl ist das?'}</p><div class="obj ${look}"><span class="rn">${step.roman}</span></div>`;
    const val = romanValue(step.roman);
    numPad(w, a => {
      if (a === val) return win();
      const ns = naiveSum(step.roman);
      let tip;
      if (ns !== val && a === ns) tip = 'Achtung: Hier steht ein kleineres Zeichen vor einem größeren. Das wird abgezogen.';
      else if (ns !== val) tip = 'Geh Zeichen für Zeichen von links nach rechts. Steht ein kleineres Zeichen vor einem größeren, ziehst du es ab.';
      else tip = 'Schreib dir die Werte der einzelnen Zeichen auf und zähl sie zusammen.';
      fail(tip, wayRead(step.roman));
    });
  },
  write(step, q, w, win, fail) {
    const n = step.n === 'YEAR' ? new Date().getFullYear() : step.n;
    const from = step.from ? `<div class="obj tablet"><span class="rn">${step.from}</span></div>` : '';
    q.innerHTML = `<p class="q">${step.q || `Schreib die Zahl <b>${fmt(n)}</b> römisch.`}</p>${from}`;
    romanPad(w, a => {
      const v = romanValue(a);
      const okForm = step.mode === 'short' ? isStandard(a) : (isStandard(a) || isAdditive(a));
      if (v === n && okForm) return win();
      if (v === n && step.mode === 'short' && isAdditive(a)) return fail('Der Wert stimmt, aber es geht noch kürzer. Benutze die Subtraktionsregel.', wayWrite(n, 'short'));
      if (v === n) return fail('Der Wert stimmt, aber so darf man es nicht schreiben. Denk an die Regeln: höchstens vier gleiche Zeichen nebeneinander, V, L und D nur einmal.', wayWrite(n, step.mode));
      fail(step.tip || `Deine Zeichen ergeben ${isNaN(v) ? 'keine gültige Zahl' : fmt(v)}. Gesucht ist ${fmt(n)}. Zerlege ${fmt(n)} in Tausender, Hunderter, Zehner und Einer.`, wayWrite(n, step.mode));
    });
  },
  mread(step, q, w, win, fail) {
    q.innerHTML = `<p class="q">${step.q || 'Welche Zahl ist das?'}</p><div class="obj stone mayaobj">${stackHTML(toMaya(step.n), !!step.labels)}</div>`;
    numPad(w, a => {
      if (a === step.n) return win();
      const L = toMaya(step.n).length;
      fail(L > 1 ? 'Rechne jede Etage einzeln aus: Punkte sind 1, Striche 5. Dann nimm sie mal den Wert der Etage (unten 1, darüber 20, dann 400, dann 8000).' : 'Zähl die Punkte (je 1) und die Striche (je 5) zusammen. Die Muschel ist 0.', wayMayaRead(step.n));
    });
  },
  mbuild(step, q, w, win, fail) {
    const target = toMaya(step.n), L = target.length;
    const cur = new Array(L).fill(0);
    q.innerHTML = `<p class="q">${rich(step.q || `Leg die Zahl <b>${fmt(step.n)}</b> mit Maya-Zeichen.`)}</p>`;
    const draw = (msg) => {
      w.innerHTML = `<div class="builder">${cur.map((v, i) => `
        <div class="blev"><span class="mlab">${L > 1 ? '· ' + fmt(PLACE[L - 1 - i]) : ''}</span>
          <div class="mtile big">${glyph(v)}</div>
          <div class="bbtns"><button class="key lockable" data-a="d" data-i="${i}">+ <b>●</b></button><button class="key lockable" data-a="b" data-i="${i}">+ <b>▬</b></button><button class="key lockable del" data-a="c" data-i="${i}">leeren</button></div>
        </div>`).join('')}</div>
        <div class="bmsg">${msg || ''}</div>
        <div class="row end"><button class="key lockable go wide" id="chk">Prüfen</button></div>`;
      w.querySelectorAll('.bbtns .key').forEach(b => b.onclick = () => {
        const i = +b.dataset.i, a = b.dataset.a; let m = '';
        if (a === 'c') cur[i] = 0;
        else {
          const add = a === 'd' ? 1 : 5;
          const before = cur[i];
          cur[i] += add;
          if (a === 'd' && cur[i] % 5 === 0 && cur[i] < 20) m = 'Fünf Punkte werden zu einem Strich.';
          let k = i;
          while (cur[k] >= 20) {
            if (k === 0) { cur[k] = before; m = 'Mehr passt in diese Etage nicht hinein.'; break; }
            cur[k] -= 20; cur[k - 1] += 1; k--;
            m = '20 voll! Ein Punkt wandert eine Etage nach oben.';
          }
        }
        draw(m);
      });
      w.querySelector('#chk').onclick = () => {
        if (cur.every((v, i) => v === target[i])) return win();
        const v = fromMaya(cur);
        fail(L > 1 ? `Deine Zahl ist ${fmt(v)}, gesucht ist ${fmt(step.n)}. Fang oben an: Wie oft passt ${fmt(PLACE[L - 1])} in ${fmt(step.n)}?` : `Du hast ${fmt(v)} gelegt, gesucht ist ${fmt(step.n)}. Ein Punkt ist 1, ein Strich ist 5.`, wayMayaBuild(step.n));
      };
    };
    draw();
  },
  chrono(step, q, w, win, fail) {
    const picked = new Set();
    q.innerHTML = `<p class="q">Tippe die großen Buchstaben an, die römische Zahlzeichen sind. Rechne dann die Jahreszahl aus.</p>
      <div class="obj marble chrono">${[...step.text].map((c, i) => /[A-Z]/.test(c) ? `<button class="cl lockable" data-i="${i}">${c}</button>` : c === ' ' ? '<span class="sp"> </span>' : `<span class="lc">${c}</span>`).join('')}</div>
      <div class="collected" id="col"><span class="hint">Deine Zeichen erscheinen hier.</span></div>`;
    const col = q.querySelector('#col');
    q.querySelectorAll('.cl').forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      if (picked.has(i)) picked.delete(i); else picked.add(i);
      b.classList.toggle('on', picked.has(i));
      const letters = [...picked].sort((a, b2) => a - b2).map(k => step.text[k]);
      col.innerHTML = letters.length ? letters.map(c => `<span class="rn chip ${RV[c] ? '' : 'bad'}">${c}</span>`).join('') : '<span class="hint">Deine Zeichen erscheinen hier.</span>';
    });
    const letters = [...step.text].filter(c => RV[c]);
    const way = letters.map(c => `<span class="rn">${c}</span>&nbsp;${RV[c]}`).join(' + ') + ` = <b>${step.answer}</b>`;
    numPad(w, a => {
      if (a === step.answer) return win();
      const nonR = [...picked].some(k => !RV[step.text[k]]);
      fail(nonR ? 'Du hast einen Buchstaben gewählt, der keine römische Zahl ist (rot markiert). Den lässt du weg.' : 'Hast du alle großen Zahlzeichen gefunden? Gesucht sind I, V, X, L, C, D und M. Zähl dann alle Werte zusammen.', way);
    });
  },
  match(step, q, w, win, fail) {
    const dates = step.items.map(x => x.answer);
    const sel = new Array(step.items.length).fill(null);
    q.innerHTML = `<p class="q">${step.q}</p>`;
    const draw = () => {
      w.innerHTML = `<div class="match">${step.items.map((it, i) => `<div class="mrow" id="mr${i}"><span class="mev">${it.label}</span><span class="mopts">${dates.map(d => `<button class="chip pick lockable ${sel[i] === d ? 'on' : ''}" data-i="${i}" data-d="${d}"><span class="rn">${d}</span></button>`).join('')}</span></div>`).join('')}</div>
        <div class="row end"><button class="key lockable go wide" id="chk">Prüfen</button></div>`;
      w.querySelectorAll('.pick').forEach(b => b.onclick = () => { sel[+b.dataset.i] = b.dataset.d; draw(); });
      w.querySelector('#chk').onclick = () => {
        if (sel.some(x => !x)) return fail('Wähle für jedes Ereignis eine Jahreszahl aus.');
        let ok = true;
        step.items.forEach((it, i) => { const right = sel[i] === it.answer; ok = ok && right; w.querySelector('#mr' + i).classList.toggle('wrong', !right); });
        if (ok) win();
        else fail(step.tip, dates.map(d => `<span class="rn">${d}</span> = ${romanValue(d)}`).join(', '));
      };
    };
    draw();
  }
};

/* ---------- Sudoku ---------- */
function groupPerm(b) {
  const out = [];
  for (const g of shuffle(range(b))) for (const i of shuffle(range(b))) out.push(g * b + i);
  return out;
}
function newSudoku(kind, diff) {
  const b = kind === 'rom9' ? 3 : kind === 'maya4' ? 2 : 4, n = b * b;
  const pool = POOLS[kind === 'rom9' ? 's9_' + (diff || 'leicht') : kind === 'maya4' ? 's4' : 's16_' + (diff || 'leicht')];
  const base = pick(pool);
  const dec = c => c === '.' ? -1 : parseInt(c, 16);
  const P = [...base.p].map(dec), Sol = [...base.s].map(dec);
  const sym = shuffle(range(n)), rows = groupPerm(b), cols = groupPerm(b), tr = Math.random() < 0.5;
  const p = [], s = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const rr = tr ? c : r, cc = tr ? r : c;
    const k = rows[rr] * n + cols[cc];
    p.push(P[k] < 0 ? -1 : sym[P[k]]); s.push(sym[Sol[k]]);
  }
  const sd = { kind, diff: diff || '', b, n, p, s, e: p.slice(), hints: 0, maxHints: n === 4 ? 1 : n === 9 ? 3 : 6, solved: false };
  if (kind === 'maya4') sd.map = shuffle(range(20)).slice(0, 4).sort((x, y) => x - y);
  return sd;
}
function symHTML(sd, v) {
  if (v < 0) return '';
  if (sd.kind === 'rom9') return `<span class="rn">${toRoman(v + 1)}</span>`;
  return glyph(sd.kind === 'maya4' ? sd.map[v] : v);
}
function symNum(sd, v) { return sd.kind === 'rom9' ? v + 1 : sd.kind === 'maya4' ? sd.map[v] : v; }
function conflicts(sd) {
  const { n, b, e } = sd, bad = new Set();
  const units = [];
  for (let r = 0; r < n; r++) units.push(range(n).map(c => r * n + c));
  for (let c = 0; c < n; c++) units.push(range(n).map(r => r * n + c));
  for (let br = 0; br < b; br++) for (let bc = 0; bc < b; bc++) { const u = []; for (let r = 0; r < b; r++) for (let c = 0; c < b; c++) u.push((br * b + r) * n + bc * b + c); units.push(u); }
  for (const u of units) {
    const seen = {};
    for (const k of u) if (e[k] >= 0) (seen[e[k]] = seen[e[k]] || []).push(k);
    for (const v in seen) if (seen[v].length > 1) seen[v].forEach(k => bad.add(k));
  }
  return bad;
}
function sudokuView(host, sd, opt) {
  let sel = -1, wrong = new Set(), msg = '';
  const { n, b } = sd;
  const persist = () => save();
  const layout = () => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const land = vw > vh * 1.12;
    const head = 70;
    let size = land ? Math.min(vh - head - 40, vw - 360) : Math.min(vw - 28, vh - head - (n === 16 ? 260 : 220));
    size = Math.max(240, Math.floor(size));
    if (n === 4) size = Math.min(size, 440);
    host.style.setProperty('--bsize', size + 'px');
    host.style.setProperty('--cell', (size / n) + 'px');
    host.classList.toggle('land', land);
  };
  const draw = () => {
    const bad = conflicts(sd);
    const selV = sel >= 0 ? sd.e[sel] : -1;
    const sr = Math.floor(sel / n), sc = sel % n;
    const counts = new Array(n).fill(0); sd.e.forEach(v => { if (v >= 0) counts[v]++; });
    const cells = sd.e.map((v, k) => {
      const r = Math.floor(k / n), c = k % n;
      const cls = ['cell'];
      if (sd.p[k] >= 0) cls.push('given');
      if (k === sel) cls.push('sel');
      else if (sel >= 0 && (r === sr || c === sc || (Math.floor(r / b) === Math.floor(sr / b) && Math.floor(c / b) === Math.floor(sc / b)))) cls.push('peer');
      if (v >= 0 && v === selV && k !== sel) cls.push('same');
      if (bad.has(k) && sd.p[k] < 0) cls.push('conflict');
      if (wrong.has(k)) cls.push('wrong');
      if (sd.hinted && sd.hinted.includes(k)) cls.push('hinted');
      if ((c + 1) % b === 0 && c < n - 1) cls.push('br');
      if ((r + 1) % b === 0 && r < n - 1) cls.push('bb');
      return `<button class="${cls.join(' ')}" data-k="${k}">${symHTML(sd, v)}</button>`;
    }).join('');
    const maya = sd.kind !== 'rom9';
    const palette = range(n).map(v => `<button class="pal ${counts[v] >= n ? 'full' : ''}" data-v="${v}">${symHTML(sd, v)}${maya && S.showNums ? `<small>${symNum(sd, v)}</small>` : ''}</button>`).join('');
    host.innerHTML = `<div class="sudo s${n} ${sd.kind}">
      <div class="board" style="grid-template-columns:repeat(${n},1fr)">${cells}</div>
      <div class="side">
        <div class="palette p${n}">${palette}<button class="pal erase" data-v="-1">Radierer</button></div>
        <div class="tools">
          <button class="btn ghost small" id="chk">Prüfen</button>
          <button class="btn ghost small" id="hint" ${sd.hints >= sd.maxHints || sd.solved ? 'disabled' : ''}>Tipp (${sd.maxHints - sd.hints})</button>
          ${maya ? `<button class="btn ghost small" id="nums">${S.showNums ? 'Zahlen aus' : 'Zahlen zeigen'}</button>` : ''}
          ${opt.onNew ? '<button class="btn ghost small" id="new">Neues Rätsel</button>' : ''}
          ${S.teacher ? '<button class="btn ghost small" id="solve">Lösen</button>' : ''}
        </div>
        <div class="smsg ${sd.solved ? 'ok' : ''}">${sd.solved ? 'Geschafft! Alles richtig.' : msg}</div>
        ${sd.solved ? `<button class="btn big" id="done">${opt.doneLabel || 'Weiter'}</button>` : ''}
      </div></div>`;
    host.querySelectorAll('.cell').forEach(el => el.onclick = () => {
      if (sd.solved) return;
      const k = +el.dataset.k; sel = (sd.p[k] >= 0) ? (sel === k ? -1 : k) : k; msg = ''; draw();
    });
    host.querySelectorAll('.pal').forEach(el => el.onclick = () => {
      if (sd.solved) return;
      if (sel < 0 || sd.p[sel] >= 0) { msg = 'Tippe zuerst auf ein leeres Feld.'; return draw(); }
      const v = +el.dataset.v;
      sd.e[sel] = (sd.e[sel] === v) ? -1 : v;
      wrong.delete(sel); if (sd.hinted) sd.hinted = sd.hinted.filter(x => x !== sel);
      msg = '';
      check(); persist(); draw();
    });
    host.querySelector('#chk').onclick = () => {
      wrong = new Set(); sd.e.forEach((v, k) => { if (v >= 0 && sd.p[k] < 0 && v !== sd.s[k]) wrong.add(k); });
      const empty = sd.e.filter(v => v < 0).length;
      msg = wrong.size ? `${wrong.size} ${wrong.size === 1 ? 'Feld stimmt' : 'Felder stimmen'} nicht. Sie sind jetzt markiert.` : `Bis jetzt ist alles richtig. Noch ${empty} ${empty === 1 ? 'Feld' : 'Felder'} frei.`;
      draw();
    };
    const hb = host.querySelector('#hint');
    hb.onclick = () => {
      let k = (sel >= 0 && sd.p[sel] < 0 && sd.e[sel] !== sd.s[sel]) ? sel : -1;
      if (k < 0) { const free = range(n * n).filter(i => sd.e[i] !== sd.s[i]); if (!free.length) return; k = pick(free); }
      sd.e[k] = sd.s[k]; sd.hints++; sd.hinted = (sd.hinted || []).concat(k); sel = k; wrong.delete(k);
      msg = 'Ein Feld wurde für dich gefüllt.'; check(); persist(); draw();
    };
    const nb = host.querySelector('#nums'); if (nb) nb.onclick = () => { S.showNums = !S.showNums; save(); draw(); };
    const nw = host.querySelector('#new'); if (nw) nw.onclick = () => modal('<h3>Neues Rätsel?</h3><p>Dein angefangenes Rätsel geht dabei verloren.</p>', [{ label: 'Abbrechen', cls: 'ghost' }, { label: 'Ja, neues Rätsel', go: opt.onNew }]);
    const sv = host.querySelector('#solve'); if (sv) sv.onclick = () => { sd.e = sd.s.slice(); check(); persist(); draw(); };
    const dn = host.querySelector('#done'); if (dn) dn.onclick = opt.onDone;
  };
  const check = () => {
    if (!sd.solved && sd.e.every((v, k) => v === sd.s[k])) { sd.solved = true; sel = -1; persist(); opt.onSolved && opt.onSolved(); }
  };
  layout(); draw();
  const onR = () => { if (!document.body.contains(host)) return window.removeEventListener('resize', onR); layout(); };
  window.addEventListener('resize', onR);
}

/* ---------- Werkstatt ---------- */
function viewWorkshop() {
  theme('museum');
  APP.innerHTML = `<div class="screen"><div class="bg" id="bg"></div>
    <header class="top"><button class="btn back" id="bk">Museum</button><h2>Sudoku-Werkstatt</h2><span></span></header>
    <div class="stage scroll"><div class="ws">
      <p class="wsintro">Hier bekommst du immer wieder neue Rätsel. Jedes ist anders.</p>
      ${WORKSHOP.map(w => {
        const open = S.teacher || journeyDone(w.journey);
        const cnt = S.solved[w.key] || 0;
        const started = S.ws[w.key] && !S.ws[w.key].solved;
        return `<button class="wscard ${w.journey} ${open ? '' : 'locked'}" data-k="${w.key}" ${open ? '' : 'disabled'}>
          <span class="wsicon">${w.journey === 'rom' ? '<span class="rn">IX</span>' : glyph(13)}</span>
          <span class="wst">${w.title}</span><span class="wsl">${w.level}</span>
          <span class="wsc">${open ? (started ? 'weitermachen · ' : '') + cnt + ' gelöst' : (w.journey === 'rom' ? 'nach der Reise nach Rom' : 'nach der Reise zu den Maya')}</span>
        </button>`;
      }).join('')}
    </div></div></div>`;
  setBg(document.getElementById('bg'), 'start');
  document.getElementById('bk').onclick = () => go({ v: 'hub' });
  APP.querySelectorAll('.wscard:not(.locked)').forEach(b => b.onclick = () => go({ v: 'ws', k: b.dataset.k }));
}
function viewWsSudoku() {
  const w = WORKSHOP.find(x => x.key === route.k);
  theme(w.journey);
  if (!S.ws[w.key] || S.ws[w.key].solved) { S.ws[w.key] = newSudoku(w.kind, w.diff); save(); }
  const sd = S.ws[w.key];
  APP.innerHTML = `<div class="screen"><div class="bg dim" id="bg"></div>
    <header class="top"><button class="btn back" id="bk">Werkstatt</button><h2>${w.title} <small>${w.level}</small></h2><span></span></header>
    <div class="stage center scroll" id="stage"></div></div>`;
  setBg(document.getElementById('bg'), w.journey === 'rom' ? 'R5' : 'M5');
  document.getElementById('bk').onclick = () => go({ v: 'workshop' });
  sudokuView(document.getElementById('stage'), sd, {
    onSolved: () => { S.solved[w.key] = (S.solved[w.key] || 0) + 1; save(); confetti(); },
    doneLabel: 'Nächstes Rätsel',
    onDone: () => { S.ws[w.key] = newSudoku(w.kind, w.diff); save(); viewWsSudoku(); },
    onNew: () => { S.ws[w.key] = newSudoku(w.kind, w.diff); save(); viewWsSudoku(); }
  });
}

/* ---------- Zeitreisepass ---------- */
function viewPass() {
  theme('museum');
  const both = journeyDone('rom') && journeyDone('maya');
  const totalSolved = Object.values(S.solved).reduce((a, b) => a + b, 0);
  const page = jid => {
    const J = JOURNEYS[jid];
    return `<section class="ppage ${jid}"><h3>${J.title}</h3><div class="stamps">${J.chapters.map((c, i) => {
      const st = S.ch[c.id]; const d = st && st.done;
      return `<div class="pst">${stampSVG(jid, i, c.stamp, d)}<span class="pt">${c.title}</span>${d ? starsHTML(st.stars) + `<span class="pd">${st.date}</span>` : '<span class="pd">offen</span>'}</div>`;
    }).join('')}</div>
    <p class="ring ${journeyDone(jid) ? 'ok' : ''}">${journeyDone(jid) ? J.ring + ' zurückgebracht' : J.ring + ': noch nicht'}</p></section>`;
  };
  APP.innerHTML = `<div class="screen"><div class="bg" id="bg"></div>
    <header class="top"><button class="btn back" id="bk">Museum</button><h2>Zeitreisepass</h2><span></span></header>
    <div class="stage scroll"><div class="pass">
      <div class="phead"><div><div class="kicker">Zeitreisepass von</div><div class="pname">${esc(S.name)}</div><div class="small">Erste Reise am ${S.started || ''}</div></div>
      <div class="hg-small">${hourglassSVG(journeyDone('rom'), journeyDone('maya'))}</div></div>
      ${page('rom')}${page('maya')}
      <section class="ppage"><h3>Sudoku-Werkstatt</h3><p>${totalSolved ? `${totalSolved} ${totalSolved === 1 ? 'Rätsel' : 'Rätsel'} gelöst` : 'Noch keine Werkstatt-Rätsel gelöst.'}</p>
      ${totalSolved ? `<p class="small">${WORKSHOP.filter(w => S.solved[w.key]).map(w => `${w.title} (${w.level}): ${S.solved[w.key]}`).join(' · ')}</p>` : ''}</section>
      <div class="final ${both ? 'ok' : ''}">${both ? '<b>Zusatzbaustein Z1 „Antike Zahlensysteme“ geschafft.</b> Zeig diesen Pass deiner Lehrerin oder deinem Lehrer.' : 'Wenn beide Ringe zurück sind, ist der Zusatzbaustein geschafft.'}</div>
      <div class="row center"><button class="btn link" id="tch">Für Lehrkräfte</button></div>
    </div></div></div>`;
  setBg(document.getElementById('bg'), 'start');
  document.getElementById('bk').onclick = () => go({ v: 'hub' });
  document.getElementById('tch').onclick = () => {
    const m = modal(`<h3>Für Lehrkräfte</h3><p>Code eingeben:</p><input id="code" autocomplete="off" autocapitalize="characters"><p class="small" id="cmsg"></p>`,
      [{ label: 'Abbrechen', cls: 'ghost' }, { label: 'OK', keep: true, go: mm => {
        const c = mm.querySelector('#code').value.trim().toUpperCase();
        if (c === TEACHER_CODE) { S.teacher = !S.teacher; save(); mm.remove(); go({ v: 'pass' }); }
        else if (c === RESET_CODE) { const t = S.teacher; S = blank(); S.teacher = t; save(); mm.remove(); render(); }
        else mm.querySelector('#cmsg').textContent = 'Dieser Code passt nicht.';
      } }]);
    m.querySelector('#code').focus();
  };
}

/* ---------- Start ---------- */
render();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
