// config/site.js
// All CSS variables are set from here at runtime
// so do never touch style.css for colors.

window.SITE = {

  //  meta 
  meta: {
    title:       "su-raya",
    description: "personal github page",
  },

  // Change any hex value to retheme the whole site.
  theme: {
    accent:  "#89b4fa",   // blue
    green:   "#a6e3a1",   // green
    red:     "#f38ba8",   // red
    yellow:  "#f9e2af",   // yellow
    mauve:   "#cba6f7",   // mauve
    bg:      "#1e1e2e",   // base
    surface: "#181825",   // mantle
    crust:   "#11111b",   // crust
    text:    "#cdd6f4",   // text
    sub:     "#6c7086",   // overlay0
    border:  "#313244",   // surface0
  },

  //  boot sequence 
  boot: {
    enabled:  true,
    speedMs:  22,     
    pacman:   true,    
  },

  //  visual effects 
  effects: {
    scanlines:    true, 
    cursorBlink:  true, 
    glitchHover:  true,   
  },

};
