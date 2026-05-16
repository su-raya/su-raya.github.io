// ui/js/sidebar.js
// Builds and mounts the sidebar.
// Reads: window.BIO (config/bio.js)
//        window.PROJECTS (config/projects.js)

const Sidebar = (() => {

  const SWATCH_COLORS = ['#f38ba8','#f9e2af','#a6e3a1','#89dceb','#89b4fa','#cba6f7'];
  const SOCIAL_ICONS  = { github: '⌘', twitter: '𝕏', linkedin: 'in', mastodon: '🐘' };

  //  template helpers 

  function tSocials(social) {
    return Object.entries(social)
      .filter(([, url]) => url)
      .map(([key, url]) =>
        `<a href="${url}" target="_blank" rel="noopener">[${SOCIAL_ICONS[key] || key}]</a>`)
      .join('');
  }

  function tfastfetch(bio) {
    const rows = [
      ['os',       bio.os.distro],
      ['kernel',   bio.os.kernel],
      ['wm',       bio.os.wm],
      ['shell',    bio.os.shell],
      ['editor',   bio.os.editor],
      ['terminal', bio.os.terminal],
      ['location', bio.location],
    ];
    return rows.map(([k, v]) => `
      <div class="nf-row">
        <span class="nf-key">${k}</span>
        <span class="nf-tilde">~</span>
        <span class="nf-val">&nbsp;${v}</span>
      </div>`).join('');
  }

  function tSwatches() {
    return SWATCH_COLORS
      .map(c => `<span class="nf-swatch" style="background:${c}"></span>`)
      .join('');
  }

  function tProjectItem(proj) {
    return `
      <li class="proj-item${proj.featured ? ' featured' : ''}">
        <a href="${proj.url}" target="_blank" rel="noopener">
          <span class="proj-arrow">${proj.featured ? '→' : '·'}</span>
          <span class="proj-info">
            <span class="proj-name">${proj.name}</span>
            ${proj.description ? `<span class="proj-desc">${proj.description}</span>` : ''}
          </span>
          <span class="proj-status ${proj.status}">${proj.status}</span>
        </a>
      </li>`;
  }

  //  mount 

  function mount() {
    const bio      = window.BIO;
    const projects = [...window.PROJECTS]
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    const avatarUrl = `https://github.com/${bio.github}.png`;

    document.getElementById('sidebar-el').innerHTML = `
      <div class="sidebar-prompt">
        <span class="prompt-dollar">❯</span>
        <span class="prompt-cmd">fastfetch</span>
        <span class="blink-cursor"></span>
      </div>

      <div class="sidebar-avatar">
        <div class="avatar-frame">
          <img src="${avatarUrl}" alt="${bio.name}"
               onerror="this.src='https://github.com/identicons/${bio.github}.png'"/>
        </div>
        <div class="avatar-name">${bio.name}</div>
        <div class="avatar-handle">@${bio.github}</div>
        <div class="avatar-bio">${bio.bio}</div>
        <div class="avatar-socials">${tSocials(bio.social)}</div>
      </div>

      <div class="fastfetch">
        ${tfastfetch(bio)}
        <div class="nf-sep"></div>
        <div class="nf-colors">${tSwatches()}</div>
      </div>

      <div class="sidebar-section">
        <div class="section-header">My Projects</div>
        <ul class="project-list">
          ${projects.map(tProjectItem).join('')}
        </ul>
      </div>
    `;
  }

  return { mount };

})();
