
/**
 * Fetch an HTML partial and inject it into a selector.
 * @param {string} selector  — target element selector (e.g. '#header-root')
 * @param {string} file      — path to the HTML partial (e.g. 'header.html')
 * @param {Function} [cb]    — optional callback after injection
 */
async function loadComponent(selector, file, cb) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res  = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
    el.innerHTML = await res.text();
    if (typeof cb === 'function') cb(el);
  } catch (err) {
    console.error('[MYE] Component load error:', err);
  }
}

/**
 * Load header and footer partials, then wire up nav button.
 * Automatically called on DOMContentLoaded.
 */
async function loadLayout() {
  // Detect current page so the nav button can link to the other page
  const isRegister = !!document.getElementById('regUsername');

  await Promise.all([
    loadComponent('#header-root', 'header.html', () => {
      const btn = document.getElementById('navAuthBtn');
      if (!btn) return;
      if (isRegister) {
        // On register page → button goes to login
        btn.textContent = 'ĐĂNG NHẬP';
        btn.onclick = () => location.href = 'dang-nhap.html';
      } else {
        // On login page → button is cosmetic (already here)
        btn.textContent = 'ĐĂNG NHẬP';
        btn.onclick = null;
      }
    }),
    loadComponent('#footer-root', 'footer.html'),
  ]);
}

// ─── CAPTCHA ────────────────────────────────────────────────
const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
let currentCaptcha = '';

function genCaptchaString(len = 6) {
  return Array.from({ length: len }, () =>
    CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]
  ).join('');
}

function initCaptcha() {
  const el = document.getElementById('captchaText');
  if (!el) return;
  currentCaptcha = genCaptchaString();
  el.textContent = currentCaptcha;
}

function refreshCaptcha() {
  const el = document.getElementById('captchaText');
  const inp = document.getElementById('captchaInput');
  if (!el) return;
  el.style.opacity = '0';
  el.style.transition = 'opacity .2s';
  setTimeout(() => {
    currentCaptcha = genCaptchaString();
    el.textContent = currentCaptcha;
    el.style.opacity = '1';
  }, 200);
  if (inp) { inp.value = ''; inp.focus(); }
}

// ─── TOGGLE PASSWORD VISIBILITY ─────────────────────────────
function togglePw(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  const isHidden = inp.type === 'password';
  inp.type = isHidden ? 'text' : 'password';
  btn.style.color = isHidden ? 'var(--blue-mid)' : '#9ca3af';
}

// ─── FIELD ERROR HELPERS ────────────────────────────────────
/**
 * Mark a field wrapper or input as invalid and show a message.
 * @param {HTMLElement} el   — the input element
 * @param {string}      msg  — error message (empty string = clear)
 */
function setError(el, msg) {
  // Walk up to find the closest .field or .form-group wrapper
  const wrapper = el.closest('.field') || el.closest('.form-group') || el.parentElement;
  clearError(el); // remove old error first

  if (msg) {
    wrapper.classList.add('field--error');
    el.classList.add('input--error');
    const span = document.createElement('span');
    span.className = 'error-msg';
    span.textContent = msg;
    wrapper.appendChild(span);
  }
}

function clearError(el) {
  const wrapper = el.closest('.field') || el.closest('.form-group') || el.parentElement;
  wrapper.classList.remove('field--error');
  el.classList.remove('input--error');
  const old = wrapper.querySelector('.error-msg');
  if (old) old.remove();
}

function clearAllErrors(form) {
  form.querySelectorAll('.input--error').forEach(el => clearError(el));
}

// ─── VALIDATION RULES ───────────────────────────────────────
const RULES = {
  required: (val) => val.trim() !== '' || 'Trường này không được để trống.',

  minLength: (n) => (val) =>
    val.trim().length >= n || `Tối thiểu ${n} ký tự.`,

  maxLength: (n) => (val) =>
    val.trim().length <= n || `Tối đa ${n} ký tự.`,

  username: (val) => {
    if (val.trim() === '') return 'Vui lòng nhập tên đăng nhập hoặc email.';
    // accept email OR username (3–30 chars, alphanumeric + _ -)
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userRx  = /^[a-zA-Z0-9_\-]{3,30}$/;
    if (!emailRx.test(val) && !userRx.test(val))
      return 'Tên đăng nhập phải từ 3–30 ký tự (chữ, số, _ hoặc -), hoặc là email hợp lệ.';
    return true;
  },

  password: (val) => {
    if (val.length < 8)       return 'Mật khẩu ít nhất 8 ký tự.';
    if (!/[A-Z]/.test(val))   return 'Mật khẩu phải có ít nhất 1 chữ hoa.';
    if (!/[0-9]/.test(val))   return 'Mật khẩu phải có ít nhất 1 chữ số.';
    return true;
  },

  email: (val) => {
    if (val.trim() === '') return 'Vui lòng nhập email.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email không hợp lệ.';
  },

  phone: (val) => {
    if (val.trim() === '') return 'Vui lòng nhập số điện thoại.';
    return /^(0|\+84)[0-9]{9}$/.test(val.replace(/\s/g, '')) ||
      'Số điện thoại không hợp lệ (VD: 0901234567).';
  },

  fullName: (val) => {
    if (val.trim() === '') return 'Vui lòng nhập họ và tên.';
    return val.trim().split(/\s+/).length >= 2 || 'Vui lòng nhập đầy đủ họ và tên.';
  },

  dob: (val) => {
    if (!val) return 'Vui lòng chọn ngày sinh.';
    const dob  = new Date(val);
    const now  = new Date();
    const age  = now.getFullYear() - dob.getFullYear() -
                 (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);
    if (age < 13) return 'Bạn phải ít nhất 13 tuổi để đăng ký.';
    if (age > 120) return 'Ngày sinh không hợp lệ.';
    return true;
  },

  address: (val) =>
    val.trim().length >= 10 || 'Địa chỉ phải ít nhất 10 ký tự.',
};

