# su-raya.github.io

personal github pages


su-raya.github.io/
│
├ index.html          entry point — don't touch
├ helper.js           applies theme vars, runs first
├ README.md
│
├ config/             
│   ├ bio.js          name, bio, info, social links, skills
│   ├ projects.js     projects with custom names & urls
│   └ site.js         theme colors and effect toggles
│
└ ui/                 ui layer — only touch to change layout/style
    ├ css/
    │   └ style.css   all styles (colors come from config/site.js)
    └ js/
        ├ boot.js     boot sequence
        ├ sidebar.js  sidebar builder
        └ content.js  main content builder
