// ui/js/content.js
// Builds and mounts the main content area.
// Reads: window.BIO (config/bio.js)
//        window.PROJECTS (config/projects.js)
//        window.SITE (config/site.js)

const Content = (() => {

  const ASCII = `
 ███████╗██╗   ██╗      ██████╗  █████╗ ██╗   ██╗ █████╗
 ██╔════╝██║   ██║      ██╔══██╗██╔══██╗╚██╗ ██╔╝██╔══██╗
 ███████╗██║   ██║█████╗██████╔╝███████║ ╚████╔╝ ███████║
 ╚════██║██║   ██║╚════╝██╔══██╗██╔══██║  ╚██╔╝  ██╔══██║
 ███████║╚██████╔╝      ██║  ██║██║  ██║   ██║   ██║  ██║
 ╚══════╝ ╚═════╝       ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝`.trimStart();

  //  template helpers 

  function tTagline(lines) {
    return lines.join(' / ')
      .replace(/linux/gi,       '<span class="hl-green">linux</span>')
      .replace(/open source/gi, '<span class="hl-accent">open source</span>')
      .replace(/2am/gi,         '<span class="hl-mauve">2am</span>');
  }

  function tAboutLines(lines) {
    return lines.map((line, i) => `
      <div class="about-line">
        <span class="line-num">${i + 1}</span>
        <span>${line}</span>
      </div>`).join('');
  }

  function tSkills(skills) {
    return [...skills.languages, ...skills.tools, ...skills.platforms]
      .map(s => `<span class="skill-tag">${s}</span>`)
      .join('');
  }

  function tProjectCard(proj) {
    const tags = (proj.tags || [])
      .map(t => `<span class="card-tag">${t}</span>`)
      .join('');

    return `
      <a href="${proj.url}" target="_blank" rel="noopener"
         class="proj-card${proj.featured ? ' featured' : ''}">
        <div class="card-top">
          <span class="card-icon">${proj.featured ? '◉' : '○'}</span>
          <span class="card-title">${proj.name}</span>
          ${proj.featured ? '<span class="card-pin">pinned</span>' : ''}
        </div>
        <div class="card-desc">${proj.description || ''}</div>
        <div class="card-footer">
          <div class="card-tags">${tags}</div>
          <span class="card-ext">→ open</span>
        </div>
      </a>`;
  }

  //  mount 

  function mount() {
    const bio      = window.BIO;
    const projects = window.PROJECTS;
    const site     = window.SITE;

    document.title = site.meta.title;

    // topbar
    document.getElementById('tb-title-el').innerHTML =
      `<span>su-raya@github</span>:~ — index.html`;
    document.getElementById('tb-right-el').textContent =
      new Date().toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });

    // hero
    document.getElementById('hero-ascii-el').textContent = ASCII;
    document.getElementById('hero-tagline-el').innerHTML = tTagline(bio.about);

    // about
    document.getElementById('about-lines-el').innerHTML = tAboutLines(bio.about);
    document.getElementById('skills-el').innerHTML      = tSkills(bio.skills);

    // projects grid
    document.getElementById('projects-grid-el').innerHTML =
      projects.map(tProjectCard).join('');

    // footer
    document.getElementById('footer-left-el').textContent =
      `© ${new Date().getFullYear()} ${bio.name}`;
  }

  return { mount };

})();
