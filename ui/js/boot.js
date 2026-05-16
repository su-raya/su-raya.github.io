// ui/js/boot.js
// 
// Boot sequence animation and pacman loading bar.
// Reads: window.SITE (config/site.js)
//        window.PROJECTS (config/projects.js)
//        window.BIO (config/bio.js)
// 

const Boot = (() => {

  // each line: t = css class suffix, s = text, d = extra delay ms on top of speedMs
  function buildLines() {
    const n   = window.PROJECTS.length;
    const bio = window.BIO;

    return [
      //  UEFI 
      { t: "head", s: "SeaBIOS (version rel-1.16.3-0-ga6ed6b7)",                         d: 0   },
      { t: "",     s: "",                                                                  d: 80  },
      { t: "head", s: "UEFI Firmware v3.4.1  |  su-raya",                    d: 0   },
      { t: "sub",  s: "BIOS Date: 06/16/2026  |  CPU: x86_64  |  RAM: 32768 MiB",        d: 0   },
      { t: "",     s: "",                                                                  d: 120 },

      //  kernel ring buffer 
      { t: "",     s: "[    0.000000] Linux version 6.8.1-arch1-1 (gcc 13.2.1)",         d: 0   },
      { t: "",     s: "[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-linux root=/dev/sda1 rw quiet loglevel=3", d: 0 },
      { t: "",     s: "[    0.142371] ACPI: IRQ0 used by override.",                      d: 0   },
      { t: "",     s: "[    0.198204] PCI: Using configuration type 1 for base access.",  d: 0   },
      { t: "",     s: "[    0.312819] clocksource: tsc-early: mask: 0xffffffffffffffff",  d: 0   },
      { t: "",     s: "[    0.401553] Calibrating delay loop... 4800.00 BogoMIPS",        d: 0   },
      { t: "ok",   s: "[    0.512000] NET: Registered PF_INET6 protocol family.",         d: 0   },
      { t: "ok",   s: "[    0.601882] EXT4-fs (sda1): mounted filesystem with ordered data mode.", d: 0 },
      { t: "",     s: "",                                                                  d: 80  },

      //  systemd 
      { t: "head", s: "systemd 255 (255.4-1-arch) running in system mode (+PAM +AUDIT)", d: 0   },
      { t: "sub",  s: "Detected virtualization: none  |  Detected architecture: x86-64", d: 0   },
      { t: "",     s: "",                                                                  d: 60  },
      { t: "ok",   s: "[  OK  ] Reached target Local File Systems (Pre).",                d: 0   },
      { t: "ok",   s: "[  OK  ] Started Remount Root and Kernel File Systems.",           d: 0   },
      { t: "ok",   s: "[  OK  ] Started Create Static Device Nodes in /dev.",             d: 0   },
      { t: "ok",   s: "[  OK  ] Reached target Local File Systems.",                      d: 0   },
      { t: "ok",   s: "[  OK  ] Started Load/Save Random Seed.",                          d: 0   },
      { t: "ok",   s: "[  OK  ] Started Create System Users.",                            d: 0   },
      { t: "ok",   s: "[  OK  ] Started Apply Kernel Variables.",                         d: 0   },

      //  network 
      { t: "",     s: "[  **  ] A start job is running for Network Manager (3s / no limit)", d: 220 },
      { t: "ok",   s: "[  OK  ] Started Network Manager.",                                d: 360 },
      { t: "ok",   s: "[  OK  ] Reached target Network.",                                 d: 0   },
      { t: "info", s: "[ INFO ] wlan0: connected  |  signal: -42 dBm  |  freq: 5GHz",    d: 60  },
      { t: "info", s: "[ INFO ] IPv4: 192.168.1.x assigned via DHCP",                     d: 0   },

      //  user session 
      { t: "",     s: "",                                                                  d: 80  },
      { t: "ok",   s: "[  OK  ] Created slice User Slice of UID 1000.",                   d: 0   },
      { t: "ok",   s: "[  OK  ] Started User Manager for UID 1000.",                      d: 0   },
      { t: "info", s: `[ INFO ] Mounting /home/${bio.github}...`,                         d: 0   },
      { t: "ok",   s: `[  OK  ] Mounted /home/${bio.github}.`,                          d: 100 },
      { t: "ok",   s: "[  OK  ] Reached target Multi-User System.",                       d: 0   },
      { t: "ok",   s: "[  OK  ] Reached target Graphical Interface.",                     d: 0   },

      //  pacman sync 
      { t: "",     s: "",                                                                  d: 100 },
      { t: "head", s: ":: Synchronizing package databases...",                            d: 0   },
      { t: "sub",  s: " core           155.2 KiB   1.8 MiB/s  00:00 [##########] 100%", d: 80  },
      { t: "sub",  s: " extra         8837.8 KiB   4.2 MiB/s  00:02 [##########] 100%", d: 140 },
      { t: "sub",  s: " multilib       182.3 KiB   2.9 MiB/s  00:00 [##########] 100%", d: 60  },
      { t: "",     s: "",                                                                  d: 80  },
      { t: "head", s: ":: Resolving dependencies...",                                     d: 0   },
      { t: "sub",  s: ":: Packages (6)  ttf-jetbrains-mono  nerd-fonts-jetbrains-mono",  d: 0   },
      { t: "sub",  s: "                 catppuccin-gtk-theme-mocha  xdg-utils",           d: 0   },
      { t: "sub",  s: "                 wl-clipboard  jq",                                d: 0   },
      { t: "",     s: "",                                                                  d: 60  },
      { t: "sub",  s: "Total Installed Size:  47.23 MiB",                                d: 0   },
      { t: "",     s: "",                                                                  d: 40  },
      { t: "ok",   s: "[  OK  ] ttf-jetbrains-mono 3.1.1-1              installed",      d: 80  },
      { t: "ok",   s: "[  OK  ] nerd-fonts-jetbrains-mono 3.1.1-1       installed",      d: 60  },
      { t: "ok",   s: "[  OK  ] catppuccin-gtk-theme-mocha 1.0.3-1      installed",      d: 60  },

      //  config validation (warnings that resolve themselves) 
      { t: "",     s: "",                                                                  d: 80  },
      { t: "warn", s: "[ WARN ] config/bio.js — last modified 3 minutes ago",             d: 0   },
      { t: "warn", s: "[ WARN ] config/projects.js — uncommitted changes detected",        d: 0   },
      { t: "info", s: ":: Validating config checksums...",                                d: 200 },
      { t: "sub",  s: "  bio.js        sha256: a3f8c2d1...91be  ✓",                     d: 80  },
      { t: "sub",  s: "  projects.js   sha256: 77d41e09...c304  ✓",                     d: 80  },
      { t: "sub",  s: "  site.js       sha256: 0fb912a4...aa17  ✓",                     d: 80  },
      { t: "ok",   s: "[  OK  ] All config files valid. Warnings cleared.",               d: 0   },

      //  github fetch 
      { t: "",     s: "",                                                                  d: 80  },
      { t: "info", s: ":: Fetching GitHub profile data...",                               d: 0   },
      { t: "sub",  s: `  → GET https://api.github.com/users/${bio.github}`,             d: 120 },
      { t: "sub",  s: `  → GET https://github.com/${bio.github}.png`,                   d: 80  },
      { t: "ok",   s: `[  OK  ] github.com/${bio.github}  200 OK  (34ms)`,             d: 60  },
      { t: "ok",   s: "[  OK  ] avatar cached  (78×78px)",                               d: 0   },
      { t: "ok",   s: `[  OK  ] ${n} project(s) registered from config/projects.js`,    d: 0   },

      //  ui modules 
      { t: "",     s: "",                                                                  d: 80  },
      { t: "ok",   s: "[  OK  ] helper.js        — theme vars applied (catppuccin-mocha)", d: 0  },
      { t: "ok",   s: "[  OK  ] ui/js/sidebar.js  — module ready",                       d: 0   },
      { t: "ok",   s: "[  OK  ] ui/js/content.js  — module ready",                       d: 0   },
      { t: "ok",   s: "[  OK  ] ui/js/boot.js     — module ready",                       d: 0   },
      { t: "",     s: "",                                                                  d: 100 },

      //  final prompt 
      { t: "head", s: `${bio.github}@github ~]$`,                          d: 0   },
    ];
  }

  function pacman() {
    return new Promise(resolve => {
      const bar   = document.getElementById('pacman-bar');
      const total = 28;
      let filled  = 0;

      const iv = setInterval(() => {
        if (filled >= total) {
          clearInterval(iv);
          bar.textContent = `[${''.repeat(total)}] 100%`;
          setTimeout(resolve, 200);
          return;
        }
        filled++;
        const pct   = Math.round((filled / total) * 100);
        const pac   = filled % 2 === 0 ? 'ᗧ' : 'ᗣ';
        const trail = ''.repeat(Math.max(0, filled - 1));
        const space = ' '.repeat(total - filled);
        bar.textContent = `[${trail}${pac}${space}] ${pct}%`;
      }, 55);
    });
  }

  function run() {
    return new Promise(resolve => {
      const cfg       = window.SITE.boot;
      const container = document.getElementById('boot-lines');
      const lines     = buildLines();
      let i           = 0;

      function nextLine() {
        if (i >= lines.length) {
          const wrap = document.getElementById('pacman-wrap');
          wrap.style.display = 'flex';
          pacman().then(() => {
            setTimeout(() => {
              document.getElementById('boot-screen').classList.add('hidden');
              setTimeout(resolve, 550);
            }, 400);
          });
          return;
        }

        const line     = lines[i++];
        const el       = document.createElement('div');
        el.className   = `boot-line ${line.t === 'sub' ? '' : line.t}`;
        el.textContent = line.s;
        // sub lines get muted indent styling without a dedicated CSS class
        if (line.t === 'sub') el.style.cssText = 'color:var(--sub);padding-left:1.2em';
        container.appendChild(el);
        el.scrollIntoView({ block: 'end', behavior: 'instant' });

        // base speed + per-line pause + tiny jitter for realism
        const delay = cfg.speedMs + (line.d ?? 0) + Math.random() * 10;
        setTimeout(nextLine, delay);
      }

      nextLine();
    });
  }

  return { run };

})();