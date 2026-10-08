/* Scroll reveals, hero circle parallax, count-up stats, accordion. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* reveal on scroll */
const revealEls = document.querySelectorAll('.reveal');
if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));
}

/* pointer parallax on decorated stages */
if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('[data-parallax-stage]').forEach((stage) => {
    const layers = [...stage.querySelectorAll('[data-depth]')];
    if (!layers.length) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const tick = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      layers.forEach((el) => {
        const d = parseFloat(el.dataset.depth || '0');
        el.style.transform = `translate3d(${(cx * d).toFixed(1)}px, ${(cy * d).toFixed(1)}px, 0)`;
      });
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) raf = requestAnimationFrame(tick);
      else raf = null;
    };
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    });
    stage.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); });
  });
}

/* count-up stats */
const counters = document.querySelectorAll('[data-count-to]');
if (counters.length) {
  const run = (el) => {
    const target = parseInt(el.dataset.countTo, 10);
    if (reduceMotion || !Number.isFinite(target)) { el.firstChild.textContent = String(target); return; }
    const dur = 1300; const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.firstChild.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { run(entry.target); cio.unobserve(entry.target); } });
  }, { threshold: 0.4 });
  counters.forEach((el) => cio.observe(el));
}

/* accordion */
document.querySelectorAll('[data-acc-item]').forEach((item) => {
  const btn = item.querySelector('[data-acc-toggle]');
  const panel = item.querySelector('[data-acc-panel]');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open));
  });
});