/**
 * Run an array of rule functions against a value.
 * Returns first error string or true.
 */
function runRules(val, ruleFns) {
  for (const fn of ruleFns) {
    const result = fn(val);
    if (result !== true) return result;
  }
  return true;
}

// ─── LIVE VALIDATION (blur) ─────────────────────────────────
function attachLiveValidation(inputEl, ruleFns) {
  inputEl.addEventListener('blur', () => {
    const result = runRules(inputEl.value, ruleFns);
    result === true ? clearError(inputEl) : setError(inputEl, result);
  });
  inputEl.addEventListener('input', () => {
    if (inputEl.classList.contains('input--error')) clearError(inputEl);
  });
}

// ─── TOAST NOTIFICATION ─────────────────────────────────────
function showToast(msg, type = 'error') {
  const existing = document.querySelector('.mye-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `mye-toast mye-toast--${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('mye-toast--show'));
  setTimeout(() => {
    toast.classList.remove('mye-toast--show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ─── PAGE: ĐĂNG NHẬP ────────────────────────────────────────
function initLoginPage() {
  const usernameEl = document.getElementById('loginUsername');
  const passwordEl = document.getElementById('loginPassword');
  const btnLogin   = document.getElementById('btnLogin');

  if (!btnLogin) return;

  // live
  attachLiveValidation(usernameEl, [RULES.username]);
  attachLiveValidation(passwordEl, [RULES.required]);

  btnLogin.addEventListener('click', () => {
    clearAllErrors(document.querySelector('.card'));
    let valid = true;

    const uResult = runRules(usernameEl.value, [RULES.username]);
    if (uResult !== true) { setError(usernameEl, uResult); valid = false; }

    const pResult = runRules(passwordEl.value, [RULES.required]);
    if (pResult !== true) { setError(passwordEl, pResult); valid = false; }

    if (!valid) return;

    // ✅ All good — simulate login
    btnLogin.disabled = true;
    btnLogin.textContent = 'Đang đăng nhập...';
    setTimeout(() => {
      showToast('Đăng nhập thành công! Chào mừng bạn trở lại.', 'success');
      btnLogin.disabled = false;
      btnLogin.textContent = 'ĐĂNG NHẬP';
    }, 1200);
  });
}

// ─── PAGE: ĐĂNG KÝ ──────────────────────────────────────────
function initRegisterPage() {
  const fields = {
    username : document.getElementById('regUsername'),
    pw1      : document.getElementById('pw1'),
    pw2      : document.getElementById('pw2'),
    fullName : document.getElementById('regFullName'),
    dob      : document.getElementById('regDob'),
    address  : document.getElementById('regAddress'),
    email    : document.getElementById('regEmail'),
    phone    : document.getElementById('regPhone'),
    captcha  : document.getElementById('captchaInput'),
  };

  const btnReg = document.getElementById('btnRegister');
  if (!btnReg) return;

  // Init captcha
  initCaptcha();

  // Live validation
  attachLiveValidation(fields.username, [RULES.username]);
  attachLiveValidation(fields.pw1,      [RULES.password]);
  attachLiveValidation(fields.pw2,      [
    RULES.required,
    (val) => val === fields.pw1.value || 'Mật khẩu nhập lại không khớp.',
  ]);
  attachLiveValidation(fields.fullName, [RULES.fullName]);
  attachLiveValidation(fields.dob,      [RULES.dob]);
  attachLiveValidation(fields.address,  [RULES.required, RULES.address]);
  attachLiveValidation(fields.email,    [RULES.email]);
  attachLiveValidation(fields.phone,    [RULES.phone]);

  btnReg.addEventListener('click', () => {
    // Clear all errors across both cards
    document.querySelectorAll('.card').forEach(c => clearAllErrors(c));
    let valid = true;

    function check(el, ruleFns) {
      const result = runRules(el.value, ruleFns);
      if (result !== true) { setError(el, result); valid = false; }
    }

    check(fields.username, [RULES.username]);
    check(fields.pw1,      [RULES.password]);
    check(fields.pw2,      [
      RULES.required,
      (val) => val === fields.pw1.value || 'Mật khẩu nhập lại không khớp.',
    ]);
    check(fields.fullName, [RULES.fullName]);
    check(fields.dob,      [RULES.dob]);
    check(fields.address,  [RULES.required, RULES.address]);
    check(fields.email,    [RULES.email]);
    check(fields.phone,    [RULES.phone]);

    // Captcha
    const captchaVal = fields.captcha.value.trim();
    if (!captchaVal) {
      setError(fields.captcha, 'Vui lòng nhập mã xác nhận.');
      valid = false;
    } else if (captchaVal !== currentCaptcha) {
      setError(fields.captcha, 'Mã xác nhận không đúng. Vui lòng thử lại.');
      refreshCaptcha();
      valid = false;
    }

    if (!valid) {
      // Scroll to first error
      const firstErr = document.querySelector('.input--error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // ✅ All good — simulate register
    btnReg.disabled = true;
    btnReg.textContent = 'Đang đăng ký...';
    setTimeout(() => {
      showToast('Đăng ký thành công! Chào mừng bạn đến với MYE.', 'success');
      btnReg.disabled = false;
      btnReg.textContent = 'ĐĂNG KÝ';
      refreshCaptcha();
    }, 1400);
  });
}

// ─── BOOT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Inject header + footer partials
  await loadLayout();

  // 2. Init page-specific logic
  if (document.getElementById('loginUsername')) initLoginPage();
  if (document.getElementById('regUsername'))   initRegisterPage();
});