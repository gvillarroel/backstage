/**
 * diagrams.js — Shared Mermaid + PlantUML renderer for Equifax AI Backstage.
 *
 * Mermaid:   Rendered client-side via mermaid ESM from CDN.
 * PlantUML:  Encoded with pako (deflateRaw) + PlantUML base64, then rendered
 *            as <img> from https://www.plantuml.com/plantuml/svg/<encoded>.
 *
 * Dependencies (loaded via CDN):
 *   - mermaid@11  (ESM)
 *   - pako@2      (UMD, loaded by this script)
 */

/* ── Mermaid initialization ── */
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#cdf3ff',
    primaryTextColor: '#1c1c1c',
    primaryBorderColor: '#007298',
    lineColor: '#333e48',
    secondaryColor: '#ffccd5',
    tertiaryColor: '#f7f7f7',
    fontFamily: '"Open Sans", arial, sans-serif'
  }
});

/* ── PlantUML encoder ── */

/**
 * EFX brand skinparams injected after @startuml in every diagram.
 * Maps the Equifax color palette to PlantUML styling properties.
 */
const EFX_PLANTUML_THEME = `
skinparam backgroundColor #f7f7f7
skinparam defaultFontName "Open Sans"
skinparam defaultFontColor #333e48
skinparam shadowing false
skinparam roundCorner 4
skinparam ArrowColor #333e48
skinparam ArrowFontColor #333e48

skinparam participant {
  BorderColor #007298
  BackgroundColor #cdf3ff
  FontColor #1c1c1c
}

skinparam actor {
  BorderColor #007298
  BackgroundColor #cdf3ff
  FontColor #1c1c1c
}

skinparam usecase {
  BorderColor #007298
  BackgroundColor #cdf3ff
  FontColor #1c1c1c
}

skinparam rectangle {
  BorderColor #007298
  BackgroundColor #ffffff
  FontColor #1c1c1c
}

skinparam package {
  BorderColor #007298
  BackgroundColor #ffffff
  FontColor #1c1c1c
  StereotypeFontColor #007298
}

skinparam component {
  BorderColor #007298
  BackgroundColor #cdf3ff
  FontColor #1c1c1c
}

skinparam database {
  BorderColor #9e1b32
  BackgroundColor #ffccd5
  FontColor #1c1c1c
}

skinparam node {
  BorderColor #007298
  BackgroundColor #cdf3ff
  FontColor #1c1c1c
}

skinparam cloud {
  BorderColor #652f6c
  BackgroundColor #f9ccff
  FontColor #1c1c1c
}

skinparam note {
  BorderColor #e77204
  BackgroundColor #ffe5cc
  FontColor #1c1c1c
}

skinparam activity {
  BorderColor #007298
  BackgroundColor #cdf3ff
  FontColor #1c1c1c
  DiamondBorderColor #9e1b32
  DiamondBackgroundColor #ffccd5
  DiamondFontColor #1c1c1c
  StartColor #007298
  EndColor #9e1b32
  BarColor #333e48
}

skinparam sequence {
  LifeLineBorderColor #007298
  LifeLineBackgroundColor #cdf3ff
  GroupBorderColor #007298
  GroupBackgroundColor #f7f7f7
  DividerBorderColor #9c9c9c
  DividerBackgroundColor #e7e7e7
  ReferenceBackgroundColor #cdf3ff
  ReferenceBorderColor #007298
}

skinparam class {
  BorderColor #007298
  BackgroundColor #cdf3ff
  HeaderBackgroundColor #007298
  FontColor #1c1c1c
  AttributeFontColor #333e48
}

skinparam state {
  BorderColor #007298
  BackgroundColor #cdf3ff
  FontColor #1c1c1c
  StartColor #007298
  EndColor #9e1b32
}
`.trim();

/**
 * Inject EFX theme after @startuml, removing any existing !theme directive.
 */
function applyEfxTheme(text) {
  return text
    .replace(/!theme\s+\w+\n?/g, '')
    .replace(/@startuml/, '@startuml\n' + EFX_PLANTUML_THEME);
}

function encode6bit(b) {
  if (b < 10) return String.fromCharCode(48 + b);
  b -= 10;
  if (b < 26) return String.fromCharCode(65 + b);
  b -= 26;
  if (b < 26) return String.fromCharCode(97 + b);
  b -= 26;
  if (b === 0) return '-';
  if (b === 1) return '_';
  return '?';
}

function append3bytes(b1, b2, b3) {
  const c1 = b1 >> 2;
  const c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
  const c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
  const c4 = b3 & 0x3F;
  return (
    encode6bit(c1 & 0x3F) +
    encode6bit(c2 & 0x3F) +
    encode6bit(c3 & 0x3F) +
    encode6bit(c4 & 0x3F)
  );
}

function encode64(data) {
  let r = '';
  for (let i = 0; i < data.length; i += 3) {
    const b1 = data[i];
    const b2 = i + 1 < data.length ? data[i + 1] : 0;
    const b3 = i + 2 < data.length ? data[i + 2] : 0;
    r += append3bytes(b1, b2, b3);
  }
  return r;
}

function encodePlantUML(text) {
  const themed = applyEfxTheme(text);
  const data = window.pako.deflateRaw(themed, { level: 9 });
  return encode64(data);
}

/* ── PlantUML rendering ── */

function renderPlantUML() {
  document.querySelectorAll('.plantuml-code').forEach((el) => {
    const pre = el.querySelector('pre');
    if (!pre) return;
    const text = pre.textContent.trim();
    try {
      const encoded = encodePlantUML(text);
      const wrapper = document.createElement('div');
      wrapper.style.textAlign = 'center';
      wrapper.style.marginTop = '12px';

      const img = document.createElement('img');
      img.src = 'https://www.plantuml.com/plantuml/svg/' + encoded;
      img.alt = 'PlantUML diagram';
      img.style.maxWidth = '100%';
      img.style.borderRadius = '4px';

      // Keep the label
      const label = el.previousElementSibling;

      wrapper.appendChild(img);
      el.innerHTML = '';
      el.appendChild(wrapper);
    } catch (e) {
      console.error('PlantUML encoding failed:', e);
    }
  });
}

/* ── Load pako then render PlantUML ── */

const pakoScript = document.createElement('script');
pakoScript.src = 'https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js';
pakoScript.onload = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPlantUML);
  } else {
    renderPlantUML();
  }
};
document.head.appendChild(pakoScript);
