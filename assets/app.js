/* ============================================================
   Antel Art — общий скрипт всех страниц
   Строит шапку и подвал, переключает язык, рисует карточки.
   ============================================================ */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* выбранный язык живёт между страницами */
function readLang(){
  try { const v = localStorage.getItem('antel-lang'); if (v && T[v]) return v; } catch(e){}
  return 'ru';
}
function saveLang(v){ try { localStorage.setItem('antel-lang', v); } catch(e){} }

let lang = readLang();
const t = k => (T[lang] && T[lang][k] !== undefined) ? T[lang][k] : (T.ru[k] !== undefined ? T.ru[k] : k);
const loc = o => o[lang] || o.ru;
const PAGE = document.body.dataset.page || '';

/* ---------- SVG ---------- */
const ICON = {
  tg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.8 19c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.35-.1-.55-.6-.2L6.3 13 1.5 11.5c-1-.3-1-1 .2-1.5l19-7.3c.9-.3 1.6.2 1.2 1.6z"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.4"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h5l2 5-3 2a12 12 0 006 6l2-3 5 2v5a1 1 0 01-1 1A17 17 0 013 6a1 1 0 011-1z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
};

/* ---------- ШАПКА ---------- */
const NAV = [
  ['index.html',    'navHome'],
  ['catalog.html',  'navCatalog'],
  ['about.html',    'navAbout'],
  ['blog.html',     'navBlog'],
  ['contacts.html', 'navContacts']
];

function buildHeader(){
  const links = NAV.map(([href, key]) =>
    `<a href="${href}"${PAGE === href ? ' class="on"' : ''} data-i18n="${key}">${t(key)}</a>`).join('');

  $('#site-header').innerHTML = `
  <div class="demo" data-i18n="demo">${t('demo')}</div>
  <div class="strip">
    <div class="wrap">
      <span data-i18n="stripAddr">${t('stripAddr')}</span>
      <span data-i18n="stripHours">${t('stripHours')}</span>
      <div class="sp">
        <a href="${TG}" target="_blank" rel="noopener">@antel_uz</a>
      </div>
    </div>
  </div>
  <header>
    <div class="wrap">
      <a href="index.html" class="brand">
        <span class="mark"><img src="logo-mark.png" alt="Antel Art"></span>
        <span class="wm"><b>ANTEL<i>ART</i></b><span>PRINT · SIGN · VISUAL</span></span>
      </a>
      <nav class="main">${links}</nav>
      <div class="hright">
        <div class="tel"><b>+998 55 503 42 24</b><small data-i18n="telSub">${t('telSub')}</small></div>
        <div class="langs">
          <button data-lang="ru"${lang==='ru'?' class="on"':''}>RU</button>
          <button data-lang="uz"${lang==='uz'?' class="on"':''}>UZ</button>
          <button data-lang="en"${lang==='en'?' class="on"':''}>EN</button>
        </div>
        <a href="${TG}" target="_blank" rel="noopener" class="hcta" data-i18n="headCta">${t('headCta')}</a>
        <button class="burger" id="burger" aria-label="menu"><i></i><i></i><i></i></button>
      </div>
    </div>
  </header>
  <div class="mnav" id="mnav">
    <div class="panel">
      <button class="x" id="mnavX">&times;</button>
      ${NAV.map(([href,key]) => `<a href="${href}" data-i18n="${key}">${t(key)}</a>`).join('')}
      <a href="${TG}" target="_blank" rel="noopener" class="btn btn-lime" data-i18n="headCta">${t('headCta')}</a>
      <a href="tel:+998555034224" class="btn btn-dark">+998 55 503 42 24</a>
    </div>
  </div>`;

  const mnav = $('#mnav');
  $('#burger').addEventListener('click', () => mnav.classList.add('on'));
  $('#mnavX').addEventListener('click', () => mnav.classList.remove('on'));
  mnav.addEventListener('click', e => { if (e.target === mnav) mnav.classList.remove('on'); });
  addEventListener('keydown', e => { if (e.key === 'Escape') mnav.classList.remove('on'); });
  $$('.langs button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
}

/* ---------- ПОДВАЛ ---------- */
function buildFooter(){
  $('#site-footer').innerHTML = `
  <footer>
    <div class="wrap">
      <div class="fg">
        <div class="fbrand">
          <img src="logo-mark.png" alt="Antel Art">
          <div class="wmf"><b>ANTEL<i>ART</i></b><span>PRINT · SIGN · VISUAL</span></div>
          <p data-i18n="fAbout">${t('fAbout')}</p>
          <div class="socs"><i>tg</i><i>ig</i><i>fb</i><i>yt</i></div>
        </div>
        <div>
          <h5 data-i18n="fc1">${t('fc1')}</h5>
          <ul>
            <li><a href="catalog.html?cat=print" data-i18n="cat_print">${t('cat_print')}</a></li>
            <li><a href="catalog.html?cat=souvenir" data-i18n="cat_souvenir">${t('cat_souvenir')}</a></li>
            <li><a href="catalog.html?cat=wide" data-i18n="cat_wide">${t('cat_wide')}</a></li>
            <li><a href="catalog.html?cat=cut" data-i18n="cat_cut">${t('cat_cut')}</a></li>
          </ul>
        </div>
        <div>
          <h5 data-i18n="fc2">${t('fc2')}</h5>
          <ul>
            <li><a href="about.html" data-i18n="navAbout">${t('navAbout')}</a></li>
            <li><a href="blog.html" data-i18n="navBlog">${t('navBlog')}</a></li>
            <li><a href="contacts.html" data-i18n="navContacts">${t('navContacts')}</a></li>
          </ul>
          <div class="pays"><span>UZCARD</span><span>HUMO</span><span>VISA</span></div>
        </div>
        <div>
          <h5 data-i18n="fc3">${t('fc3')}</h5>
          <ul class="fcon">
            <li>${ICON.pin}<span data-i18n="conAddrV">${t('conAddrV')}</span></li>
            <li>${ICON.phone}<a href="tel:+998555034224">+998 55 503 42 24</a></li>
            <li>${ICON.mail}<a href="mailto:webantelart@gmail.com">webantelart@gmail.com</a></li>
            <li>${ICON.clock}<span data-i18n="stripHours">${t('stripHours')}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="fbot">
        <div>© 2026 Antel Art LLC. <span data-i18n="rights">${t('rights')}</span></div>
        <nav>
          <a href="#" data-i18n="cl1">${t('cl1')}</a>
          <a href="#" data-i18n="cl2">${t('cl2')}</a>
        </nav>
      </div>
    </div>
  </footer>
  <button class="top" id="top">↑</button>
  <div class="tg"><a href="${TG}" target="_blank" rel="noopener" class="ic">${ICON.tg}</a></div>`;

  const toTop = $('#top');
  addEventListener('scroll', () => toTop.classList.toggle('on', scrollY > 600), {passive:true});
  toTop.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));
}

