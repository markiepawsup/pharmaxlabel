/* Pharmax Label — service worker (v1.38)
 * - ไฟล์หลักของเว็บ (index / data.js / drug-submit.js): ดึงจากเน็ตก่อนเสมอ (ได้รุ่นล่าสุด) · เน็ตช้าเกิน 5 วิ หรือออฟไลน์ → ใช้สำเนาในเครื่อง
 * - รูป/ไอคอน/ฟอนต์/ไลบรารีกล้อง: ใช้สำเนาในเครื่อง แล้วอัปเดตเบื้องหลัง
 * - Google Sheet (gviz) และ Apps Script: ไม่แตะ (ไปที่เน็ตตรงๆ — หน้าเว็บมีแคชข้อมูลยาของตัวเองอยู่แล้ว)
 * เปลี่ยนเลข BUILD ทุกครั้งที่อัปโหลดไฟล์ชุดใหม่ (ให้ตรงกับ <meta name="pmx-build"> ใน index.html) */
const BUILD = '20261025-1';
const CORE = 'pmx-core-' + BUILD;
const ASSET = 'pmx-asset-v1';
const PRECACHE = ['./', 'index.html', 'data.js', 'drug-submit.js', 'manifest.webmanifest',
  'img/icon-192.png', 'img/icon-512.png', 'img/apple-touch-icon.png', 'img/icare-color.png', 'img/superdrug-color.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CORE).then(c => Promise.all(PRECACHE.map(u =>
    fetch(u, { cache: 'reload' }).then(r => r.ok ? c.put(u, r) : null).catch(() => null)))));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('pmx-core-') && k !== CORE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

const isCore = url => url.origin === self.location.origin && (/\/$|\.html$|\/data\.js$|\/drug-submit\.js$|\.webmanifest$/.test(url.pathname));
const isAsset = url => (url.origin === self.location.origin && /\.(png|jpe?g|svg|webp|ico|woff2?)$/.test(url.pathname)) ||
  /^(fonts\.googleapis\.com|fonts\.gstatic\.com|unpkg\.com|cdn\.jsdelivr\.net)$/.test(url.hostname);

function networkFirst(req) {
  return caches.open(CORE).then(cache => new Promise(resolve => {
    let done = false;
    const fromCache = () => cache.match(req, { ignoreSearch: true }).then(r => r || (req.mode === 'navigate' ? cache.match('index.html') : null));
    const timer = setTimeout(() => fromCache().then(r => { if (r && !done) { done = true; resolve(r); } }), 5000);
    fetch(req).then(res => {
      clearTimeout(timer);
      if (res && res.ok && res.status === 200) cache.put(req.mode === 'navigate' ? 'index.html' : req, res.clone()).catch(() => {});
      if (!done) { done = true; resolve(res); }
    }).catch(() => { clearTimeout(timer); fromCache().then(r => { if (!done) { done = true; resolve(r || Response.error()); } }); });
  }));
}
function staleWhileRevalidate(req) {
  return caches.open(ASSET).then(cache => cache.match(req).then(hit => {
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()).catch(() => {}); return res; }).catch(() => hit);
    return hit || net;
  }));
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;          // เช็กเวอร์ชันใช้ Range → ไปเน็ตตรงๆ ไม่เก็บแคช
  const url = new URL(req.url);
  if (req.cache === 'no-store') return;
  if (req.mode === 'navigate' || isCore(url)) { e.respondWith(networkFirst(req)); return; }
  if (isAsset(url)) { e.respondWith(staleWhileRevalidate(req)); return; }
});
