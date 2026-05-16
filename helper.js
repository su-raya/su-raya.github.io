// helper.js
// Runs before everything else.
// 1. Applies CSS variables from config/site.js
// 2. Exposes tiny DOM helpers used across ui/js/*

(function applyTheme() {
  const t = window.SITE.theme;
  const root = document.documentElement.style;
  root.setProperty('--accent',  t.accent);
  root.setProperty('--green',   t.green);
  root.setProperty('--red',     t.red);
  root.setProperty('--yellow',  t.yellow);
  root.setProperty('--mauve',   t.mauve);
  root.setProperty('--bg',      t.bg);
  root.setProperty('--surface', t.surface);
  root.setProperty('--crust',   t.crust);
  root.setProperty('--text',    t.text);
  root.setProperty('--sub',     t.sub);
  root.setProperty('--border',  t.border);
})();
