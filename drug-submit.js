/* Pharmax – เพิ่มข้อมูลยาใหม่ผ่านหน้าเว็บ (login / สมัคร / ส่งข้อมูลให้แอดมินตรวจ)  ·  v1.39
 * ใช้คู่กับ Code.gs (Apps Script Web App)  —  วางไฟล์นี้ไว้โฟลเดอร์เดียวกับ index.html */
window.PMX_DS_BUILD = '20261026-1';   // v1.38: ต้องตรงกับ <meta name="pmx-build"> ใน index.html
(function () {
  'use strict';

  // ⬇⬇⬇ ใส่ URL ของ Web App (ลงท้ายด้วย /exec) หลัง Deploy Apps Script ⬇⬇⬇
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxKCFW2aoJ4hQZJjLMsqsuzyxGxUxukM0FlFYxTvi3_Ay-dwsBYpXu1G-ad5dSfPjtG/exec';

  const $ = (s, r) => (r || document).querySelector(s);
  // v2: เก็บเฉพาะ token ที่เซิร์ฟเวอร์ออกให้ (ไม่เก็บ PIN ไว้ในเครื่องอีกต่อไป)
  const SESSION_KEY = 'pharmax_submit_session_v2';
  let session = null;
  try { sessionStorage.removeItem('pharmax_submit_session'); } catch (e) {}          // ลบ session รุ่นเก่าที่มี PIN ค้างอยู่
  try { session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch (e) {}
  if (!session || !session.token) session = null;

  // ---------- API ----------
  async function api(payload) {
    if (!WEB_APP_URL) return { ok: false, message: 'ยังไม่ได้ตั้งค่า WEB_APP_URL ใน drug-submit.js' };
    try {
      // ใช้ text/plain เพื่อไม่ให้เบราว์เซอร์ส่ง preflight (Apps Script ไม่รองรับ OPTIONS)
      const res = await fetch(WEB_APP_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
      return await res.json();
    } catch (e) {
      return { ok: false, message: 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่' };
    }
  }
  const auth = () => ({ token: session.token });

  // ---------- validation ----------
  function pinError(pin) {
    if (!/^\d{4}$/.test(pin)) return 'รหัสผ่านต้องเป็นตัวเลข 4 หลัก';
    const d = pin.split('').map(Number);
    if (d.every(x => x === d[0])) return 'รหัสผ่านห้ามเป็นเลขซ้ำกันทั้งหมด (เช่น 1111)';
    if (d.every((x, i) => !i || x === d[i - 1] + 1) || d.every((x, i) => !i || x === d[i - 1] - 1)) return 'รหัสผ่านห้ามเป็นเลขเรียงกัน (เช่น 1234 หรือ 4321)';
    return '';
  }
  // กด Enter แล้วเลื่อนไปช่องถัดไป · ช่องสุดท้าย: goId = id ปุ่มที่จะกด หรือ function ที่จะเรียก
  // (ช่องข้อความหลายบรรทัด เช่น สรรพคุณ ไม่อยู่ในลำดับนี้ เพราะ Enter ใช้ขึ้นบรรทัดใหม่)
  const enterChain = (ids, goId) => ids.forEach((id, i) => {
    const el = document.getElementById(id); if (!el) return;
    el.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || e.isComposing) return;
      e.preventDefault();
      let k = i + 1, nx = null;
      while (k < ids.length && !nx) { const c = document.getElementById(ids[k++]); if (c && c.offsetParent !== null && !c.disabled) nx = c; }
      if (nx) { nx.focus(); if (nx.select && nx.tagName === 'INPUT') nx.select(); }
      else if (typeof goId === 'function') goId();
      else if (goId) document.getElementById(goId).click();
    });
  });
  const focusEl = id => () => { const el = document.getElementById(id); if (el) el.focus(); };
  const onlyDigits = (el, max) => el.addEventListener('input', () => { el.value = el.value.replace(/\D/g, '').slice(0, max); });

  // ---------- UI shell ----------
  const css = `
  .dsm-fab{position:absolute;left:8px;top:8px;z-index:9000;background:#04B085;color:#fff;border:none;border-radius:999px;padding:12px 18px;font:700 .9rem inherit;font-family:inherit;box-shadow:0 4px 14px rgba(0,0,0,.25);cursor:pointer}
  .dsm-fab:hover{filter:brightness(.93)}
  .dsm-overlay{position:fixed;inset:0;background:rgba(10,25,50,.55);z-index:9500;display:none;align-items:center;justify-content:center;padding:12px}
  .dsm-overlay.open{display:flex}
  .dsm-modal{background:#fff;border-radius:14px;width:100%;max-width:560px;max-height:92vh;overflow:auto;padding:18px 20px 20px;box-shadow:0 10px 40px rgba(0,0,0,.35);font-family:inherit;color:#222}
  .dsm-modal h3{margin:0 0 12px;color:#16478E;font-size:1.05rem;display:flex;justify-content:space-between;align-items:center}
  .dsm-x{background:none;border:none;font-size:1.4rem;cursor:pointer;color:#777}
  .dsm-modal label{display:block;font-weight:600;font-size:.78rem;margin:10px 0 3px}
  .dsm-modal input,.dsm-modal select,.dsm-modal textarea{width:100%;padding:7px 9px;border:1px solid #ccc;border-radius:6px;font:inherit;font-size:.88rem;box-sizing:border-box}
  .dsm-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
  .dsm-grid4 label{margin-top:0;font-size:.72rem;text-align:center}
  .dsm-btn{margin-top:14px;width:100%;padding:10px;border:none;border-radius:8px;background:#16478E;color:#fff;font:700 .92rem inherit;cursor:pointer}
  .dsm-btn.sec{background:#fff;color:#16478E;border:2px solid #16478E}
  .dsm-btn:disabled{opacity:.55;cursor:wait}
  .dsm-msg{margin-top:10px;padding:9px 11px;border-radius:8px;font-size:.85rem;line-height:1.4}
  .dsm-msg.err{background:#fdecea;color:#b3261e}.dsm-msg.ok{background:#e6f6ee;color:#1a7a3a}.dsm-msg.warn{background:#fff6dd;color:#7a5b00}
  .dsm-hint{font-size:.72rem;color:#666;font-weight:400}
  .dsm-link{background:none;border:none;color:#16478E;text-decoration:underline;cursor:pointer;font:inherit;font-size:.82rem;padding:0;margin-top:10px}
  .dsm-who{font-size:.78rem;color:#555;margin-bottom:6px}
  .dsm-ask{display:flex;align-items:center;gap:10px;width:100%;margin:0 0 6px;padding:10px 12px;border:2px dashed #7aa2d6;border-radius:10px;background:#f3f7fd;color:#16478E;font:600 .86rem inherit;cursor:pointer;text-align:left}
  .dsm-ask small{display:block;font-weight:400;color:#555}
  .dsm-pre{display:flex;align-items:center;gap:6px}.dsm-pre span{font-weight:700;color:#16478E;white-space:nowrap}
  .dsm-grid2{display:grid;grid-template-columns:1fr 1fr;gap:8px}.dsm-grid2 label{margin-top:6px}
  .dsm-period{font-size:.8rem;color:#1a7a3a;margin-top:4px;min-height:1em}
  #dsm_generic{text-transform:uppercase}
  .dsm-modal textarea{display:block;line-height:1.4;resize:vertical}
  .dsm-gw{position:relative;background:#fff;border-radius:6px}
  .dsm-gw textarea{position:relative;z-index:1;background:transparent !important}
  .dsm-gov{position:absolute;inset:0;padding:7px 9px;border:1px solid transparent;border-radius:6px;font:inherit;font-size:.88rem;line-height:1.4;color:transparent;white-space:pre-wrap;word-wrap:break-word;overflow:hidden;box-sizing:border-box;pointer-events:none;z-index:0}
  .dsm-gov .gs{color:#b0b0b0}
  .dsm-pop{position:absolute;left:0;right:0;top:100%;z-index:30;background:#fff;border:1px solid #ccc;border-radius:6px;max-height:190px;overflow:auto;box-shadow:0 6px 16px rgba(0,0,0,.18);display:none}
  .dsm-pop div{padding:8px 10px;font-size:.84rem;cursor:pointer;border-bottom:1px solid #f0f0f0;line-height:1.35}
  .dsm-pop div:hover{background:#eaf4fc}
  .dsm-chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
  .dsm-chip{background:#fff;border:1px solid #2c81ba;color:#16478E;border-radius:14px;padding:4px 11px;font:inherit;font-size:.78rem;cursor:pointer;white-space:nowrap}
  .dsm-chip:hover{background:#eaf4fc}.dsm-chip:active{background:#16478E;color:#fff}
  .dsm-chip.clr{border-color:#b3261e;color:#b3261e}
  .dsm-modal input.dsm-cur{border-color:#04B085;box-shadow:0 0 0 2px rgba(4,176,133,.22)}
  .dsm-card2{margin-top:14px;border:1px solid #d6e2f0;border-radius:10px;padding:4px 12px 12px;background:#f8fbfe}
  .dsm-card2-title{font-weight:700;color:#16478E;font-size:.9rem;margin:10px 0 2px;display:flex;align-items:center;gap:7px}
  .dsm-num{background:#16478E;color:#fff;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;font-size:.75rem}
  .dsm-row2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  .dsm-chip.freq{border-color:#04B085;color:#04806a}
  .dsm-chip.freq:hover{background:#e6f6f1}.dsm-chip.freq:active{background:#04B085;color:#fff}
  .dsm-item{border:1px solid #e3e9f1;border-radius:8px;padding:8px 10px;margin-top:6px;background:#fff}
  .dsm-pill{font-size:.7rem;padding:2px 8px;border-radius:999px;font-weight:700;white-space:nowrap}
  .dsm-pill.w{background:#fff3cd;color:#7a5b00}.dsm-pill.ok{background:#d9f3e6;color:#1a7a3a}.dsm-pill.no{background:#fde0de;color:#b3261e}.dsm-pill.dn{background:#e3e8ef;color:#445}
  .dsm-note{margin-top:5px;background:#f1f6fd;border-left:3px solid #16478E;padding:5px 8px;font-size:.8rem;white-space:pre-wrap}
  .dsm-edgrid label{margin-top:8px}.dsm-chg{border-color:#04B085 !important;background:#f0fbf7 !important}
  .dsm-camrow{display:flex;gap:6px}.dsm-camrow input{flex:1 1 auto;min-width:0}
  .dsm-cam{flex:0 0 auto;width:42px;border:1px solid #16478E;background:#eef3fa;color:#16478E;border-radius:6px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}
  .dsm-cam:hover{background:#dde8f6}
  @media print{.dsm-fab,.dsm-overlay,.no-print{display:none !important}}`;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  const fab = document.createElement('button');
  fab.className = 'dsm-fab'; fab.type = 'button'; fab.textContent = '➕ เพิ่มข้อมูลยาใหม่';
  const overlay = document.createElement('div');
  overlay.className = 'dsm-overlay';
  overlay.innerHTML = '<div class="dsm-modal" role="dialog" aria-modal="true"><div id="dsm_body"></div></div>';
  document.body.appendChild(overlay);
  // วางปุ่มไว้ในแถบหัวเว็บ (ส่วน no-print ที่ไม่ถูกพิมพ์) แทนการลอยบนหน้าจอ

  const body = () => $('#dsm_body', overlay);

  // ซ่อนปุ่ม/หน้าต่างด้วย JS ตอนสั่งพิมพ์ (กันกรณี CSS ไม่ทำงาน)
  const hideForPrint = () => { fab.style.display = 'none'; overlay.style.display = 'none'; };
  const showAfterPrint = () => { fab.style.display = ''; overlay.style.display = ''; };
  window.addEventListener('beforeprint', hideForPrint);
  window.addEventListener('afterprint', showAfterPrint);
  try { window.matchMedia('print').addEventListener('change', e => e.matches ? hideForPrint() : showAfterPrint()); } catch (e) {}

  let pendingCode = '';      // บาร์โค้ด/Item No. ที่ค้นไม่พบจากหน้าหลัก -> เติมให้ในฟอร์มเพิ่มยาใหม่
  let afterLogin = null;     // หน้าที่จะเปิดต่อหลังเข้าสู่ระบบสำเร็จ (เช่น ฟอร์ม feedback)
  const open = (code) => {
    pendingCode = (typeof code === 'string') ? code.replace(/\D/g, '') : '';
    afterLogin = null; overlay.classList.add('open'); session ? viewForm() : viewLogin();
  };
  const openFeedback = () => { afterLogin = viewFeedback; overlay.classList.add('open'); session ? viewFeedback() : viewLogin(); };
  const openMine = () => { afterLogin = viewMine; overlay.classList.add('open'); session ? viewMine() : viewLogin(); };
  const close = () => overlay.classList.remove('open');
  fab.addEventListener('click', open);
  // พิมพ์ผ่านคอม: ขอให้เข้าสู่ระบบก่อน → คืนค่า true เมื่อเข้าสู่ระบบสำเร็จ / false ถ้าปิดหน้าต่างไปก่อน
  const requireLogin = (note) => new Promise(resolve => {
    if (session) return resolve(true);
    let done = false;
    const mo = new MutationObserver(() => { if (!overlay.classList.contains('open')) finish(!!session); });
    const finish = v => { if (done) return; done = true; mo.disconnect(); resolve(v); };
    afterLogin = () => { finish(true); close(); };
    overlay.classList.add('open');
    viewLogin(note ? msg('warn', note) : '');
    mo.observe(overlay, { attributes: true, attributeFilter: ['class'] });
  });
  window.PharmaxDrugSubmit = { open: open, openFeedback: openFeedback, openMine: openMine, requireLogin: requireLogin, webAppUrl: WEB_APP_URL,
    token: () => (session && session.token) || '', user: () => session ? { empId: session.empId, name: session.name } : null, refreshMine: () => refreshPrivate() };

  // ---------- v1.38: ยาที่ฉันส่งและยังรออนุมัติ → ใช้พิมพ์ฉลากได้ทันทีเฉพาะบัญชีนี้ (ต้องล็อกอิน) ----------
  function updateUserChip() {
    const b = document.getElementById('hdr_user_btn'); if (!b) return;
    let n = 0; try { n = PharmaxSheet.privateCount(); } catch (e) {}
    b.classList.remove('rph-m', 'rph-f');
    if (session) {
      b.classList.add('in');
      const nm = String(session.name || '').trim();
      if (/^ภญ/.test(nm)) b.classList.add('rph-f'); else if (/^ภก/.test(nm)) b.classList.add('rph-m');   // v1.38: ภก. = ฟ้า · ภญ. = ชมพู
      b.innerHTML = '👤 ' + esc(nm || session.empId) + (session.license ? ' (ภ.' + esc(session.license) + ')' : '') + (n ? ' <span class="pv" title="ยาที่ส่งแล้วยังรออนุมัติ — ใช้พิมพ์ได้เฉพาะบัญชีนี้">🔒 ' + n + '</span>' : '');
      b.title = 'บัญชี ' + session.empId + ' · กดเพื่อดูรายการของฉัน / ออกจากระบบ' + (n ? ' · มียารออนุมัติ ' + n + ' รายการ (ใช้พิมพ์ได้เฉพาะบัญชีนี้)' : '');
    } else { b.classList.remove('in'); b.textContent = '👤 เข้าสู่ระบบ'; b.title = 'เข้าสู่ระบบเพื่อเพิ่มยา / ใช้ยาที่ส่งแล้วระหว่างรออนุมัติ'; }
  }
  let _privBusy = false;
  // v1.38: แจ้งผู้ส่งเมื่อแอดมินพิจารณายา/คำขอแก้ไขแล้ว (จำว่าแจ้งอะไรไปแล้วต่อบัญชี · ครั้งแรกไม่แจ้งย้อนหลัง)
  function notifyDecided(list) {
    if (!session || !Array.isArray(list)) return;
    const KEY = 'pharmax_decided_seen_' + session.empId;
    let seen = null; try { seen = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
    const first = !Array.isArray(seen); seen = first ? [] : seen;
    const fresh = list.filter(x => x && x.k && seen.indexOf(x.k) < 0);
    if (!fresh.length && !first) return;
    try { localStorage.setItem(KEY, JSON.stringify(seen.concat(fresh.map(x => x.k)).slice(-200))); } catch (e) {}
    if (first || typeof window.pxNotice !== 'function') return;
    fresh.slice(-4).forEach(x => {
      if (x.type === 'feedback') {   // แอดมินตอบความคิดเห็น
        window.pxNotice({ kind: 'info', ms: 0, title: '💬 แอดมินตอบความคิดเห็นของคุณ',
          html: '<b>' + esc(x.title) + '</b>' + (x.comment ? '<br><span style="color:#5b6777">คุณเขียน: ' + esc(x.comment) + '</span>' : '') +
            '<div style="margin-top:6px;white-space:pre-wrap">' + esc(x.note) + '</div>',
          actions: [{ label: 'ดูรายการของฉัน', sec: true, onClick: () => { try { openMine(); } catch (e) {} } }] });
        return;
      }
      const ok = /อนุมัติแล้ว|ดำเนินการแล้ว/.test(x.status) && !/ไม่/.test(x.status);
      window.pxNotice({
        kind: ok ? 'ok' : 'err', ms: ok ? 12000 : 0,
        title: (x.type === 'drug' ? (ok ? '✅ ยาที่คุณส่งได้รับอนุมัติแล้ว' : '❌ ยาที่คุณส่งไม่ได้รับอนุมัติ') : (ok ? '✅ คำขอแก้ไขดำเนินการแล้ว' : '❌ คำขอแก้ไขไม่ได้รับอนุมัติ')),
        html: esc(x.title) + (x.note ? '<br><span style="color:#5b6777">หมายเหตุแอดมิน: ' + esc(x.note) + '</span>' : '') +
          (ok && x.type === 'drug' ? '<br><span style="color:#5b6777">ทุกสาขาใช้บาร์โค้ดนี้ได้แล้ว (หน้าเว็บอัปเดตรายการยาอัตโนมัติภายในไม่กี่นาที)</span>' : ''),
        actions: [{ label: 'ดูรายการของฉัน', sec: true, onClick: () => { try { openMine(); } catch (e) {} } }]
      });
    });
    if (fresh.some(x => x.type === 'drug' && /อนุมัติแล้ว/.test(x.status))) { setTimeout(() => { try { PharmaxSheet.sync(); } catch (e) {} }, 20000); }
  }
  async function refreshPrivate() {
    const setP = list => { try { PharmaxSheet.setPrivate(list); } catch (e) {} updateUserChip(); };
    if (!session) return setP([]);
    if (_privBusy) return; _privBusy = true;
    const r = await api(Object.assign({ action: 'myDrugs' }, auth()));
    _privBusy = false;
    if (r && r.ok) {
      if (r.me && session && (r.me.license !== session.license || (r.me.name && r.me.name !== session.name))) {
        session.license = r.me.license || ''; if (r.me.name) session.name = r.me.name;
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      }
      setP(r.drugs || []);
      notifyDecided(r.decided || []);
    }
    else if (r && ['invalid', 'pending', 'rejected', 'locked', 'expired'].indexOf(r.error) >= 0) { session = null; sessionStorage.removeItem(SESSION_KEY); setP([]); }
    else updateUserChip();
  }
  const _bootPriv = () => { updateUserChip(); if (session) refreshPrivate(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(_bootPriv, 300)); else setTimeout(_bootPriv, 300);
  setInterval(() => { if (session && !document.hidden) refreshPrivate(); }, 5 * 60 * 1000);   // อนุมัติแล้ว → ยาย้ายไปอยู่ใน drugTH (หายจากรายการส่วนตัว)
  overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
  const head = t => '<h3><span>' + t + '</span><button class="dsm-x" type="button" data-close>×</button></h3>';
  overlay.addEventListener('click', e => { if (e.target.hasAttribute('data-close')) close(); });
  const msg = (cls, text) => '<div class="dsm-msg ' + cls + '">' + text + '</div>';
  const setMsg = (cls, text) => { $('#dsm_m').innerHTML = text ? msg(cls, text) : ''; };

  // ---------- views ----------
  function viewLogin(note) {
    body().innerHTML = head('🔐 เข้าสู่ระบบ') +
      '<label>รหัสพนักงาน (9 หลัก) <span class="dsm-hint">· นักศึกษาฝึกงาน ใช้เบอร์มือถือ 10 หลัก</span></label><input id="dsm_emp" inputmode="numeric" autocomplete="off" placeholder="000000000">' +
      '<label>รหัสผ่าน (ตัวเลข 4 หลัก)</label><input id="dsm_pin" type="password" inputmode="numeric" autocomplete="off" placeholder="••••">' +
      '<div id="dsm_m">' + (note || '') + '</div>' +
      '<button class="dsm-btn" id="dsm_go" type="button">เข้าสู่ระบบ</button>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">' +
        '<button class="dsm-link" id="dsm_forgot" type="button">ลืมรหัสผ่าน?</button>' +
        '<button class="dsm-link" id="dsm_reg" type="button">ยังไม่มีบัญชี? สมัครใช้งาน</button>' +
      '</div>';
    onlyDigits($('#dsm_emp'), 10); onlyDigits($('#dsm_pin'), 4);
    $('#dsm_reg').onclick = viewRegister;
    $('#dsm_forgot').onclick = viewReset;
    enterChain(['dsm_emp', 'dsm_pin'], 'dsm_go');
    $('#dsm_go').onclick = async () => {
      const empId = $('#dsm_emp').value, pin = $('#dsm_pin').value;
      if (!/^(\d{9}|0\d{9})$/.test(empId)) return setMsg('err', 'รหัสพนักงานต้องเป็นตัวเลข 9 หลัก (นักศึกษาฝึกงาน: เบอร์มือถือ 10 หลัก ขึ้นต้นด้วย 0)');
      if (!/^\d{4}$/.test(pin)) return setMsg('err', 'รหัสผ่านต้องเป็นตัวเลข 4 หลัก');
      const b = $('#dsm_go'); b.disabled = true; b.textContent = 'กำลังตรวจสอบ…';
      const r = await api({ action: 'login', empId, pin });
      b.disabled = false; b.textContent = 'เข้าสู่ระบบ';
      if (!r.ok) return setMsg(r.error === 'pending' || r.error === 'reset_pending' ? 'warn' : 'err', r.message || 'เข้าสู่ระบบไม่สำเร็จ');
      if (!r.token) return setMsg('err', 'เซิร์ฟเวอร์ยังเป็นเวอร์ชันเก่า กรุณาแจ้งแอดมินให้ Deploy Code.gs ใหม่');
      session = { empId: r.empId, token: r.token, name: r.name, license: r.license || '' };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      refreshPrivate();
      const nx = afterLogin; afterLogin = null;
      (nx || viewForm)();
    };
  }

  // ลืมรหัสผ่าน: ตั้งรหัสใหม่ส่งให้แอดมินอนุมัติ (ยืนยันตัวตนด้วยรหัสพนักงาน + เลขที่ใบอนุญาตที่สมัครไว้)
  function viewReset() {
    body().innerHTML = head('🔑 ลืมรหัสผ่าน') +
      '<div class="dsm-hint" style="margin-bottom:6px">ตั้งรหัสผ่านใหม่แล้วส่งให้แอดมินอนุมัติ — เมื่อแอดมินอนุมัติแล้วจึงเข้าระบบด้วยรหัสใหม่ได้ (ระหว่างรอ ยังใช้รหัสเดิมได้ถ้าจำได้)</div>' +
      '<label>รหัสพนักงาน (9 หลัก) <span class="dsm-hint">· นักศึกษาฝึกงาน ใช้เบอร์มือถือ 10 หลัก</span></label><input id="dsm_emp" inputmode="numeric" autocomplete="off">' +
      '<div id="dsm_lic_box"><label>เลขที่ใบอนุญาตประกอบวิชาชีพเภสัชกรรม (5 หลัก) ที่ใช้สมัคร</label><input id="dsm_lic" inputmode="numeric" autocomplete="off" placeholder="เฉพาะตัวเลข"></div>' +
      '<div id="dsm_uni_box" style="display:none"><label>มหาวิทยาลัยที่ใช้สมัคร (นักศึกษาฝึกงาน)</label><input id="dsm_uni" autocomplete="off" list="dsm_uni_list" placeholder="เช่น มหาวิทยาลัยมหิดล">' + uniDatalist() + '</div>' +
      '<label>ตั้งรหัสผ่านใหม่ (ตัวเลข 4 หลัก ไม่เรียงกัน) <span class="dsm-hint">เช่น 2580, 1379 — ห้าม 1234 / 4321 / 1111</span></label><input id="dsm_pin" type="password" inputmode="numeric" autocomplete="off">' +
      '<label>ยืนยันรหัสผ่านใหม่อีกครั้ง</label><input id="dsm_pin2" type="password" inputmode="numeric" autocomplete="off">' +
      '<div id="dsm_m"></div>' +
      '<button class="dsm-btn" id="dsm_go" type="button">ส่งคำขอเปลี่ยนรหัสผ่าน</button>' +
      '<button class="dsm-link" id="dsm_back" type="button">← กลับไปเข้าสู่ระบบ</button>';
    onlyDigits($('#dsm_emp'), 10); onlyDigits($('#dsm_lic'), 5); onlyDigits($('#dsm_pin'), 4); onlyDigits($('#dsm_pin2'), 4);
    const isIntern = () => /^0\d{9}$/.test($('#dsm_emp').value);
    $('#dsm_emp').addEventListener('input', () => {   // พิมพ์เบอร์มือถือ 10 หลัก → เปลี่ยนช่องยืนยันเป็น "มหาวิทยาลัย"
      $('#dsm_lic_box').style.display = isIntern() ? 'none' : ''; $('#dsm_uni_box').style.display = isIntern() ? '' : 'none';
    });
    $('#dsm_back').onclick = () => viewLogin();
    enterChain(['dsm_emp', 'dsm_lic', 'dsm_pin', 'dsm_pin2'], 'dsm_go');
    $('#dsm_go').onclick = async () => {
      const empId = $('#dsm_emp').value, licenseNo = $('#dsm_lic').value, pin = $('#dsm_pin').value, university = $('#dsm_uni').value.trim();
      if (!/^(\d{9}|0\d{9})$/.test(empId)) return setMsg('err', 'รหัสพนักงานต้องเป็นตัวเลข 9 หลัก (นักศึกษาฝึกงาน: เบอร์มือถือ 10 หลัก)');
      if (!isIntern() && !/^\d{5}$/.test(licenseNo)) return setMsg('err', 'เลขที่ใบอนุญาตต้องเป็นตัวเลข 5 หลัก');
      if (isIntern() && university.length < 3) return setMsg('err', 'กรุณากรอกชื่อมหาวิทยาลัยที่ใช้สมัคร');
      const pe = pinError(pin); if (pe) return setMsg('err', pe);
      if (pin !== $('#dsm_pin2').value) return setMsg('err', 'รหัสผ่านทั้งสองช่องไม่ตรงกัน');
      const b = $('#dsm_go'); b.disabled = true; b.textContent = 'กำลังส่ง…';
      const r = await api({ action: 'requestReset', empId, licenseNo, university, pin });
      b.disabled = false; b.textContent = 'ส่งคำขอเปลี่ยนรหัสผ่าน';
      if (!r.ok) return setMsg('err', r.message || 'ส่งคำขอไม่สำเร็จ');
      body().innerHTML = head('✅ ส่งคำขอแล้ว') +
        msg('ok', 'ส่งคำขอเปลี่ยนรหัสผ่านให้แอดมินแล้ว<br>เมื่อแอดมินอนุมัติ จะเข้าระบบด้วย <b>รหัสใหม่</b> ได้ทันที (ถ้ายังไม่อนุมัติ กรุณารอหรือแจ้งแอดมิน)') +
        '<button class="dsm-btn" data-close type="button">ตกลง</button>';
    };
  }

  function viewRegister() {
    body().innerHTML = head('📝 สมัครใช้งาน') +
      '<button class="dsm-ask" id="dsm_intern" type="button"><span style="font-size:1.6rem">🎓</span><span>เป็นนักศึกษา/นิสิต ฝึกงานใช่ไหม?<small>ไม่มีรหัสพนักงานและเลขที่ใบอนุญาต → กดที่นี่เพื่อสมัครแบบนักศึกษาฝึกงาน</small></span></button>' +
      '<label>รหัสพนักงาน (9 หลัก)</label><input id="dsm_emp" inputmode="numeric" autocomplete="off">' +
      '<label>เลขที่ใบอนุญาตประกอบวิชาชีพเภสัชกรรม (5 หลัก)</label><input id="dsm_lic" inputmode="numeric" autocomplete="off" placeholder="เฉพาะตัวเลข">' +
      '<label>ตั้งรหัสผ่าน (ตัวเลข 4 หลัก ไม่เรียงกัน) <span class="dsm-hint">เช่น 2580, 1379 — ห้าม 1234 / 4321 / 1111</span></label><input id="dsm_pin" type="password" inputmode="numeric" autocomplete="off">' +
      '<label>ยืนยันรหัสผ่านอีกครั้ง</label><input id="dsm_pin2" type="password" inputmode="numeric" autocomplete="off">' +
      '<div id="dsm_m"></div>' +
      '<button class="dsm-btn" id="dsm_go" type="button">ส่งคำขอสมัคร</button>' +
      '<button class="dsm-link" id="dsm_back" type="button">← กลับไปเข้าสู่ระบบ</button>';
    onlyDigits($('#dsm_emp'), 9); onlyDigits($('#dsm_lic'), 5); onlyDigits($('#dsm_pin'), 4); onlyDigits($('#dsm_pin2'), 4);
    $('#dsm_back').onclick = () => viewLogin();
    $('#dsm_intern').onclick = viewRegisterIntern;
    enterChain(['dsm_emp', 'dsm_lic', 'dsm_pin', 'dsm_pin2'], 'dsm_go');
    $('#dsm_go').onclick = async () => {
      const empId = $('#dsm_emp').value, pin = $('#dsm_pin').value;
      if (!/^\d{9}$/.test(empId)) return setMsg('err', 'รหัสพนักงานต้องเป็นตัวเลข 9 หลัก');
      const licenseNo = $('#dsm_lic').value;
      if (!/^\d{5}$/.test(licenseNo)) return setMsg('err', 'เลขที่ใบอนุญาตต้องเป็นตัวเลข 5 หลัก');
      const pe = pinError(pin); if (pe) return setMsg('err', pe);
      if (pin !== $('#dsm_pin2').value) return setMsg('err', 'รหัสผ่านทั้งสองช่องไม่ตรงกัน');
      const b = $('#dsm_go'); b.disabled = true; b.textContent = 'กำลังส่ง…';
      const r = await api({ action: 'register', empId, pin, licenseNo });
      b.disabled = false; b.textContent = 'ส่งคำขอสมัคร';
      if (!r.ok) return setMsg('err', r.message || 'สมัครไม่สำเร็จ');
      body().innerHTML = head('✅ ส่งคำขอสมัครแล้ว') +
        msg('ok', (r.pharmacistName ? 'พบข้อมูลในทะเบียนสภาเภสัชกรรม: <b>' + esc(r.pharmacistName) + '</b><br>' : '') + 'กรุณารอแอดมินตรวจสอบข้อมูล แล้วกลับมาเข้าสู่ระบบภายหลัง') +
        '<button class="dsm-btn" data-close type="button">ตกลง</button>';
    };
  }

  // ---------- นักศึกษาฝึกงาน: สมัครด้วยเบอร์มือถือ · ใช้ได้เฉพาะช่วงวันฝึก ----------
  const UNIS = ['จุฬาลงกรณ์มหาวิทยาลัย', 'มหาวิทยาลัยมหิดล', 'มหาวิทยาลัยเชียงใหม่', 'มหาวิทยาลัยขอนแก่น', 'มหาวิทยาลัยสงขลานครินทร์',
    'มหาวิทยาลัยศิลปากร', 'มหาวิทยาลัยนเรศวร', 'มหาวิทยาลัยมหาสารคาม', 'มหาวิทยาลัยอุบลราชธานี', 'มหาวิทยาลัยศรีนครินทรวิโรฒ',
    'มหาวิทยาลัยธรรมศาสตร์', 'มหาวิทยาลัยวลัยลักษณ์', 'มหาวิทยาลัยพะเยา', 'มหาวิทยาลัยบูรพา', 'มหาวิทยาลัยแม่ฟ้าหลวง',
    'มหาวิทยาลัยรังสิต', 'มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ', 'มหาวิทยาลัยสยาม', 'มหาวิทยาลัยพายัพ', 'มหาวิทยาลัยอีสเทิร์นเอเชีย'];
  function branchInfo(code) {   // ข้อมูลสาขาจากหน้าเว็บ (BranchDirectory ของ index.html)
    code = String(code || '').trim().toUpperCase();
    try { const b = code && BranchDirectory.findRow(code); if (b) return { code: b.branchCode, name: b.branchName || '' }; } catch (e) {}
    return { code: code, name: '' };
  }
  function branchDatalist() {
    let rows = []; try { rows = BranchDirectory.all || []; } catch (e) {}
    return '<datalist id="dsm_branch_list">' + rows.filter(b => b.branchCode).map(b => '<option value="' + esc(b.branchCode) + '">' + esc(b.branchName || '') + '</option>').join('') + '</datalist>';
  }
  function uniDatalist() { return '<datalist id="dsm_uni_list">' + UNIS.map(u => '<option value="' + esc(u) + '"></option>').join('') + '</datalist>'; }
  const thDate = ymd => { try { return new Date(ymd + 'T00:00:00').toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return ymd; } };
  function viewRegisterIntern() {
    const beYear = new Date().getFullYear() + 543;
    body().innerHTML = head('🎓 สมัครใช้งาน — นักศึกษาฝึกงาน') +
      '<div class="dsm-hint">บัญชีจะใช้งานได้เฉพาะช่วงวันที่ฝึกงานเท่านั้น (เพื่อความปลอดภัย) · ต้องรอแอดมินอนุมัติก่อนใช้งาน</div>' +
      '<label>ชื่อ-สกุล</label><div class="dsm-pre"><span>นศภ.</span><input id="dsm_name" autocomplete="off" placeholder="ชื่อ นามสกุล"></div>' +
      '<label>มหาวิทยาลัย</label><input id="dsm_uni" autocomplete="off" list="dsm_uni_list" placeholder="เช่น มหาวิทยาลัยมหิดล">' + uniDatalist() +
      '<label>สาขาที่ฝึกงาน <span class="dsm-hint">ระบบเลือกให้จากสาขาที่เปิดหน้าเว็บอยู่ — ถ้าไม่ถูกต้องแก้ได้</span></label>' +
      '<div class="dsm-grid2" style="grid-template-columns:1fr 2fr"><input id="dsm_bcode" autocomplete="off" list="dsm_branch_list" placeholder="รหัสสาขา เช่น PM017" style="text-transform:uppercase">' +
      '<input id="dsm_bname" autocomplete="off" placeholder="ชื่อสาขา"></div>' + branchDatalist() +
      '<div class="dsm-grid2"><div><label>ปีการศึกษา (พ.ศ.)</label><input id="dsm_year" inputmode="numeric" autocomplete="off" value="' + beYear + '"></div>' +
      '<div><label>ผลัดที่</label><input id="dsm_round" inputmode="numeric" autocomplete="off" placeholder="เช่น 1, 2, 3"></div></div>' +
      '<div class="dsm-grid2"><div><label>วันที่เริ่มฝึก</label><input id="dsm_start" type="date"></div>' +
      '<div><label>วันที่ฝึกจบ</label><input id="dsm_end" type="date"></div></div>' +
      '<div class="dsm-period" id="dsm_period"></div>' +
      '<label>เบอร์มือถือ (10 หลัก) <span class="dsm-hint">ใช้แทนรหัสพนักงานตอนเข้าสู่ระบบ</span></label><input id="dsm_emp" inputmode="numeric" autocomplete="off" placeholder="08xxxxxxxx">' +
      '<label>ตั้งรหัสผ่าน (ตัวเลข 4 หลัก ไม่เรียงกัน) <span class="dsm-hint">เช่น 2580, 1379 — ห้าม 1234 / 4321 / 1111</span></label><input id="dsm_pin" type="password" inputmode="numeric" autocomplete="off">' +
      '<label>ยืนยันรหัสผ่านอีกครั้ง</label><input id="dsm_pin2" type="password" inputmode="numeric" autocomplete="off">' +
      '<div id="dsm_m"></div>' +
      '<button class="dsm-btn" id="dsm_go" type="button">ส่งคำขอสมัคร</button>' +
      '<button class="dsm-link" id="dsm_back" type="button">← กลับไปหน้าสมัครของเภสัชกร</button>';
    // เติมสาขาให้จากหน้าเว็บที่เปิดอยู่ · พิมพ์/เลือกรหัสใหม่ → เติมชื่อสาขาให้
    const cur = branchInfo(typeof currentBranch !== 'undefined' ? currentBranch : '');
    let autoName = '';   // ชื่อสาขาที่ระบบเติมให้ (ถ้าเปลี่ยนรหัสเป็นสาขาที่ไม่รู้จัก → ล้างชื่อเดิมออก ไม่ให้ค้างผิดสาขา)
    if (cur.code) { $('#dsm_bcode').value = cur.code; $('#dsm_bname').value = autoName = cur.name; }
    $('#dsm_bcode').addEventListener('input', () => {
      const v = $('#dsm_bcode').value.trim().toUpperCase().split(/[\s·]/)[0];
      const b = branchInfo(v);
      if (b.name) { $('#dsm_bcode').value = b.code; $('#dsm_bname').value = autoName = b.name; }
      else if (autoName && $('#dsm_bname').value === autoName) { $('#dsm_bname').value = autoName = ''; }
    });
    onlyDigits($('#dsm_year'), 4); onlyDigits($('#dsm_round'), 2); onlyDigits($('#dsm_emp'), 10); onlyDigits($('#dsm_pin'), 4); onlyDigits($('#dsm_pin2'), 4);
    $('#dsm_back').onclick = viewRegister;
    const period = () => {
      const a = $('#dsm_start').value, b = $('#dsm_end').value, el = $('#dsm_period');
      if (a && !b) {   // ยังไม่ได้เลือกวันจบ → เติมให้ก่อน 40 วัน (ประมาณ 1.5 เดือน แก้ได้)
        const d = new Date(a + 'T00:00:00'); d.setDate(d.getDate() + 39);
        $('#dsm_end').value = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
      }
      const s = $('#dsm_start').value, e = $('#dsm_end').value;
      if (!s || !e) { el.textContent = ''; return; }
      const days = Math.round((new Date(e + 'T00:00:00') - new Date(s + 'T00:00:00')) / 86400000) + 1;
      el.style.color = days < 1 ? '#b3261e' : '#1a7a3a';
      el.textContent = days < 1 ? '⚠ วันที่ฝึกจบต้องไม่ก่อนวันที่เริ่มฝึก' : '📅 ' + thDate(s) + ' – ' + thDate(e) + ' (' + days + ' วัน)';
    };
    $('#dsm_start').addEventListener('change', period); $('#dsm_end').addEventListener('change', period);
    enterChain(['dsm_name', 'dsm_uni', 'dsm_bcode', 'dsm_bname', 'dsm_year', 'dsm_round', 'dsm_start', 'dsm_end', 'dsm_emp', 'dsm_pin', 'dsm_pin2'], 'dsm_go');
    $('#dsm_go').onclick = async () => {
      const name = $('#dsm_name').value.replace(/\s+/g, ' ').trim().replace(/^นศภ\.?\s*/, '');
      const university = $('#dsm_uni').value.trim(), year = $('#dsm_year').value, round = $('#dsm_round').value;
      const start = $('#dsm_start').value, end = $('#dsm_end').value, empId = $('#dsm_emp').value, pin = $('#dsm_pin').value;
      if (name.split(' ').length < 2) return setMsg('err', 'กรุณากรอกชื่อและนามสกุล (เว้นวรรคระหว่างชื่อกับนามสกุล)');
      if (university.length < 3) return setMsg('err', 'กรุณากรอกชื่อมหาวิทยาลัย');
      const branchCode = $('#dsm_bcode').value.replace(/\s+/g, '').toUpperCase(), branchName = $('#dsm_bname').value.trim();
      if (!branchCode) return setMsg('err', 'กรุณากรอกรหัสสาขาที่ฝึกงาน');
      if (!branchName) return setMsg('err', 'กรุณากรอกชื่อสาขาที่ฝึกงาน');
      if (!/^25\d{2}$/.test(year)) return setMsg('err', 'ปีการศึกษาต้องเป็นปี พ.ศ. 4 หลัก เช่น ' + beYear);
      if (!/^\d{1,2}$/.test(round) || +round < 1) return setMsg('err', 'กรุณากรอกผลัดที่ เป็นตัวเลข เช่น 1, 2, 3');
      if (!start || !end) return setMsg('err', 'กรุณาเลือกวันที่เริ่มฝึกและวันที่ฝึกจบ');
      if (end < start) return setMsg('err', 'วันที่ฝึกจบต้องไม่ก่อนวันที่เริ่มฝึก');
      if (!/^0\d{9}$/.test(empId)) return setMsg('err', 'เบอร์มือถือต้องเป็นตัวเลข 10 หลัก ขึ้นต้นด้วย 0');
      const pe = pinError(pin); if (pe) return setMsg('err', pe);
      if (pin !== $('#dsm_pin2').value) return setMsg('err', 'รหัสผ่านทั้งสองช่องไม่ตรงกัน');
      const b = $('#dsm_go'); b.disabled = true; b.textContent = 'กำลังส่ง…';
      const r = await api({ action: 'register', kind: 'intern', name, university, branchCode, branchName, year, round, start, end, empId, pin });
      b.disabled = false; b.textContent = 'ส่งคำขอสมัคร';
      if (!r.ok) return setMsg('err', r.message || 'สมัครไม่สำเร็จ');
      body().innerHTML = head('✅ ส่งคำขอสมัครแล้ว') +
        msg('ok', '<b>' + esc(r.name || ('นศภ. ' + name)) + '</b> · ฝึกที่ ' + esc(branchCode + ' ' + branchName) + '<br>รอแอดมินอนุมัติ แล้วเข้าสู่ระบบด้วย<br>• เบอร์มือถือ <b>' + esc(empId) + '</b> + รหัสผ่านที่ตั้งไว้<br>' +
          '• ใช้งานได้ ' + esc(thDate(start)) + ' – ' + esc(thDate(end)) + ' เท่านั้น') +
        '<button class="dsm-btn" data-close type="button">ตกลง</button>';
    };
    setTimeout(() => { try { $('#dsm_name').focus(); } catch (e) {} }, 50);
  }

  // v1.36: ตัวเลือกมาจากคำศัพท์มาตรฐานใน data.js (ข้อความไทย = ค่าที่บันทึกลง drugTH และตรงกับ medical_glossary)
  function typeOptions() {
    try {
      return DRUG_TYPE_GROUPS.map(g => '<optgroup label="' + esc(g.label) + '">' +
        g.options.map(o => '<option value="' + esc(o.th) + '">' + esc(o.label) + '</option>').join('') + '</optgroup>').join('');
    } catch (e) { return '<option value="ยาเม็ด">ยาเม็ด</option>'; }
  }
  function mealOptions() {
    try { return MEAL_OPTIONS.map(o => '<option value="' + esc(o.th || '') + '">' + esc(o.label) + '</option>').join(''); }
    catch (e) { return '<option value="">-- ไม่ระบุ --</option>'; }
  }
  // ข้อความในชีท (รวมชื่อเก่า/ชื่ออื่น) → ชื่อมาตรฐาน · ไม่รู้จัก → คืนค่าเดิม
  function canonTerm(kind, text) {
    const t = String(text == null ? '' : text).trim();
    try { const o = termOptionOf(kind, termKeyOf(kind, t)); if (o) return o.th; } catch (e) {}
    return t;
  }
  function doseDatalist() {
    try { return '<datalist id="dsm_dose_list">' + DOSE_OPTIONS.map(v => '<option value="' + esc(v) + '"></option>').join('') + '</datalist>'; }
    catch (e) { return ''; }
  }


  // ---------- ghost text + dropdown (ใช้ข้อมูลชุดเดียวกับหน้าแรก: indicationsDB / advicesDB + สรรพคุณ/คำแนะนำของยาในชีท) ----------
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let _cand = { n: -1, ind: [], adv: [] };
  function buildCands() {
    let drugs = []; try { drugs = PharmaxSheet.debug().drugs || []; } catch (e) {}
    if (_cand.n === drugs.length && _cand.ind.length) return;
    const mk = (db, field) => {
      const seen = new Set(), out = [];
      const add = t => { t = String(t || '').trim(); if (t && !seen.has(t)) { seen.add(t); out.push(t); } };
      try { db.forEach(x => add(x && x.th)); } catch (e) {}                              // รายการสำเร็จรูปจาก data.js มาก่อน
      drugs.forEach(d => String(d[field] || '').split('\n').forEach(add));              // แล้วตามด้วยของยาตัวอื่นในชีท
      return out;
    };
    let indDb = [], advDb = [];
    try { indDb = indicationsDB; } catch (e) {}
    try { advDb = advicesDB; } catch (e) {}
    _cand = { n: drugs.length, ind: mk(indDb, 'indication'), adv: mk(advDb, 'advice') };
  }
  function suggest(typed, cands) {
    if (!typed || !typed.trim()) return null;
    const lo = typed.toLowerCase();
    const p = cands.find(c => c.length > typed.length && c.toLowerCase().startsWith(lo));
    if (p) return { type: 'prefix', text: p.slice(typed.length), full: p };
    const m = cands.find(c => c.toLowerCase().includes(lo) && c.toLowerCase() !== lo);
    if (m) return { type: 'substring', text: '  (👉 กด Tab: ' + m + ')', full: m };
    return null;
  }
  const smartField = id => '<div class="dsm-gw"><div class="dsm-gov" id="' + id + '_g" aria-hidden="true"></div>' +
    '<textarea id="' + id + '" rows="2" autocomplete="off"></textarea><div class="dsm-pop" id="' + id + '_p"></div></div>';

  function wireSmart(id, kind) {
    const ta = $('#' + id), ov = $('#' + id + '_g'), pop = $('#' + id + '_p');
    if (!ta) return;
    const cands = () => { buildCands(); return _cand[kind]; };
    const lastLine = v => v.slice(v.lastIndexOf('\n') + 1);
    function setGhost(sug) {
      ta.dataset.gt = sug ? sug.type : ''; ta.dataset.gf = sug ? sug.full : ''; ta.dataset.gs = sug ? sug.text : '';
      ov.innerHTML = esc(ta.value) + (sug ? '<span class="gs">' + esc(sug.text) + '</span>' : '');
      ov.scrollTop = ta.scrollTop;
    }
    function refresh() {
      const v = ta.value, atEnd = ta.selectionStart === v.length && ta.selectionEnd === v.length;
      const cur = lastLine(v), key = cur.trim().toLowerCase();
      setGhost(atEnd && key ? suggest(cur, cands()) : null);
      if (!key) { pop.style.display = 'none'; return; }
      const m = cands().filter(c => c.toLowerCase().includes(key)).slice(0, 10);
      if (!m.length || (m.length === 1 && m[0].toLowerCase() === key)) { pop.style.display = 'none'; return; }
      pop._items = m;
      pop.innerHTML = m.map((c, i) => '<div data-i="' + i + '">' + esc(c) + '</div>').join('');
      pop.style.display = 'block';
    }
    function pick(text) {
      const L = ta.value.split('\n'); L[L.length - 1] = text;
      ta.value = L.join('\n') + '\n';
      pop.style.display = 'none'; setGhost(null); ta.focus();
      ta.selectionStart = ta.selectionEnd = ta.value.length;
    }
    pop.addEventListener('mousedown', e => {
      const d = e.target.closest('[data-i]'); if (!d) return;
      e.preventDefault(); pick(pop._items[+d.dataset.i]);
    });
    ta.addEventListener('keydown', e => {
      const t = ta.dataset.gt; if (!t) return;
      const pre = t === 'prefix' && e.key === 'Tab';   // ใช้ Tab เท่านั้น — เว้นวรรค (Space) คือการเว้นวรรคจริง
      const sub = t === 'substring' && e.key === 'Tab';
      if (!pre && !sub) return;
      e.preventDefault();
      if (t === 'prefix') ta.value += ta.dataset.gs;
      else { const L = ta.value.split('\n'); L[L.length - 1] = ta.dataset.gf; ta.value = L.join('\n'); }
      ta.selectionStart = ta.selectionEnd = ta.value.length;
      refresh();
    });
    ['input', 'keyup', 'click'].forEach(ev => ta.addEventListener(ev, refresh));
    ta.addEventListener('scroll', () => { ov.scrollTop = ta.scrollTop; });
    ta.addEventListener('blur', () => setTimeout(() => { pop.style.display = 'none'; }, 120));
    refresh();
  }

  // ---------- ปุ่มหน่วยยา (ชุดเดียวกับหน้าแรก QUICK_DOSAGE_CHIPS + หน่วย มล.) ----------
  function doseChipList() {
    let base;
    try { base = QUICK_DOSAGE_CHIPS.slice(); }
    catch (e) { base = ['1 เม็ด', '2 เม็ด', '0.5 เม็ด', '1 แคปซูล', '1 ซอง', '1 ช้อนชา', 'ทาบางๆ', '1 หยด', 'X']; }
    const xi = base.indexOf('X'), head = xi >= 0 ? base.slice(0, xi) : base.slice();
    ['5 มล.', '10 มล.'].forEach(x => { if (head.indexOf(x) < 0) head.push(x); });
    return head.concat(['X']);
  }
  function setupDoseChips() {
    const ids = ['dsm_m1', 'dsm_m2', 'dsm_m3', 'dsm_m4'];
    let cur = 'dsm_m1';
    const mark = () => ids.forEach(id => $('#' + id).classList.toggle('dsm-cur', id === cur));
    ids.forEach(id => $('#' + id).addEventListener('focus', () => { cur = id; mark(); }));
    mark();
    const box = $('#dsm_chips');
    box.innerHTML = '<span class="dsm-hint" style="width:100%">กดปุ่มเพื่อเติมช่องที่ไฮไลต์สีเขียว (คลิกช่องอื่นเพื่อเปลี่ยนช่อง)</span>' +
      doseChipList().map(v => v === 'X'
        ? '<button type="button" class="dsm-chip clr" data-v="X">✕ ล้างช่อง</button>'
        : '<button type="button" class="dsm-chip" data-v="' + esc(v) + '">' + esc(v) + '</button>').join('');
    box.addEventListener('mousedown', e => { if (e.target.closest('.dsm-chip')) e.preventDefault(); });
    box.addEventListener('click', e => {
      const b = e.target.closest('.dsm-chip'); if (!b) return;
      const el = $('#' + cur); el.value = b.dataset.v === 'X' ? '' : b.dataset.v; el.focus();
    });
  }

  // ---------- ปุ่มลัดความถี่ (ชุดเดียวกับ card 2 หน้าแรก FREQUENCY_SHORTCUTS) ----------
  function freqList() {
    try { if (Array.isArray(FREQUENCY_SHORTCUTS) && FREQUENCY_SHORTCUTS.length) return FREQUENCY_SHORTCUTS; } catch (e) {}
    return [
      { label: '1x1 เช้า', morning: '1 เม็ด', noon: '', evening: '', bed: '', meal: 'after' },
      { label: '1x2 เช้า-เย็น', morning: '1 เม็ด', noon: '', evening: '1 เม็ด', bed: '', meal: 'after' },
      { label: '1x3 หลังอาหาร', morning: '1 เม็ด', noon: '1 เม็ด', evening: '1 เม็ด', bed: '', meal: 'after' },
      { label: '1x4 ทุก 6 ชม.', morning: '1 เม็ด', noon: '1 เม็ด', evening: '1 เม็ด', bed: '1 เม็ด', meal: 'any' },
      { label: '1x1 ก่อนนอน', morning: '', noon: '', evening: '', bed: '1 เม็ด', meal: '' }];
  }
  function mealThaiByKey(key) {      // key ของหน้าแรก (after/any/...) -> ข้อความไทยที่ dropdown ในฟอร์มนี้ใช้
    if (!key) return '';
    try { const o = termOptionOf('meal', key); return o ? o.th : null; } catch (e) { return null; }
  }
  function setupFreqChips() {
    const box = $('#dsm_freq'); if (!box) return;
    const L = freqList();
    box.innerHTML = '<span class="dsm-hint" style="width:100%">ชุดลัดความถี่ (เติมทั้ง 4 ช่อง + เวลาใช้ยา)</span>' +
      L.map((f, i) => '<button type="button" class="dsm-chip freq" data-f="' + i + '">' + esc(f.label) + '</button>').join('');
    box.addEventListener('mousedown', e => { if (e.target.closest('.dsm-chip')) e.preventDefault(); });
    box.addEventListener('click', e => {
      const b = e.target.closest('.dsm-chip'); if (!b) return;
      const f = L[+b.dataset.f]; if (!f) return;
      $('#dsm_m1').value = f.morning || ''; $('#dsm_m2').value = f.noon || '';
      $('#dsm_m3').value = f.evening || ''; $('#dsm_m4').value = f.bed || '';
      if (f.meal !== undefined) { const th = mealThaiByKey(f.meal); if (th !== null) $('#dsm_meal').value = th; }
    });
  }

  const whoLine = () => '<div class="dsm-who">ผู้ใช้: <b>' + esc(session.name || '-') + '</b> (' + esc(session.empId) + ') · <button class="dsm-link" id="dsm_out" type="button" style="margin:0">ออกจากระบบ</button>' +
    '<div style="margin-top:4px;display:flex;gap:12px;flex-wrap:wrap"><button class="dsm-link" id="dsm_toform" type="button" style="margin:0">💊 เพิ่มยาใหม่</button>' +
    '<button class="dsm-link" id="dsm_mine" type="button" style="margin:0">📋 รายการของฉัน</button>' +
    '<button class="dsm-link" id="dsm_tofb" type="button" style="margin:0">💬 ส่งความคิดเห็น</button></div></div>';
  function wireWho() {
    $('#dsm_out').onclick = () => {
      if (session && session.token) api({ action: 'logout', token: session.token });   // ไม่ต้องรอผล
      session = null; sessionStorage.removeItem(SESSION_KEY); afterLogin = null; refreshPrivate(); viewLogin();
    };
    $('#dsm_tofb').onclick = viewFeedback;
    $('#dsm_mine').onclick = viewMine;
    $('#dsm_toform').onclick = () => viewForm();
  }

  // ---------- 📋 รายการของฉัน: ยาที่ส่ง / คำขอแก้ไข / ฟีดแบ็ก พร้อมสถานะและหมายเหตุจากแอดมิน ----------
  const pillOf = st => '<span class="dsm-pill ' + (st === 'อนุมัติแล้ว' ? 'ok' : st === 'ไม่อนุมัติ' ? 'no' : st === 'ดำเนินการแล้ว' ? 'dn' : 'w') + '">' + esc(st || '-') + '</span>';
  async function viewMine() {
    body().innerHTML = head('📋 รายการของฉัน') + whoLine() + '<div class="dsm-hint">กำลังโหลด…</div>';
    wireWho();
    const r = await api(Object.assign({ action: 'myItems' }, auth()));
    if (!r.ok) { if (authFail(r)) return; body().innerHTML = head('📋 รายการของฉัน') + whoLine() + msg('err', r.message || 'โหลดไม่สำเร็จ'); wireWho(); return; }
    const sec = (title, list, fn) => '<div class="dsm-card2-title" style="margin-top:14px">' + title + ' <span class="dsm-hint">(' + list.length + ')</span></div>' +
      (list.length ? list.map(fn).join('') : '<div class="dsm-hint">— ยังไม่มี —</div>');
    const item = (x, extra) => '<div class="dsm-item"><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><b>' + esc(x.title || '-') + '</b>' + pillOf(x.status) + '</div>' +
      '<div class="dsm-hint">' + esc(x.date) + (x.barcode ? ' · บาร์โค้ด ' + esc(x.barcode) : '') + '</div>' + (extra || '') +
      (x.note ? '<div class="dsm-note">💬 แอดมิน: ' + esc(x.note) + '</div>' : '') + '</div>';
    body().innerHTML = head('📋 รายการของฉัน') + whoLine() +
      sec('💊 ยาที่ส่งเพิ่ม', r.drugs || [], x => item(x, x.status === 'รออนุมัติ' ? '<div class="dsm-hint" style="color:#7a5b00">🔒 ระหว่างรออนุมัติ ใช้พิมพ์ฉลากได้เฉพาะบัญชีนี้</div>' : '')) +
      sec('✏️ คำขอแก้ไข', r.edits || [], x => item(x, (x.fields && x.fields.length ? '<div class="dsm-hint">ขอแก้: ' + esc(x.fields.join(', ')) + '</div>' : '') +
        (x.comment ? '<div class="dsm-hint" style="white-space:pre-wrap">' + esc(x.comment) + '</div>' : ''))) +
      sec('💬 ความคิดเห็น', r.feedback || [], x => item(x, '<div class="dsm-hint" style="white-space:pre-wrap">' + esc(x.comment) + '</div>' +
        (x.reply ? '<div style="margin-top:6px;padding:7px 9px;border-left:3px solid #16478E;background:#eef4ff;border-radius:6px;font-size:.82rem"><b>💬 แอดมินตอบ</b>' +
          (x.replyAt ? ' <span class="dsm-hint">· ' + esc(x.replyAt) + '</span>' : '') + '<div style="white-space:pre-wrap">' + esc(x.reply) + '</div></div>' : ''))) +
      '<button class="dsm-btn sec" data-close type="button">ปิด</button>';
    wireWho();
  }
  function authFail(r) {   // รหัสผ่าน/สถานะผู้ใช้ใช้ไม่ได้แล้ว -> กลับหน้าเข้าสู่ระบบ
    if (['invalid', 'pending', 'rejected', 'locked', 'expired'].indexOf(r.error) >= 0) { session = null; sessionStorage.removeItem(SESSION_KEY); refreshPrivate(); viewLogin(msg('err', r.message)); return true; }
    return false;
  }

  function viewFeedback() {
    let ref = ''; try { ref = document.getElementById('in_drug_name').value.trim(); } catch (e) {}
    body().innerHTML = head('💬 ส่งความคิดเห็น (Feedback)') + whoLine() +
      '<label>เรื่องที่ต้องการแจ้ง</label><select id="dsm_fbcat"><option>ข้อมูลยาไม่ถูกต้อง / ควรแก้ไข</option><option>ข้อเสนอแนะการใช้งานระบบ</option><option>พบปัญหา / ข้อผิดพลาดของระบบ</option><option>อื่นๆ</option></select>' +
      '<label>ชื่อยา / บาร์โค้ด <span class="dsm-hint">(ถ้าเกี่ยวข้อง)</span></label><input id="dsm_fbref" autocomplete="off" value="' + esc(ref) + '">' +
      '<label>รายละเอียด</label><textarea id="dsm_fbmsg" rows="5" autocomplete="off"></textarea>' +
      '<div id="dsm_m"></div><button class="dsm-btn" id="dsm_fbsend" type="button">ส่งความคิดเห็น</button>';
    wireWho();
    setTimeout(() => $('#dsm_fbmsg').focus(), 50);
    $('#dsm_fbsend').onclick = async () => {
      const message = $('#dsm_fbmsg').value.trim();
      if (!message) return setMsg('err', 'กรุณาระบุรายละเอียด');
      const b = $('#dsm_fbsend'); b.disabled = true; b.textContent = 'กำลังส่ง…';
      const r = await api(Object.assign({ action: 'submitFeedback', category: $('#dsm_fbcat').value, ref: $('#dsm_fbref').value.trim(), message }, auth()));
      b.disabled = false; b.textContent = 'ส่งความคิดเห็น';
      if (!r.ok) { if (authFail(r)) return; return setMsg('err', r.message || 'ส่งไม่สำเร็จ'); }
      body().innerHTML = head('✅ ส่งความคิดเห็นแล้ว') + msg('ok', 'ขอบคุณสำหรับความคิดเห็น แอดมินจะตรวจสอบต่อไป') +
        '<button class="dsm-btn sec" data-close type="button">ปิด</button>';
    };
  }

  function viewForm() {
    const pre = pendingCode; pendingCode = '';
    body().innerHTML = head('💊 เพิ่มข้อมูลยาใหม่') + whoLine() +
      '<label>บาร์โค้ดแผง (ขายแยกชิ้น) <span class="dsm-hint">ยิงเครื่องสแกนได้เลย</span></label><input id="dsm_bc" inputmode="numeric" autocomplete="off">' +
      '<label>บาร์โค้ดกล่อง (ยกแพ็ค) <span class="dsm-hint">หากมี</span></label><input id="dsm_bc_pack" inputmode="numeric" autocomplete="off">' +
      '<label>Item No. (7 หลัก)</label><input id="dsm_item" inputmode="numeric" autocomplete="off" maxlength="7">' +
      '<div id="dsm_dup"></div>' +
      '<div id="dsm_rest">' +
      '<label>ชื่อการค้า</label><input id="dsm_trade" autocomplete="off">' +
      '<label>ชื่อยาสามัญ <span class="dsm-hint">(พิมพ์ใหญ่อัตโนมัติ)</span></label><input id="dsm_generic" autocomplete="off">' +
      '<label>กลุ่มยา <span class="dsm-hint" id="dsm_cat_hint">กำลังโหลดรายการ…</span></label><select id="dsm_cat"><option value="">-- ไม่ระบุ --</option></select>' +
      '<label>สรรพคุณ <span class="dsm-hint">พิมพ์แล้วมีตัวเลือก · กด Tab รับข้อความเงา</span></label>' + smartField('dsm_ind') +
      // ===== card 2 (ขนาดยาและเวลา) — ยกมาจากหน้าหลัก =====
      '<div class="dsm-card2"><div class="dsm-card2-title"><span class="dsm-num">2</span> ขนาดยาและเวลา (Dosage &amp; Timing)</div>' +
      '<div class="dsm-row2"><div><label>ประเภทของยา (Dosage Form)</label><select id="dsm_type">' + typeOptions() + '</select></div>' +
      '<div><label>เวลาใช้ยา (Meal Time)</label><select id="dsm_meal">' + mealOptions() + '</select></div></div>' + doseDatalist() +
      '<label>ปริมาณการใช้ยา <span class="dsm-hint">ไม่บังคับกรอก · เช่น 1 เม็ด (เว้นว่างถ้าไม่ใช้ หรืออธิบายในคำแนะนำเพิ่มเติมแทน)</span></label>' +
      '<div class="dsm-grid4"><div><label>เช้า</label><input id="dsm_m1" list="dsm_dose_list" autocomplete="off"></div><div><label>กลางวัน</label><input id="dsm_m2" list="dsm_dose_list" autocomplete="off"></div><div><label>เย็น</label><input id="dsm_m3" list="dsm_dose_list" autocomplete="off"></div><div><label>ก่อนนอน</label><input id="dsm_m4" list="dsm_dose_list" autocomplete="off"></div></div>' +
      '<div class="dsm-chips" id="dsm_chips"></div><div class="dsm-chips" id="dsm_freq"></div></div>' +
      '<label>คำแนะนำเพิ่มเติม <span class="dsm-hint">พิมพ์แล้วมีตัวเลือก · กด Tab รับข้อความเงา</span></label>' + smartField('dsm_adv') +
      '<div id="dsm_m"></div>' +
      '<button class="dsm-btn" id="dsm_submit" type="button">Submit</button>' +
      '</div>';
    onlyDigits($('#dsm_bc'), 14); onlyDigits($('#dsm_bc_pack'), 14); onlyDigits($('#dsm_item'), 7);
    addCamButton('dsm_bc', 'สแกนบาร์โค้ดแผง (ขายแยกชิ้น)'); addCamButton('dsm_bc_pack', 'สแกนบาร์โค้ดกล่อง');
    // v1.36: แนะนำกลุ่มโรคติดเชื้อจากชื่อสามัญ (เฉพาะตอนช่องกลุ่มยายังว่าง หรือยังเป็นค่าที่ระบบเลือกให้)
    const autoCat = () => {
      const sel = $('#dsm_cat'); if (!sel || (sel.value && sel.dataset.auto !== sel.value)) return;
      let hit = []; try { hit = infectionCategoriesOf($('#dsm_generic').value || $('#dsm_trade').value); } catch (e) {}
      const c = hit.length === 1 ? hit[0] : '';
      if (c && Array.from(sel.options).some(o => o.value === c)) { sel.value = c; sel.dataset.auto = c; }
      else if (sel.dataset.auto && sel.value === sel.dataset.auto) { sel.value = ''; sel.dataset.auto = ''; }
    };
    $('#dsm_generic').addEventListener('change', autoCat);
    $('#dsm_generic').addEventListener('blur', autoCat);
    $('#dsm_generic').addEventListener('input', e => {
      const el = e.target, p = el.selectionStart; el.value = el.value.toUpperCase(); try { el.setSelectionRange(p, p); } catch (x) {}
    });
    wireWho();
    // v1.35: Enter = ไปช่องถัดไป (บาร์โค้ดแผง → บาร์โค้ดกล่อง → Item No. → ชื่อการค้า → ชื่อสามัญ → กลุ่มยา → สรรพคุณ)
    //        (ชนิดยา → เวลาใช้ยา → เช้า → กลางวัน → เย็น → ก่อนนอน → คำแนะนำ)
    enterChain(['dsm_bc', 'dsm_bc_pack', 'dsm_item', 'dsm_trade', 'dsm_generic', 'dsm_cat'], focusEl('dsm_ind'));
    enterChain(['dsm_type', 'dsm_meal', 'dsm_m1', 'dsm_m2', 'dsm_m3', 'dsm_m4'], focusEl('dsm_adv'));
    $('#dsm_bc').addEventListener('change', checkDup);
    $('#dsm_bc_pack').addEventListener('change', checkDup);
    $('#dsm_item').addEventListener('change', checkDup);
    $('#dsm_submit').onclick = submit;
    loadCategories();
    wireSmart('dsm_ind', 'ind'); wireSmart('dsm_adv', 'adv'); setupDoseChips(); setupFreqChips();
    if (pre.length >= 8) { $('#dsm_bc').value = pre.slice(0, 14); checkDup(); setTimeout(() => $('#dsm_item').focus(), 50); }
    else if (pre.length >= 1) { $('#dsm_item').value = pre.slice(0, 7); setTimeout(() => $('#dsm_bc').focus(), 50); }
    else setTimeout(() => $('#dsm_bc').focus(), 50);
  }

  // v1.38: ปุ่มกล้องข้างช่องบาร์โค้ด (ใช้ตัวสแกนเดียวกับหน้าแรก window.PharmaxScanner)
  function addCamButton(id, title) {
    const el = document.getElementById(id);
    if (!el || !window.PharmaxScanner || el.parentNode.classList.contains('dsm-camrow')) return;
    const row = document.createElement('div'); row.className = 'dsm-camrow';
    el.parentNode.insertBefore(row, el); row.appendChild(el);
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'dsm-cam'; b.title = title; b.setAttribute('aria-label', title);
    b.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"></path><circle cx="12" cy="13" r="3.5"></circle></svg>';
    b.onclick = () => window.PharmaxScanner.open(code => {
      el.value = String(code).replace(/\D/g, '').slice(0, 14);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, title);
    row.appendChild(b);
  }

  // ดึงรายการกลุ่มยาจากชีท drugTH มาทำ dropdown (ให้ข้อมูลคงที่ ไม่ต้องพิมพ์เอง)
  async function loadCategories() {
    const r = await api(Object.assign({ action: 'getOptions' }, auth()));
    const sel = $('#dsm_cat'), hint = $('#dsm_cat_hint');
    if (!sel) return;
    let cats = (r.ok && r.categories) ? r.categories : [];
    if (!cats.length) {   // สำรอง: ใช้กลุ่มยาจากข้อมูลที่หน้าเว็บซิงค์มาจากชีทอยู่แล้ว
      try {
        const set = {};
        PharmaxSheet.debug().drugs.forEach(d => { if (d.category) set[d.category] = true; });
        cats = Object.keys(set).sort((a, b) => a.localeCompare(b, 'th'));
      } catch (e) {}
    }
    try { cats = categoryOptions(cats); } catch (e) {}   // v1.36: รายการมาตรฐาน (แยก แบคทีเรีย/รา/ไวรัส) + กลุ่มอื่นในชีท
    if (cats.length) {
      sel.innerHTML = '<option value="">-- ไม่ระบุ --</option>' + cats.map(c => '<option value="' + esc(c) + '">' + esc(c) + '</option>').join('');
      hint.textContent = '';
    } else { hint.textContent = '(โหลดรายการไม่ได้ — ปล่อยว่างได้)'; }
  }

  // ตรวจซ้ำ: เช็คในแคชของแอปก่อน (เร็ว) แล้วเช็คกับเซิร์ฟเวอร์ (ครอบคลุมรายการที่รอตรวจ)
  async function checkDup() {
    const bc = $('#dsm_bc').value, bc_pack = $('#dsm_bc_pack').value, item = $('#dsm_item').value;
    if (bc.length < 8) return false;
    let hit = null;
    try { if (typeof PharmaxSheet !== 'undefined') hit = PharmaxSheet.findByCode(bc); } catch (e) {}
    if (!hit) {
      const r = await api(Object.assign({ action: 'checkBarcode', barcodeNo: bc, barcodeno_pack: bc_pack, itemNo: item }, auth()));
      if (r.ok && r.duplicate) hit = { name: r.drugName || '' };
    }
    if (hit) { showDuplicate(bc, hit.name); return true; }
    $('#dsm_dup').innerHTML = ''; $('#dsm_rest').style.display = '';
    return false;
  }

  // ยาซ้ำ → ฟอร์มขอแก้ไข: ดึงค่าปัจจุบันจาก drugTH มาให้แก้ทีละช่อง (ช่องที่เปลี่ยนจะเป็นสีเขียว) + เขียนหมายเหตุ
  async function showDuplicate(bc, name) {
    $('#dsm_rest').style.display = 'none';
    $('#dsm_dup').innerHTML = msg('warn', '⚠️ <b>บาร์โค้ดนี้มีข้อมูลอยู่ในระบบแล้ว' + (name ? ' (' + esc(name) + ')' : '') + '</b><br>กำลังโหลดข้อมูลปัจจุบัน…');
    const g = await api(Object.assign({ action: 'getDrug', barcodeNo: bc }, auth()));
    if (!g.ok) { if (authFail(g)) return; }
    const fields = (g.ok && g.found && g.fields) || [];
    const ctl = f => {
      const id = 'dsm_e_' + f.key;
      if (f.key === 'drugtype' || f.key === 'meal') {
        let L = []; try { L = (f.key === 'drugtype' ? SHEET_DRUG_TYPES : SHEET_MEALS).slice(); } catch (e) {}
        // v1.36: ค่าในชีทที่เป็นชื่อเก่า/ชื่ออื่น → เลือกชื่อมาตรฐานไว้ให้ (ช่องจะเป็นสีเขียว = ขอแก้เป็นชื่อมาตรฐาน) · ค่าที่ไม่รู้จักเลย คงไว้ให้เห็น
        const canon = f.value ? canonTerm(f.key === 'drugtype' ? 'type' : 'meal', f.value) : '';
        if (f.value && L.indexOf(f.value) < 0 && canon === f.value) L.unshift(f.value);
        const pick = canon || f.value;
        return '<select id="' + id + '"><option value="">-- ไม่ระบุ --</option>' + L.map(o => '<option value="' + esc(o) + '"' + (o === pick ? ' selected' : '') + '>' + esc(o) + '</option>').join('') + '</select>';
      }
      if (f.key === 'indication' || f.key === 'advice') return smartField(id);
      return '<input id="' + id + '" autocomplete="off"' + (f.key === 'itemno' || f.key === 'barcodenopack' ? ' inputmode="numeric"' : '') + '>';
    };
    $('#dsm_dup').innerHTML =
      msg('warn', '⚠️ <b>บาร์โค้ดนี้มีข้อมูลอยู่ในระบบแล้ว' + (g.drugName || name ? ' (' + esc(g.drugName || name) + ')' : '') + '</b><br>' +
        (fields.length ? 'ไม่อนุญาตให้เพิ่มซ้ำ — ถ้าข้อมูลไม่ถูกต้อง <b>แก้ในช่องด้านล่างได้เลย</b> (ช่องที่แก้จะเป็นสีเขียว) แล้วกดส่งให้แอดมินอนุมัติ'
          : (g.where === 'pending' ? 'รายการนี้มีคนส่งเข้ามาแล้วและกำลังรอแอดมินตรวจ — ถ้าต้องการแจ้งข้อมูลเพิ่ม เขียนด้านล่าง' : 'ไม่อนุญาตให้เพิ่มซ้ำ — ระบุสิ่งที่ต้องการให้แก้ไขด้านล่าง'))) +
      (fields.length ? '<div class="dsm-edgrid">' + fields.map(f => '<label>' + esc(f.label) + '</label>' + ctl(f)).join('') + '</div>' : '') +
      '<label>หมายเหตุถึงแอดมิน' + (fields.length ? ' <span class="dsm-hint">(ไม่บังคับ — เช่น แหล่งอ้างอิง)</span>' : '') + '</label><textarea id="dsm_cmt" rows="3"></textarea>' +
      '<div id="dsm_m"></div><button class="dsm-btn sec" id="dsm_sendc" type="button">ส่งคำขอแก้ไข</button>';
    fields.forEach(f => {
      const el = $('#dsm_e_' + f.key); if (!el) return;
      el.value = f.value || '';
      const mark = () => el.classList.toggle('dsm-chg', el.value.trim() !== String(f.value || '').trim());
      el.addEventListener('input', mark); el.addEventListener('change', mark);
      if (f.key === 'itemno') onlyDigits(el, 7);
      if (f.key === 'barcodenopack') onlyDigits(el, 14);
    });
    if ($('#dsm_e_indication')) wireSmart('dsm_e_indication', 'ind');
    if ($('#dsm_e_advice')) wireSmart('dsm_e_advice', 'adv');
    $('#dsm_sendc').onclick = async () => {
      const c = $('#dsm_cmt').value.trim(), changes = {};
      fields.forEach(f => { const el = $('#dsm_e_' + f.key); if (el && el.value.trim() !== String(f.value || '').trim()) changes[f.key] = el.value.trim(); });
      if (!Object.keys(changes).length && !c) return setMsg('err', fields.length ? 'ยังไม่ได้แก้ไขช่องใด และไม่ได้เขียนหมายเหตุ' : 'กรุณาระบุรายละเอียดที่ต้องการแก้ไข');
      const b = $('#dsm_sendc'); b.disabled = true; b.textContent = 'กำลังส่ง…';
      const r = await api(Object.assign({ action: 'submitEdit', barcodeNo: bc, comment: c, changes: changes }, auth()));
      b.disabled = false; b.textContent = 'ส่งคำขอแก้ไข';
      if (!r.ok) { if (authFail(r)) return; return setMsg('err', r.message || 'ส่งไม่สำเร็จ'); }
      done('✅ ส่งคำขอแก้ไขแล้ว', 'แอดมินจะตรวจสอบ — ติดตามผลได้ที่ "📋 รายการของฉัน"');
    };
  }


  async function submit() {
    const v = id => $('#' + id).value.trim();
    const drug = {
      barcodeNo: v('dsm_bc'), barcodeno_pack: v('dsm_bc_pack'), itemNo: v('dsm_item'), tradeName: v('dsm_trade'), genericName: v('dsm_generic').toUpperCase(),
      drugType: v('dsm_type'), category: v('dsm_cat'), meal: v('dsm_meal'), indication: v('dsm_ind'), advice: v('dsm_adv'),
      morning: v('dsm_m1'), noon: v('dsm_m2'), evening: v('dsm_m3'), bed: v('dsm_m4')
    };
    if (!/^\d{8,14}$/.test(drug.barcodeNo)) return setMsg('err', 'บาร์โค้ดต้องเป็นตัวเลข 8-14 หลัก');
    if (!/^\d{7}$/.test(drug.itemNo)) return setMsg('err', 'Item No. ต้องเป็นตัวเลข 7 หลัก');
    if (!drug.tradeName || !drug.genericName) return setMsg('err', 'กรุณากรอกชื่อการค้าและชื่อยาสามัญ');
    if (!drug.indication) return setMsg('err', 'กรุณากรอกสรรพคุณ');
    // v1.38: ปริมาณการใช้ยา 4 ช่องไม่บังคับ — เภสัชกรอาจอธิบายวิธีใช้ละเอียดในคำแนะนำเพิ่มเติมแทน

    const b = $('#dsm_submit'); b.disabled = true; b.textContent = 'กำลังส่ง…';
    const r = await api(Object.assign({ action: 'submitDrug', drug }, auth()));
    b.disabled = false; b.textContent = 'Submit';
    if (r.duplicate) return showDuplicate(drug.barcodeNo, r.drugName);
    if (!r.ok) {
      if (authFail(r)) return;
      return setMsg('err', r.message || 'ส่งไม่สำเร็จ');
    }
    refreshPrivate();
    done('✅ ส่งข้อมูลแล้ว', 'ระหว่างรอแอดมินตรวจ <b>คุณใช้ยานี้พิมพ์ฉลากได้ทันที</b> (เฉพาะบัญชีนี้ และต้องเข้าสู่ระบบค้างไว้) — ยิงบาร์โค้ดหรือพิมพ์ชื่อยาในหน้าหลักได้เลย · เมื่อแอดมินอนุมัติ ทุกคนจะใช้ได้');
  }

  function done(title, text) {
    body().innerHTML = head(title) + msg('ok', text) +
      '<button class="dsm-btn" id="dsm_again" type="button">เพิ่มข้อมูลยาอีกรายการ</button>' +
      '<button class="dsm-btn sec" id="dsm_tomine" type="button">📋 ดูรายการของฉัน</button>' +
      '<button class="dsm-btn sec" data-close type="button">ปิด</button>';
    $('#dsm_again').onclick = () => viewForm();
    $('#dsm_tomine').onclick = viewMine;
  }
})();