/* ---------- КАРТОЧКА ТОВАРА ---------- */
function cardHTML(p){
  const L = loc(p);
  const flag = p.hit ? `<div class="flag hot">${t('flagHit')}</div>`
             : p.isNew ? `<div class="flag">${t('flagNew')}</div>` : '';
  return `<article class="card">
    <a href="product.html?id=${p.id}" class="ph">${flag}<img src="img/${p.img}" alt="${L.name}" loading="lazy"></a>
    <div class="in">
      <h4><a href="product.html?id=${p.id}">${L.name}</a></h4>
      <div class="meta">${L.unit}</div>
      <div class="foot">
        <div class="pr">${t('from')}<b>${p.price} ${t('sum')}</b></div>
        <a class="mini" href="product.html?id=${p.id}">${t('more')}</a>
      </div>
    </div>
  </article>`;
}

/* ---------- ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА ---------- */
function setLang(l){
  lang = l; saveLang(l);
  document.documentElement.lang = l;
  buildHeader();
  buildFooter();
  if (typeof renderPage === 'function') renderPage();
  $$('[data-i18n]').forEach(el => {
    const v = T[lang][el.dataset.i18n];
    if (v !== undefined) el.innerHTML = v;
  });
  $$('[data-i18n-ph]').forEach(el => {
    const v = T[lang][el.dataset.i18nPh];
    if (v !== undefined) el.placeholder = v;
  });
  revealAll();
}

/* ---------- ПОЯВЛЕНИЕ ПРИ ПРОКРУТКЕ ---------- */
let io = null;
function revealAll(){
  const reduce = typeof matchMedia === 'function'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = $$('.sec-head, .bx, .step, .rev, .split-ph, .prose, .feat, .post, .ccard, .cta, .card, .why div');
  if (io) io.disconnect();
  if (reduce || !('IntersectionObserver' in window)){
    els.forEach(e => { e.classList.add('rv','in'); });
    return;
  }
  io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.1, rootMargin:'0px 0px -6% 0px'});
  els.forEach(el => {
    el.classList.add('rv');
    const i = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    if (i > 0 && i < 5) el.classList.add('rv-d' + i);
    io.observe(el);
  });
}

/* ---------- СТАРТ ---------- */
document.documentElement.lang = lang;
buildHeader();
buildFooter();
if (typeof renderPage === 'function') renderPage();
$$('[data-i18n]').forEach(el => {
  const v = T[lang][el.dataset.i18n];
  if (v !== undefined) el.innerHTML = v;
});
revealAll();
