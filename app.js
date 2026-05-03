// ─── Animal Configuration ─────────────────────────────────────────────────────
// Edit this array to add, remove, or reorder animals.
// Each entry: { name, colors: [bg, mid, accent], sound: fn(ctx) }
const ANIMALS = [
  { name: 'Cat',      colors: ['#e8c4a0','#c97a3e','#7a4a1e'] },
  { name: 'Dog',      colors: ['#d4b896','#8b6340','#3d2010'] },
  { name: 'Cow',      colors: ['#e8e4dc','#8c7860','#2c1a0a'] },
  { name: 'Duck',     colors: ['#b8d4e8','#f5c842','#2a6040'] },
  { name: 'Frog',     colors: ['#8bc48a','#3a7a38','#1a3a18'] },
  { name: 'Horse',    colors: ['#c4a07a','#7a5030','#2a1808'] },
  { name: 'Lion',     colors: ['#e8c060','#c47828','#4a2808'] },
  { name: 'Elephant', colors: ['#b0b8c4','#707888','#202830'] },
  { name: 'Sheep',    colors: ['#e4e8ec','#a0a8b0','#302828'] },
  { name: 'Bird',        colors: ['#98c8e8','#e86848','#1a3858'] },
  { name: 'Bee',         colors: ['#f5d828','#d47808','#181000'] },
  { name: 'Sparrow',     colors: ['#c8a878','#7a5030','#281408'] },
  { name: 'Caterpillar', colors: ['#80c860','#3a8028','#0a2808'] },
  { name: 'Dragonfly',   colors: ['#50c8e8','#0878b8','#001828'] },
  { name: 'Hawk',        colors: ['#c09050','#784820','#180c00'] },
  { name: 'BlackPhoebe', label: 'Black Phoebe', colors: ['#d8d8e8','#404858','#080810'] },
];

// ─── SVG Animal Illustrations ─────────────────────────────────────────────────
// Abstract painted-style SVGs using filters for painterly texture.
function makeSVG(name, colors) {
  const [bg, mid, accent] = colors;
  const shapes = ANIMAL_SHAPES[name] || ANIMAL_SHAPES['default'];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
  <defs>
    <filter id="paint-${name}" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04 0.06" numOctaves="4" seed="${name.charCodeAt(0)}" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="blur-${name}">
      <feGaussianBlur stdDeviation="1.5"/>
    </filter>
    <radialGradient id="bg-${name}" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${lighten(bg, 30)}"/>
      <stop offset="100%" stop-color="${bg}"/>
    </radialGradient>
  </defs>
  <!-- Background wash -->
  <rect width="160" height="160" fill="url(#bg-${name})" rx="18"/>
  <!-- Paint strokes background -->
  ${shapes.bg(mid, accent, bg)}
  <!-- Main animal body (painterly) -->
  <g filter="url(#paint-${name})">
    ${shapes.body(mid, accent, bg)}
  </g>
  <!-- Highlights -->
  ${shapes.highlights(bg, accent)}
</svg>`;
}

function lighten(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (n >> 16) + amt);
  const g = Math.min(255, ((n >> 8) & 0xff) + amt);
  const b = Math.min(255, (n & 0xff) + amt);
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2,'0')).join('');
}

// Abstract painted shapes for each animal
const ANIMAL_SHAPES = {
  Cat: {
    bg: (m,a) => `
      <ellipse cx="80" cy="95" rx="52" ry="42" fill="${m}" opacity="0.35" filter="url(#blur-Cat)"/>
      <ellipse cx="55" cy="58" rx="22" ry="24" fill="${m}" opacity="0.25" filter="url(#blur-Cat)"/>
      <ellipse cx="105" cy="58" rx="22" ry="24" fill="${m}" opacity="0.25" filter="url(#blur-Cat)"/>`,
    body: (m,a) => `
      <!-- Body -->
      <ellipse cx="80" cy="100" rx="44" ry="36" fill="${m}"/>
      <!-- Head -->
      <ellipse cx="80" cy="68" rx="30" ry="28" fill="${m}"/>
      <!-- Ears -->
      <polygon points="56,46 48,24 72,42" fill="${a}"/>
      <polygon points="104,46 112,24 88,42" fill="${a}"/>
      <polygon points="58,45 52,28 70,43" fill="${lighten(m,40)}" opacity="0.7"/>
      <polygon points="102,45 108,28 90,43" fill="${lighten(m,40)}" opacity="0.7"/>
      <!-- Face -->
      <ellipse cx="72" cy="66" rx="8" ry="9" fill="${a}" opacity="0.9"/>
      <ellipse cx="88" cy="66" rx="8" ry="9" fill="${a}" opacity="0.9"/>
      <ellipse cx="72" cy="67" rx="4" ry="6" fill="#1a0a00"/>
      <ellipse cx="88" cy="67" rx="4" ry="6" fill="#1a0a00"/>
      <!-- Nose -->
      <ellipse cx="80" cy="78" rx="4" ry="3" fill="${a}"/>
      <!-- Whiskers -->
      <line x1="80" y1="78" x2="50" y2="74" stroke="${a}" stroke-width="1.5" opacity="0.7"/>
      <line x1="80" y1="79" x2="50" y2="82" stroke="${a}" stroke-width="1.5" opacity="0.7"/>
      <line x1="80" y1="78" x2="110" y2="74" stroke="${a}" stroke-width="1.5" opacity="0.7"/>
      <line x1="80" y1="79" x2="110" y2="82" stroke="${a}" stroke-width="1.5" opacity="0.7"/>
      <!-- Tail -->
      <path d="M120,120 Q148,100 145,75 Q142,60 132,65" stroke="${a}" stroke-width="8" fill="none" stroke-linecap="round"/>`,
    highlights: (bg) => `
      <ellipse cx="70" cy="64" rx="2.5" ry="3" fill="white" opacity="0.6"/>
      <ellipse cx="86" cy="64" rx="2.5" ry="3" fill="white" opacity="0.6"/>`
  },
  Dog: {
    bg: (m,a) => `
      <ellipse cx="80" cy="100" rx="55" ry="40" fill="${m}" opacity="0.3" filter="url(#blur-Dog)"/>
      <ellipse cx="80" cy="70" rx="35" ry="32" fill="${m}" opacity="0.2" filter="url(#blur-Dog)"/>`,
    body: (m,a) => `
      <ellipse cx="80" cy="105" rx="46" ry="34" fill="${m}"/>
      <ellipse cx="80" cy="72" rx="32" ry="28" fill="${m}"/>
      <!-- Floppy ears -->
      <ellipse cx="52" cy="72" rx="16" ry="28" fill="${a}" transform="rotate(-12 52 72)"/>
      <ellipse cx="108" cy="72" rx="16" ry="28" fill="${a}" transform="rotate(12 108 72)"/>
      <!-- Eyes -->
      <ellipse cx="70" cy="68" rx="9" ry="9" fill="${lighten(a,20)}" opacity="0.9"/>
      <ellipse cx="90" cy="68" rx="9" ry="9" fill="${lighten(a,20)}" opacity="0.9"/>
      <ellipse cx="70" cy="69" rx="5" ry="6" fill="#100800"/>
      <ellipse cx="90" cy="69" rx="5" ry="6" fill="#100800"/>
      <!-- Snout -->
      <ellipse cx="80" cy="80" rx="16" ry="11" fill="${lighten(m,35)}"/>
      <ellipse cx="80" cy="76" rx="5" ry="4" fill="${a}"/>
      <!-- Tongue -->
      <ellipse cx="80" cy="87" rx="7" ry="6" fill="#e86878"/>
      <!-- Tail -->
      <path d="M126,110 Q150,88 146,68" stroke="${m}" stroke-width="10" fill="none" stroke-linecap="round"/>`,
    highlights: (bg) => `
      <ellipse cx="67" cy="65" rx="3" ry="3.5" fill="white" opacity="0.55"/>
      <ellipse cx="87" cy="65" rx="3" ry="3.5" fill="white" opacity="0.55"/>`
  },
  Cow: {
    bg: (m,a,bg) => `
      <ellipse cx="80" cy="105" rx="58" ry="38" fill="${m}" opacity="0.25" filter="url(#blur-Cow)"/>`,
    body: (m,a,bg) => `
      <ellipse cx="80" cy="108" rx="52" ry="32" fill="white"/>
      <!-- Patches -->
      <ellipse cx="60" cy="100" rx="20" ry="16" fill="${a}" opacity="0.85"/>
      <ellipse cx="100" cy="115" rx="18" ry="14" fill="${a}" opacity="0.75"/>
      <ellipse cx="80" cy="115" rx="52" ry="32" fill="none" stroke="${m}" stroke-width="1.5" opacity="0.3"/>
      <!-- Head -->
      <ellipse cx="80" cy="68" rx="28" ry="25" fill="white"/>
      <ellipse cx="60" cy="62" rx="12" ry="14" fill="${a}" opacity="0.8"/>
      <!-- Ears -->
      <ellipse cx="52" cy="50" rx="10" ry="14" fill="white" transform="rotate(-20 52 50)"/>
      <ellipse cx="108" cy="50" rx="10" ry="14" fill="white" transform="rotate(20 108 50)"/>
      <ellipse cx="52" cy="51" rx="6" ry="9" fill="#e8a0a0" transform="rotate(-20 52 51)"/>
      <ellipse cx="108" cy="51" rx="6" ry="9" fill="#e8a0a0" transform="rotate(20 108 51)"/>
      <!-- Horns -->
      <path d="M56,44 Q42,24 50,18" stroke="${m}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M104,44 Q118,24 110,18" stroke="${m}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Eyes -->
      <ellipse cx="70" cy="66" rx="8" ry="8" fill="${a}"/>
      <ellipse cx="90" cy="66" rx="8" ry="8" fill="${a}"/>
      <ellipse cx="70" cy="67" rx="4.5" ry="5" fill="#080400"/>
      <ellipse cx="90" cy="67" rx="4.5" ry="5" fill="#080400"/>
      <!-- Snout -->
      <ellipse cx="80" cy="80" rx="17" ry="12" fill="#e8c0b0"/>
      <ellipse cx="74" cy="82" rx="4" ry="3" fill="${a}" opacity="0.7"/>
      <ellipse cx="86" cy="82" rx="4" ry="3" fill="${a}" opacity="0.7"/>`,
    highlights: (bg) => `
      <ellipse cx="67" cy="63" rx="2.5" ry="3" fill="white" opacity="0.7"/>
      <ellipse cx="87" cy="63" rx="2.5" ry="3" fill="white" opacity="0.7"/>`
  },
  Duck: {
    bg: (m,a) => `
      <ellipse cx="80" cy="108" rx="50" ry="32" fill="${m}" opacity="0.3" filter="url(#blur-Duck)"/>
      <ellipse cx="80" cy="72" rx="28" ry="24" fill="${a}" opacity="0.2" filter="url(#blur-Duck)"/>`,
    body: (m,a) => `
      <!-- Body -->
      <ellipse cx="80" cy="108" rx="44" ry="28" fill="white"/>
      <ellipse cx="85" cy="108" rx="44" ry="28" fill="${m}" opacity="0.4"/>
      <!-- Wing detail -->
      <path d="M42,108 Q60,90 100,100 Q118,106 124,115" fill="${lighten(m,20)}" opacity="0.6"/>
      <!-- Head (green) -->
      <ellipse cx="80" cy="70" rx="25" ry="22" fill="#2a7a38"/>
      <!-- White collar ring -->
      <ellipse cx="80" cy="90" rx="18" ry="6" fill="white" opacity="0.9"/>
      <!-- Bill -->
      <ellipse cx="80" cy="80" rx="18" ry="7" fill="${a}" transform="rotate(-5 80 80)"/>
      <!-- Eyes -->
      <ellipse cx="68" cy="65" rx="7" ry="7" fill="white"/>
      <ellipse cx="92" cy="65" rx="7" ry="7" fill="white"/>
      <ellipse cx="68" cy="66" rx="4" ry="4.5" fill="#0a0800"/>
      <ellipse cx="92" cy="66" rx="4" ry="4.5" fill="#0a0800"/>
      <!-- Tail feathers -->
      <path d="M34,102 Q20,88 30,75" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.8"/>
      <path d="M32,108 Q14,96 22,82" stroke="${lighten(m,20)}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.6"/>`,
    highlights: (bg) => `
      <ellipse cx="65" cy="62" rx="2.5" ry="2.5" fill="white" opacity="0.6"/>
      <ellipse cx="89" cy="62" rx="2.5" ry="2.5" fill="white" opacity="0.6"/>`
  },
  Frog: {
    bg: (m,a) => `
      <ellipse cx="80" cy="105" rx="52" ry="36" fill="${m}" opacity="0.3" filter="url(#blur-Frog)"/>
      <ellipse cx="52" cy="115" rx="20" ry="12" fill="${a}" opacity="0.25" filter="url(#blur-Frog)"/>
      <ellipse cx="108" cy="115" rx="20" ry="12" fill="${a}" opacity="0.25" filter="url(#blur-Frog)"/>`,
    body: (m,a) => `
      <!-- Body -->
      <ellipse cx="80" cy="105" rx="44" ry="30" fill="${m}"/>
      <!-- Belly -->
      <ellipse cx="80" cy="108" rx="30" ry="20" fill="${lighten(m,40)}" opacity="0.7"/>
      <!-- Head -->
      <ellipse cx="80" cy="72" rx="32" ry="24" fill="${m}"/>
      <!-- Big bulgy eyes on top -->
      <ellipse cx="62" cy="52" rx="16" ry="16" fill="${m}"/>
      <ellipse cx="98" cy="52" rx="16" ry="16" fill="${m}"/>
      <ellipse cx="62" cy="52" rx="11" ry="11" fill="${lighten(a,20)}" opacity="0.9"/>
      <ellipse cx="98" cy="52" rx="11" ry="11" fill="${lighten(a,20)}" opacity="0.9"/>
      <ellipse cx="62" cy="53" rx="6" ry="7" fill="#080c00"/>
      <ellipse cx="98" cy="53" rx="6" ry="7" fill="#080c00"/>
      <!-- Smile line -->
      <path d="M58,82 Q80,94 102,82" stroke="${a}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Feet -->
      <path d="M36,130 Q24,125 20,138 Q28,148 38,140" fill="${m}" opacity="0.8"/>
      <path d="M124,130 Q136,125 140,138 Q132,148 122,140" fill="${m}" opacity="0.8"/>`,
    highlights: (bg) => `
      <ellipse cx="58" cy="49" rx="3.5" ry="4" fill="white" opacity="0.55"/>
      <ellipse cx="94" cy="49" rx="3.5" ry="4" fill="white" opacity="0.55"/>`
  },
  Horse: {
    bg: (m,a) => `
      <ellipse cx="80" cy="108" rx="55" ry="34" fill="${m}" opacity="0.28" filter="url(#blur-Horse)"/>
      <ellipse cx="80" cy="68" rx="28" ry="36" fill="${a}" opacity="0.15" filter="url(#blur-Horse)"/>`,
    body: (m,a) => `
      <!-- Body -->
      <ellipse cx="80" cy="110" rx="50" ry="30" fill="${m}"/>
      <!-- Neck -->
      <path d="M80,84 Q68,75 64,52 Q68,38 78,35 Q88,38 92,52 Q90,72 80,84" fill="${m}"/>
      <!-- Mane -->
      <path d="M64,52 Q56,48 52,38 Q60,34 68,40" fill="${a}"/>
      <path d="M68,45 Q62,40 58,30 Q66,27 72,35" fill="${a}" opacity="0.8"/>
      <path d="M72,38 Q68,32 66,22 Q74,20 78,30" fill="${a}" opacity="0.6"/>
      <!-- Head -->
      <ellipse cx="80" cy="50" rx="22" ry="18" fill="${m}"/>
      <!-- Snout -->
      <ellipse cx="80" cy="62" rx="16" ry="10" fill="${lighten(m,25)}"/>
      <!-- Nostril -->
      <ellipse cx="74" cy="63" rx="3.5" ry="2.5" fill="${a}" opacity="0.7"/>
      <ellipse cx="86" cy="63" rx="3.5" ry="2.5" fill="${a}" opacity="0.7"/>
      <!-- Eyes -->
      <ellipse cx="68" cy="46" rx="8" ry="7" fill="${a}"/>
      <ellipse cx="92" cy="46" rx="8" ry="7" fill="${a}"/>
      <ellipse cx="68" cy="47" rx="4.5" ry="5" fill="#0c0600"/>
      <ellipse cx="92" cy="47" rx="4.5" ry="5" fill="#0c0600"/>
      <!-- Ears -->
      <polygon points="64,34 58,16 72,28" fill="${m}"/>
      <polygon points="96,34 102,16 88,28" fill="${m}"/>
      <!-- Tail -->
      <path d="M130,108 Q152,90 148,65 Q146,50 138,55" stroke="${a}" stroke-width="9" fill="none" stroke-linecap="round"/>`,
    highlights: (bg) => `
      <ellipse cx="65" cy="43" rx="2.5" ry="3" fill="white" opacity="0.55"/>
      <ellipse cx="89" cy="43" rx="2.5" ry="3" fill="white" opacity="0.55"/>`
  },
  Lion: {
    bg: (m,a) => `
      <!-- Mane glow -->
      <ellipse cx="80" cy="80" rx="60" ry="58" fill="${a}" opacity="0.22" filter="url(#blur-Lion)"/>`,
    body: (m,a) => `
      <!-- Mane (behind head) -->
      <ellipse cx="80" cy="78" rx="52" ry="50" fill="${a}"/>
      <!-- Mane texture strokes -->
      <ellipse cx="80" cy="78" rx="48" ry="46" fill="${lighten(a,-10)}" opacity="0.6"/>
      <!-- Body -->
      <ellipse cx="80" cy="116" rx="42" ry="26" fill="${m}"/>
      <!-- Head on top of mane -->
      <ellipse cx="80" cy="72" rx="32" ry="29" fill="${m}"/>
      <!-- Snout -->
      <ellipse cx="80" cy="82" rx="20" ry="14" fill="${lighten(m,30)}"/>
      <!-- Nose -->
      <path d="M75,78 L80,84 L85,78 Q80,76 75,78" fill="${a}"/>
      <!-- Eyes -->
      <ellipse cx="68" cy="66" rx="10" ry="9" fill="${lighten(a,30)}" opacity="0.95"/>
      <ellipse cx="92" cy="66" rx="10" ry="9" fill="${lighten(a,30)}" opacity="0.95"/>
      <ellipse cx="68" cy="67" rx="5.5" ry="6" fill="#0a0600"/>
      <ellipse cx="92" cy="67" rx="5.5" ry="6" fill="#0a0600"/>
      <!-- Ears -->
      <ellipse cx="56" cy="46" rx="10" ry="10" fill="${m}"/>
      <ellipse cx="104" cy="46" rx="10" ry="10" fill="${m}"/>
      <!-- Whisker dots -->
      <circle cx="66" cy="84" r="2" fill="${a}" opacity="0.7"/>
      <circle cx="72" cy="87" r="2" fill="${a}" opacity="0.7"/>
      <circle cx="88" cy="87" r="2" fill="${a}" opacity="0.7"/>
      <circle cx="94" cy="84" r="2" fill="${a}" opacity="0.7"/>
      <!-- Tail -->
      <path d="M122,118 Q148,104 146,80" stroke="${m}" stroke-width="8" fill="none" stroke-linecap="round"/>
      <ellipse cx="147" cy="74" rx="8" ry="8" fill="${a}"/>`,
    highlights: (bg) => `
      <ellipse cx="64" cy="63" rx="3" ry="3.5" fill="white" opacity="0.5"/>
      <ellipse cx="88" cy="63" rx="3" ry="3.5" fill="white" opacity="0.5"/>`
  },
  Elephant: {
    bg: (m,a) => `
      <ellipse cx="80" cy="108" rx="58" ry="36" fill="${m}" opacity="0.28" filter="url(#blur-Elephant)"/>
      <ellipse cx="80" cy="68" rx="40" ry="36" fill="${m}" opacity="0.18" filter="url(#blur-Elephant)"/>`,
    body: (m,a) => `
      <!-- Body -->
      <ellipse cx="80" cy="112" rx="52" ry="32" fill="${m}"/>
      <!-- Head -->
      <ellipse cx="80" cy="70" rx="40" ry="34" fill="${m}"/>
      <!-- Big ears -->
      <ellipse cx="36" cy="68" rx="26" ry="34" fill="${lighten(m,10)}" opacity="0.9"/>
      <ellipse cx="36" cy="68" rx="18" ry="26" fill="#e8a090" opacity="0.4"/>
      <ellipse cx="124" cy="68" rx="26" ry="34" fill="${lighten(m,10)}" opacity="0.9"/>
      <ellipse cx="124" cy="68" rx="18" ry="26" fill="#e8a090" opacity="0.4"/>
      <!-- Eyes -->
      <ellipse cx="66" cy="60" rx="8" ry="8" fill="white"/>
      <ellipse cx="94" cy="60" rx="8" ry="8" fill="white"/>
      <ellipse cx="66" cy="61" rx="5" ry="5.5" fill="#0a0a0e"/>
      <ellipse cx="94" cy="61" rx="5" ry="5.5" fill="#0a0a0e"/>
      <!-- Trunk -->
      <path d="M62,86 Q55,100 54,116 Q53,126 60,132 Q66,138 68,128 Q66,118 68,106 Q72,94 80,88" stroke="${a}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M62,86 Q55,100 54,116 Q53,126 60,132 Q66,138 68,128 Q66,118 68,106 Q72,94 80,88" stroke="${lighten(m,15)}" stroke-width="10" fill="none" stroke-linecap="round"/>
      <!-- Tusks -->
      <path d="M70,90 Q58,98 52,108" stroke="${lighten(a,60)}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M90,90 Q102,98 108,108" stroke="${lighten(a,60)}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    highlights: (bg) => `
      <ellipse cx="63" cy="57" rx="2.5" ry="3" fill="white" opacity="0.65"/>
      <ellipse cx="91" cy="57" rx="2.5" ry="3" fill="white" opacity="0.65"/>`
  },
  Sheep: {
    bg: (m,a) => `
      <ellipse cx="80" cy="95" rx="58" ry="48" fill="${m}" opacity="0.25" filter="url(#blur-Sheep)"/>`,
    body: (m,a) => `
      <!-- Fluffy body (many overlapping circles = wool) -->
      <ellipse cx="80" cy="108" rx="50" ry="32" fill="${m}"/>
      <ellipse cx="55" cy="100" rx="28" ry="24" fill="${m}"/>
      <ellipse cx="105" cy="100" rx="28" ry="24" fill="${m}"/>
      <ellipse cx="80" cy="90" rx="34" ry="28" fill="${m}"/>
      <ellipse cx="58" cy="88" rx="22" ry="20" fill="${m}"/>
      <ellipse cx="102" cy="88" rx="22" ry="20" fill="${m}"/>
      <!-- Wool texture rings -->
      <ellipse cx="64" cy="96" rx="18" ry="16" fill="none" stroke="${lighten(m,-15)}" stroke-width="2" opacity="0.5"/>
      <ellipse cx="96" cy="96" rx="18" ry="16" fill="none" stroke="${lighten(m,-15)}" stroke-width="2" opacity="0.5"/>
      <ellipse cx="80" cy="86" rx="24" ry="20" fill="none" stroke="${lighten(m,-15)}" stroke-width="2" opacity="0.5"/>
      <!-- Head (dark face) -->
      <ellipse cx="80" cy="63" rx="20" ry="18" fill="${a}"/>
      <!-- Ears -->
      <ellipse cx="60" cy="63" rx="8" ry="14" fill="${a}" transform="rotate(-15 60 63)"/>
      <ellipse cx="100" cy="63" rx="8" ry="14" fill="${a}" transform="rotate(15 100 63)"/>
      <ellipse cx="60" cy="64" rx="4" ry="9" fill="#e8a0a0" opacity="0.5" transform="rotate(-15 60 64)"/>
      <ellipse cx="100" cy="64" rx="4" ry="9" fill="#e8a0a0" opacity="0.5" transform="rotate(15 100 64)"/>
      <!-- Eyes -->
      <ellipse cx="73" cy="59" rx="5.5" ry="5.5" fill="${lighten(a,40)}" opacity="0.9"/>
      <ellipse cx="87" cy="59" rx="5.5" ry="5.5" fill="${lighten(a,40)}" opacity="0.9"/>
      <ellipse cx="73" cy="60" rx="3" ry="4" fill="#0a0608"/>
      <ellipse cx="87" cy="60" rx="3" ry="4" fill="#0a0608"/>
      <!-- Snout -->
      <ellipse cx="80" cy="70" rx="10" ry="7" fill="${lighten(a,25)}"/>
      <ellipse cx="76" cy="72" rx="2.5" ry="2" fill="${a}" opacity="0.8"/>
      <ellipse cx="84" cy="72" rx="2.5" ry="2" fill="${a}" opacity="0.8"/>`,
    highlights: (bg) => `
      <ellipse cx="71" cy="56" rx="2" ry="2.5" fill="white" opacity="0.6"/>
      <ellipse cx="85" cy="56" rx="2" ry="2.5" fill="white" opacity="0.6"/>`
  },
  Bird: {
    bg: (m,a) => `
      <ellipse cx="80" cy="95" rx="48" ry="38" fill="${m}" opacity="0.3" filter="url(#blur-Bird)"/>
      <ellipse cx="80" cy="65" rx="25" ry="22" fill="${a}" opacity="0.2" filter="url(#blur-Bird)"/>`,
    body: (m,a) => `
      <!-- Body -->
      <ellipse cx="80" cy="100" rx="38" ry="28" fill="${m}"/>
      <!-- Wing left -->
      <path d="M42,95 Q28,78 36,55 Q52,70 62,90" fill="${lighten(m,-10)}"/>
      <!-- Wing right -->
      <path d="M118,95 Q132,78 124,55 Q108,70 98,90" fill="${lighten(m,-10)}"/>
      <!-- Tail feathers -->
      <path d="M58,124 Q48,140 52,150" stroke="${a}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M68,128 Q62,146 64,156" stroke="${m}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M80,130 Q78,148 80,158" stroke="${a}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M92,128 Q98,146 96,156" stroke="${m}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M102,124 Q112,140 108,150" stroke="${a}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Head -->
      <ellipse cx="80" cy="66" rx="22" ry="20" fill="${a}"/>
      <!-- Crest -->
      <path d="M74,46 Q78,28 84,22 Q88,30 82,46" fill="${m}" opacity="0.9"/>
      <!-- Eyes -->
      <ellipse cx="71" cy="63" rx="7.5" ry="7.5" fill="white"/>
      <ellipse cx="89" cy="63" rx="7.5" ry="7.5" fill="white"/>
      <ellipse cx="71" cy="64" rx="4.5" ry="5" fill="#0a0800"/>
      <ellipse cx="89" cy="64" rx="4.5" ry="5" fill="#0a0800"/>
      <!-- Beak -->
      <path d="M72,72 L80,78 L88,72 Q80,68 72,72" fill="${lighten(a,30)}"/>`,
    highlights: (bg) => `
      <ellipse cx="68" cy="60" rx="2.5" ry="3" fill="white" opacity="0.6"/>
      <ellipse cx="86" cy="60" rx="2.5" ry="3" fill="white" opacity="0.6"/>`
  },
  Bee: {
    bg: (m,a) => `
      <ellipse cx="80" cy="90" rx="44" ry="34" fill="${m}" opacity="0.3" filter="url(#blur-Bee)"/>`,
    body: (m,a) => `
      <!-- Wings (semi-transparent) -->
      <ellipse cx="52" cy="68" rx="28" ry="16" fill="white" opacity="0.45" transform="rotate(-20 52 68)"/>
      <ellipse cx="108" cy="68" rx="28" ry="16" fill="white" opacity="0.45" transform="rotate(20 108 68)"/>
      <ellipse cx="48" cy="80" rx="20" ry="12" fill="white" opacity="0.3" transform="rotate(-15 48 80)"/>
      <ellipse cx="112" cy="80" rx="20" ry="12" fill="white" opacity="0.3" transform="rotate(15 112 80)"/>
      <!-- Abdomen with stripes -->
      <ellipse cx="80" cy="105" rx="28" ry="22" fill="${m}"/>
      <ellipse cx="80" cy="100" rx="26" ry="7" fill="${a}" opacity="0.85"/>
      <ellipse cx="80" cy="112" rx="24" ry="7" fill="${a}" opacity="0.85"/>
      <ellipse cx="80" cy="123" rx="18" ry="6" fill="${a}" opacity="0.7"/>
      <!-- Thorax -->
      <ellipse cx="80" cy="82" rx="18" ry="14" fill="${a}"/>
      <!-- Head -->
      <ellipse cx="80" cy="64" rx="15" ry="14" fill="${a}"/>
      <!-- Eyes (compound) -->
      <ellipse cx="70" cy="60" rx="8" ry="9" fill="#1a3a00" opacity="0.9"/>
      <ellipse cx="90" cy="60" rx="8" ry="9" fill="#1a3a00" opacity="0.9"/>
      <!-- Antennae -->
      <line x1="74" y1="51" x2="60" y2="30" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="86" y1="51" x2="100" y2="30" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="60" cy="29" r="4" fill="${a}"/>
      <circle cx="100" cy="29" r="4" fill="${a}"/>
      <!-- Stinger -->
      <path d="M80,127 Q80,138 82,143" stroke="${a}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    highlights: (bg) => `
      <ellipse cx="67" cy="57" rx="3" ry="4" fill="white" opacity="0.4"/>
      <ellipse cx="87" cy="57" rx="3" ry="4" fill="white" opacity="0.4"/>`
  },
  Sparrow: {
    bg: (m,a) => `
      <ellipse cx="80" cy="98" rx="46" ry="34" fill="${m}" opacity="0.28" filter="url(#blur-Sparrow)"/>
      <ellipse cx="80" cy="65" rx="24" ry="20" fill="${a}" opacity="0.2" filter="url(#blur-Sparrow)"/>`,
    body: (m,a) => `
      <!-- Body -->
      <ellipse cx="80" cy="100" rx="36" ry="26" fill="${m}"/>
      <!-- Wing streaks -->
      <path d="M48,92 Q40,76 50,58 Q62,72 68,90" fill="${lighten(a,-10)}"/>
      <path d="M112,92 Q120,76 110,58 Q98,72 92,90" fill="${lighten(a,-10)}"/>
      <!-- Wing bar detail -->
      <path d="M50,78 Q62,74 68,82" stroke="${lighten(m,30)}" stroke-width="2.5" fill="none" opacity="0.7"/>
      <path d="M110,78 Q98,74 92,82" stroke="${lighten(m,30)}" stroke-width="2.5" fill="none" opacity="0.7"/>
      <!-- Tail -->
      <path d="M62,122 Q54,138 56,148" stroke="${a}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M72,126 Q68,142 68,152" stroke="${m}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M80,128 Q78,144 80,154" stroke="${a}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M88,126 Q92,142 92,152" stroke="${m}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M98,122 Q106,138 104,148" stroke="${a}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Belly (lighter) -->
      <ellipse cx="80" cy="104" rx="22" ry="16" fill="${lighten(m,35)}" opacity="0.7"/>
      <!-- Head (darker cap) -->
      <ellipse cx="80" cy="66" rx="20" ry="18" fill="${a}"/>
      <!-- Eye stripe -->
      <path d="M62,64 Q72,60 88,62" stroke="${lighten(a,-20)}" stroke-width="3.5" fill="none" opacity="0.6"/>
      <!-- Eyes -->
      <ellipse cx="71" cy="63" rx="6" ry="6" fill="white"/>
      <ellipse cx="89" cy="63" rx="6" ry="6" fill="white"/>
      <ellipse cx="71" cy="64" rx="3.5" ry="4" fill="#0c0600"/>
      <ellipse cx="89" cy="64" rx="3.5" ry="4" fill="#0c0600"/>
      <!-- Stubby beak -->
      <path d="M74,73 L80,80 L86,73 Q80,69 74,73" fill="${lighten(a,25)}"/>`,
    highlights: (bg) => `
      <ellipse cx="68" cy="60" rx="2" ry="2.5" fill="white" opacity="0.6"/>
      <ellipse cx="86" cy="60" rx="2" ry="2.5" fill="white" opacity="0.6"/>`
  },
  Caterpillar: {
    bg: (m,a) => `
      <ellipse cx="80" cy="100" rx="62" ry="28" fill="${m}" opacity="0.28" filter="url(#blur-Caterpillar)"/>`,
    body: (m,a) => `
      <!-- Segments (overlapping ellipses along horizontal curve) -->
      <ellipse cx="118" cy="100" rx="16" ry="18" fill="${lighten(m,-8)}"/>
      <ellipse cx="100" cy="96" rx="17" ry="19" fill="${m}"/>
      <ellipse cx="81"  cy="93" rx="17" ry="19" fill="${lighten(m,8)}"/>
      <ellipse cx="62"  cy="96" rx="17" ry="19" fill="${m}"/>
      <ellipse cx="44"  cy="100" rx="16" ry="18" fill="${lighten(m,-8)}"/>
      <!-- Segment ridges -->
      <line x1="91" y1="75" x2="91" y2="111" stroke="${a}" stroke-width="1.5" opacity="0.4"/>
      <line x1="72" y1="78" x2="72" y2="113" stroke="${a}" stroke-width="1.5" opacity="0.4"/>
      <line x1="110" y1="82" x2="110" y2="116" stroke="${a}" stroke-width="1.5" opacity="0.4"/>
      <!-- Legs -->
      <line x1="100" y1="114" x2="95" y2="130" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="80"  y1="112" x2="76" y2="128" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="62"  y1="114" x2="58" y2="130" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="100" y1="114" x2="105" y2="130" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="80"  y1="112" x2="84" y2="128" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="62"  y1="114" x2="66" y2="130" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Head -->
      <ellipse cx="30" cy="100" rx="20" ry="22" fill="${lighten(m,10)}"/>
      <!-- Eyes -->
      <ellipse cx="23" cy="90" rx="7" ry="7" fill="white"/>
      <ellipse cx="37" cy="90" rx="7" ry="7" fill="white"/>
      <ellipse cx="23" cy="91" rx="4" ry="4.5" fill="#0a1200"/>
      <ellipse cx="37" cy="91" rx="4" ry="4.5" fill="#0a1200"/>
      <!-- Antennae -->
      <line x1="22" y1="84" x2="12" y2="64" stroke="${a}" stroke-width="2" stroke-linecap="round"/>
      <line x1="36" y1="82" x2="38" y2="60" stroke="${a}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="62" r="3.5" fill="${a}"/>
      <circle cx="38" cy="58" r="3.5" fill="${a}"/>
      <!-- Smile -->
      <path d="M20,104 Q30,112 40,104" stroke="${a}" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    highlights: (bg) => `
      <ellipse cx="21" cy="87" rx="2" ry="2.5" fill="white" opacity="0.6"/>
      <ellipse cx="35" cy="87" rx="2" ry="2.5" fill="white" opacity="0.6"/>`
  },
  Dragonfly: {
    bg: (m,a) => `
      <ellipse cx="80" cy="80" rx="65" ry="44" fill="${m}" opacity="0.22" filter="url(#blur-Dragonfly)"/>`,
    body: (m,a) => `
      <!-- Upper wings -->
      <ellipse cx="38" cy="70" rx="38" ry="16" fill="${m}" opacity="0.55" transform="rotate(-12 38 70)"/>
      <ellipse cx="122" cy="70" rx="38" ry="16" fill="${m}" opacity="0.55" transform="rotate(12 122 70)"/>
      <!-- Lower wings -->
      <ellipse cx="42" cy="84" rx="30" ry="12" fill="${m}" opacity="0.4" transform="rotate(8 42 84)"/>
      <ellipse cx="118" cy="84" rx="30" ry="12" fill="${m}" opacity="0.4" transform="rotate(-8 118 84)"/>
      <!-- Wing venation lines -->
      <line x1="52" y1="66" x2="18" y2="62" stroke="white" stroke-width="1" opacity="0.5"/>
      <line x1="108" y1="66" x2="142" y2="62" stroke="white" stroke-width="1" opacity="0.5"/>
      <!-- Abdomen (long segmented tail) -->
      <rect x="76" y="72" width="8" height="80" rx="4" fill="${a}"/>
      <line x1="80" y1="84" x2="80" y2="84" stroke="white" stroke-width="6" stroke-dasharray="6 4" opacity="0.5"/>
      <!-- Thorax -->
      <ellipse cx="80" cy="80" rx="14" ry="12" fill="${a}"/>
      <!-- Head (huge compound eyes) -->
      <ellipse cx="80" cy="62" rx="18" ry="15" fill="${a}"/>
      <ellipse cx="65" cy="60" rx="14" ry="14" fill="${m}" opacity="0.9"/>
      <ellipse cx="95" cy="60" rx="14" ry="14" fill="${m}" opacity="0.9"/>
      <ellipse cx="65" cy="60" rx="9" ry="10" fill="${lighten(a,-10)}"/>
      <ellipse cx="95" cy="60" rx="9" ry="10" fill="${lighten(a,-10)}"/>
      <!-- Iridescent eye facets -->
      <circle cx="62" cy="57" r="3" fill="white" opacity="0.25"/>
      <circle cx="92" cy="57" r="3" fill="white" opacity="0.25"/>`,
    highlights: (bg) => `
      <ellipse cx="61" cy="55" rx="3.5" ry="4" fill="white" opacity="0.45"/>
      <ellipse cx="91" cy="55" rx="3.5" ry="4" fill="white" opacity="0.45"/>`
  },
  Hawk: {
    bg: (m,a) => `
      <ellipse cx="80" cy="90" rx="58" ry="44" fill="${m}" opacity="0.26" filter="url(#blur-Hawk)"/>`,
    body: (m,a) => `
      <!-- Soaring wings -->
      <path d="M16,80 Q28,62 52,74 Q66,80 80,76 Q94,80 108,74 Q132,62 144,80 Q128,90 108,84 Q94,88 80,86 Q66,88 52,84 Q32,90 16,80" fill="${m}"/>
      <!-- Wing primary feathers left -->
      <path d="M16,80 Q20,90 28,96" stroke="${a}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M22,77 Q26,88 34,94" stroke="${a}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M30,74 Q34,84 42,90" stroke="${a}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Wing primary feathers right -->
      <path d="M144,80 Q140,90 132,96" stroke="${a}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M138,77 Q134,88 126,94" stroke="${a}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M130,74 Q126,84 118,90" stroke="${a}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Body -->
      <ellipse cx="80" cy="100" rx="20" ry="28" fill="${m}"/>
      <!-- Breast barring -->
      <path d="M66,94 Q80,90 94,94" stroke="${lighten(a,-15)}" stroke-width="2" fill="none" opacity="0.5"/>
      <path d="M64,100 Q80,96 96,100" stroke="${lighten(a,-15)}" stroke-width="2" fill="none" opacity="0.5"/>
      <path d="M66,106 Q80,102 94,106" stroke="${lighten(a,-15)}" stroke-width="2" fill="none" opacity="0.5"/>
      <!-- Tail -->
      <path d="M68,126 Q72,142 70,150" stroke="${a}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M76,128 Q78,144 78,154" stroke="${m}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M80,128 Q82,144 82,154" stroke="${a}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M84,128 Q86,144 86,154" stroke="${m}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M92,126 Q88,142 90,150" stroke="${a}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Head -->
      <ellipse cx="80" cy="66" rx="16" ry="15" fill="${a}"/>
      <!-- Eye with fierce ring -->
      <ellipse cx="73" cy="63" rx="7" ry="6.5" fill="${lighten(m,30)}" opacity="0.9"/>
      <ellipse cx="87" cy="63" rx="7" ry="6.5" fill="${lighten(m,30)}" opacity="0.9"/>
      <ellipse cx="73" cy="64" rx="4" ry="4.5" fill="#080400"/>
      <ellipse cx="87" cy="64" rx="4" ry="4.5" fill="#080400"/>
      <!-- Hooked beak -->
      <path d="M74,72 Q80,76 86,72 Q84,80 80,83 Q76,80 74,72" fill="${lighten(a,30)}"/>`,
    highlights: (bg) => `
      <ellipse cx="70" cy="60" rx="2.5" ry="3" fill="white" opacity="0.6"/>
      <ellipse cx="84" cy="60" rx="2.5" ry="3" fill="white" opacity="0.6"/>`
  },
  BlackPhoebe: {
    bg: (m,a) => `
      <ellipse cx="80" cy="98" rx="42" ry="34" fill="${a}" opacity="0.28" filter="url(#blur-BlackPhoebe)"/>
      <ellipse cx="80" cy="65" rx="22" ry="20" fill="${m}" opacity="0.15" filter="url(#blur-BlackPhoebe)"/>`,
    body: (m,a,bg) => `
      <!-- Body black back/wings -->
      <ellipse cx="80" cy="100" rx="34" ry="26" fill="${m}"/>
      <!-- White belly -->
      <ellipse cx="82" cy="106" rx="20" ry="18" fill="white"/>
      <!-- Wing detail -->
      <path d="M46,92 Q38,76 46,56 Q60,70 66,90" fill="${lighten(m,15)}"/>
      <path d="M114,92 Q122,76 114,56 Q100,70 94,90" fill="${lighten(m,15)}"/>
      <!-- Wing bar (white) -->
      <path d="M50,76 Q62,72 66,80" stroke="${lighten(bg,20)}" stroke-width="2.5" fill="none" opacity="0.65"/>
      <path d="M110,76 Q98,72 94,80" stroke="${lighten(bg,20)}" stroke-width="2.5" fill="none" opacity="0.65"/>
      <!-- Tail (long, black) -->
      <path d="M64,122 Q58,140 60,152" stroke="${m}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M74,126 Q70,144 70,154" stroke="${m}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M80,128 Q80,146 80,156" stroke="${m}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M86,126 Q90,144 90,154" stroke="${m}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M96,122 Q102,140 100,152" stroke="${m}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Head (jet black) -->
      <ellipse cx="80" cy="64" rx="20" ry="19" fill="${m}"/>
      <!-- Eyes -->
      <ellipse cx="71" cy="60" rx="6.5" ry="6.5" fill="${a}" opacity="0.9"/>
      <ellipse cx="89" cy="60" rx="6.5" ry="6.5" fill="${a}" opacity="0.9"/>
      <ellipse cx="71" cy="61" rx="3.5" ry="4" fill="#06060e"/>
      <ellipse cx="89" cy="61" rx="3.5" ry="4" fill="#06060e"/>
      <!-- Small flat beak -->
      <path d="M75,71 L80,77 L85,71 Q80,67 75,71" fill="${a}"/>`,
    highlights: (bg) => `
      <ellipse cx="68" cy="57" rx="2" ry="2.5" fill="white" opacity="0.55"/>
      <ellipse cx="86" cy="57" rx="2" ry="2.5" fill="white" opacity="0.55"/>`
  },
  default: {
    bg: (m) => `<ellipse cx="80" cy="80" rx="60" ry="60" fill="${m}" opacity="0.3"/>`,
    body: (m,a) => `<ellipse cx="80" cy="80" rx="44" ry="44" fill="${m}"/>
      <ellipse cx="70" cy="72" rx="7" ry="7" fill="${a}"/>
      <ellipse cx="90" cy="72" rx="7" ry="7" fill="${a}"/>
      <path d="M65,92 Q80,100 95,92" stroke="${a}" stroke-width="3" fill="none"/>`,
    highlights: () => ``
  }
};

// ─── Real Animal Sound Recordings ─────────────────────────────────────────────
// Sources: Wikimedia Commons (public domain / CC licensed)
// URL path = upload.wikimedia.org/wikipedia/commons/[md5[0]]/[md5[0:2]]/[filename]
const RECORDINGS = {
  Cat:         { url: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Meow.ogg',                                                                                  duration: 4 },
  Dog:         { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Barking_of_a_dog.ogg',                                                                      duration: 4 },
  Cow:         { url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Mudchute_cow_1.ogg',                                                                        duration: 4 },
  Duck:        { url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Anas_platyrhynchos_-_Mallard_-_XC62258.ogg',                                               duration: 4 },
  Frog:        { url: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/PigFrog_EvergladesNP.ogg',                                                                  duration: 3 },
  Horse:       { url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Horse-neigh.ogg',                                                                           duration: 4 },
  Lion:        { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Lion_raring-sound1TamilNadu178.ogg',                                                        duration: 5 },
  Elephant:    { url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Elephant_voice_-_trumpeting.ogg',                                                           duration: 4 },
  Sheep:       { url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Sheep_bleating.ogg',                                                                        duration: 4 },
  Bird:        { url: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Bird_singing.ogg',                                                                          duration: 4 },
  Bee:         { url: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Hummel_bee.ogg',                                                                            duration: 3 },
  Sparrow:     { url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/House_Sparrows_(Passer_domesticus)_(W1CDR0001537_BD13).ogg',                               duration: 3 },
  Hawk:        { url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Buteo_jamaicensis_-_Red-tailed_Hawk_-_XC71575.ogg',                                        duration: 3 },
  BlackPhoebe: { url: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Sayornis_nigricans_semiater_-_Black_Phoebe_-_XC109602.ogg',                                duration: 4 },
};

// Cache Audio objects so files load only once
const _audioCache = new Map();

function playAnimalSound(name) {
  const rec = RECORDINGS[name];
  if (!rec) {
    // No recording — use synthesis fallback
    const synth = SOUNDS_SYNTH[name] || SOUNDS_SYNTH['Bird'];
    try { synth(); } catch (e) { console.warn('Synth error:', e); }
    return;
  }

  let audio = _audioCache.get(name);
  if (!audio) {
    audio = new Audio(rec.url);
    _audioCache.set(name, audio);
  }

  audio.pause();
  audio.currentTime = rec.start || 0;

  let stopTimer = null;
  audio.addEventListener('play', () => {
    if (stopTimer) clearTimeout(stopTimer);
    stopTimer = setTimeout(() => audio.pause(), (rec.duration || 4) * 1000);
  }, { once: true });

  const promise = audio.play();
  if (promise !== undefined) {
    promise.catch(() => {
      // Network or format error — fall back to synthesis
      const synth = SOUNDS_SYNTH[name] || SOUNDS_SYNTH['Bird'];
      try { synth(); } catch (e) { console.warn('Synth error:', e); }
    });
  }
}

// ─── Sound Synthesis (fallback for animals without recordings) ────────────────
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

// Envelope helper: attack → sustain → release
function applyEnvelope(gainNode, ctx, { attack=0.01, sustain=0.1, release=0.15, peak=0.8 } = {}) {
  const t = ctx.currentTime;
  gainNode.gain.setValueAtTime(0, t);
  gainNode.gain.linearRampToValueAtTime(peak, t + attack);
  gainNode.gain.setValueAtTime(peak, t + attack + sustain);
  gainNode.gain.exponentialRampToValueAtTime(0.001, t + attack + sustain + release);
  return t + attack + sustain + release;
}

function addReverb(ctx, source, mix=0.25) {
  const convolver = ctx.createConvolver();
  const len = ctx.sampleRate * 0.8;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
  }
  convolver.buffer = buf;
  const dry = ctx.createGain(); dry.gain.value = 1 - mix;
  const wet = ctx.createGain(); wet.gain.value = mix;
  source.connect(dry); dry.connect(ctx.destination);
  source.connect(convolver); convolver.connect(wet); wet.connect(ctx.destination);
  return { dry, wet, convolver };
}

const SOUNDS_SYNTH = {
  Cat() {
    const ctx = getAudioCtx();
    // Meow: FM oscillator with formant sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(380, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(520, ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(340, ctx.currentTime + 0.4);
    filter.type = 'bandpass'; filter.frequency.value = 1200; filter.Q.value = 2;
    filter.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.4);
    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    applyEnvelope(gain, ctx, { attack:0.02, sustain:0.28, release:0.18, peak:0.35 });
    osc.start(); osc.stop(ctx.currentTime + 0.7);
  },
  Dog() {
    const ctx = getAudioCtx();
    // Woof: low thud + bandpass burst
    const noise = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    noise.type = 'sawtooth';
    noise.frequency.setValueAtTime(200, ctx.currentTime);
    noise.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);
    noise.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    noise.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.35);
    filter.type = 'bandpass'; filter.frequency.value = 600; filter.Q.value = 1.5;
    noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    applyEnvelope(gain, ctx, { attack:0.005, sustain:0.22, release:0.15, peak:0.45 });
    noise.start(); noise.stop(ctx.currentTime + 0.6);
  },
  Cow() {
    const ctx = getAudioCtx();
    // Moo: low oscillator with vibrato
    const osc = ctx.createOscillator();
    const vibOsc = ctx.createOscillator();
    const vibGain = ctx.createGain();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 130;
    osc.frequency.linearRampToValueAtTime(115, ctx.currentTime + 0.5);
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 1.0);
    vibOsc.frequency.value = 5.5;
    vibGain.gain.value = 6;
    vibOsc.connect(vibGain); vibGain.connect(osc.frequency);
    osc.connect(gain); gain.connect(ctx.destination);
    applyEnvelope(gain, ctx, { attack:0.08, sustain:0.7, release:0.25, peak:0.4 });
    osc.start(); vibOsc.start(); osc.stop(ctx.currentTime + 1.2); vibOsc.stop(ctx.currentTime + 1.2);
  },
  Duck() {
    const ctx = getAudioCtx();
    // Quack: nasally buzz
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(520, ctx.currentTime + 0.04);
    osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.25);
    filter.type = 'bandpass'; filter.frequency.value = 1800; filter.Q.value = 3;
    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    applyEnvelope(gain, ctx, { attack:0.008, sustain:0.15, release:0.12, peak:0.3 });
    osc.start(); osc.stop(ctx.currentTime + 0.45);
  },
  Frog() {
    const ctx = getAudioCtx();
    // Ribbit: two pulses
    function pulse(delay) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(280, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + delay + 0.15);
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.18);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + 0.25);
    }
    pulse(0); pulse(0.22);
  },
  Horse() {
    const ctx = getAudioCtx();
    // Neigh: dramatic upward then downward sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.45);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 1.1);
    filter.type = 'bandpass'; filter.frequency.value = 800; filter.Q.value = 1;
    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    applyEnvelope(gain, ctx, { attack:0.04, sustain:0.8, release:0.3, peak:0.38 });
    osc.start(); osc.stop(ctx.currentTime + 1.4);
  },
  Lion() {
    const ctx = getAudioCtx();
    // Roar: noise + very low rumble with crescendo
    const bufLen = ctx.sampleRate * 1.4;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 320; filter.Q.value = 4;
    const gain = ctx.createGain();
    src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.55, ctx.currentTime + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
    // Low subharmonic
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine'; sub.frequency.setValueAtTime(55, ctx.currentTime);
    sub.frequency.linearRampToValueAtTime(42, ctx.currentTime + 1.0);
    subGain.gain.setValueAtTime(0, ctx.currentTime);
    subGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.3);
    subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
    sub.connect(subGain); subGain.connect(ctx.destination);
    src.start(); src.stop(ctx.currentTime + 1.4);
    sub.start(); sub.stop(ctx.currentTime + 1.4);
  },
  Elephant() {
    const ctx = getAudioCtx();
    // Trumpet: rising glissando
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.5);
    osc.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.7);
    filter.type = 'bandpass'; filter.frequency.value = 1000; filter.Q.value = 2;
    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    applyEnvelope(gain, ctx, { attack:0.06, sustain:0.5, release:0.2, peak:0.5 });
    osc.start(); osc.stop(ctx.currentTime + 1.0);
  },
  Sheep() {
    const ctx = getAudioCtx();
    // Baa: bleating tremolo
    const osc = ctx.createOscillator();
    const tremOsc = ctx.createOscillator();
    const tremGain = ctx.createGain();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(290, ctx.currentTime + 0.6);
    tremOsc.frequency.value = 10;
    tremGain.gain.value = 0.4;
    tremOsc.connect(tremGain); tremGain.connect(gain.gain);
    osc.connect(gain); gain.connect(ctx.destination);
    applyEnvelope(gain, ctx, { attack:0.04, sustain:0.45, release:0.2, peak:0.32 });
    osc.start(); tremOsc.start(); osc.stop(ctx.currentTime + 0.9); tremOsc.stop(ctx.currentTime + 0.9);
  },
  Bird() {
    const ctx = getAudioCtx();
    // Chirp: rapid ascending trills
    function trill(delay, freq1, freq2, count) {
      for (let i = 0; i < count; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t0 = ctx.currentTime + delay + i * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq1, t0);
        osc.frequency.exponentialRampToValueAtTime(freq2, t0 + 0.06);
        gain.gain.setValueAtTime(0, t0);
        gain.gain.linearRampToValueAtTime(0.3, t0 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.07);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(t0); osc.stop(t0 + 0.1);
      }
    }
    trill(0, 1800, 2400, 4);
    trill(0.35, 2000, 2800, 3);
  },
  Bee() {
    const ctx = getAudioCtx();
    // Buzz: AM synthesis — carrier at wing-beat frequency
    const carrier = ctx.createOscillator();
    const modOsc = ctx.createOscillator();
    const modGain = ctx.createGain();
    const masterGain = ctx.createGain();
    carrier.type = 'sawtooth'; carrier.frequency.value = 240;
    modOsc.type = 'sine'; modOsc.frequency.value = 190;
    modGain.gain.value = 0.5;
    modOsc.connect(modGain); modGain.connect(masterGain.gain);
    carrier.connect(masterGain); masterGain.connect(ctx.destination);
    applyEnvelope(masterGain, ctx, { attack:0.04, sustain:0.8, release:0.2, peak:0.35 });
    carrier.start(); modOsc.start(); carrier.stop(ctx.currentTime + 1.2); modOsc.stop(ctx.currentTime + 1.2);
  },
  Sparrow() {
    const ctx = getAudioCtx();
    // Sparrow: rapid staccato "tsip tsip chip" calls
    function tsip(delay, freq) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t0 = ctx.currentTime + delay;
      osc.type = 'sine'; osc.frequency.setValueAtTime(freq, t0);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, t0 + 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.85, t0 + 0.09);
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.28, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.1);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t0); osc.stop(t0 + 0.12);
    }
    tsip(0, 3400); tsip(0.13, 3600); tsip(0.26, 3200); tsip(0.4, 3800); tsip(0.52, 3500);
  },
  Caterpillar() {
    const ctx = getAudioCtx();
    // Soft leaf-crunch: filtered pink noise bursts
    function crunch(delay) {
      const len = Math.floor(ctx.sampleRate * 0.12);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      let b0=0,b1=0,b2=0;
      for (let i=0;i<len;i++){
        const w=Math.random()*2-1;
        b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759; b2=0.96900*b2+w*0.1538520;
        d[i]=(b0+b1+b2+w*0.0782232)*0.11;
      }
      const src = ctx.createBufferSource(); src.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass'; filter.frequency.value = 1400; filter.Q.value = 2;
      const gain = ctx.createGain();
      const t0 = ctx.currentTime + delay;
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.5, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.11);
      src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      src.start(t0); src.stop(t0 + 0.14);
    }
    crunch(0); crunch(0.18); crunch(0.34); crunch(0.5); crunch(0.66);
  },
  Dragonfly() {
    const ctx = getAudioCtx();
    // High-frequency flutter: faster AM than bee
    const carrier = ctx.createOscillator();
    const modOsc = ctx.createOscillator();
    const modGain = ctx.createGain();
    const masterGain = ctx.createGain();
    carrier.type = 'sawtooth'; carrier.frequency.value = 380;
    modOsc.type = 'sine'; modOsc.frequency.value = 320;
    modGain.gain.value = 0.45;
    modOsc.connect(modGain); modGain.connect(masterGain.gain);
    carrier.connect(masterGain); masterGain.connect(ctx.destination);
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass'; filter.frequency.value = 300;
    masterGain.connect(filter); filter.connect(ctx.destination);
    applyEnvelope(masterGain, ctx, { attack:0.03, sustain:0.7, release:0.18, peak:0.28 });
    carrier.start(); modOsc.start(); carrier.stop(ctx.currentTime + 1.1); modOsc.stop(ctx.currentTime + 1.1);
  },
  Hawk() {
    const ctx = getAudioCtx();
    // Piercing scream: "kee-aah" — sharp saw sweep with bandpass
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.7);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 1.1);
    filter.type = 'bandpass'; filter.frequency.value = 1600; filter.Q.value = 2.5;
    filter.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 1.1);
    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    applyEnvelope(gain, ctx, { attack:0.015, sustain:0.75, release:0.3, peak:0.42 });
    osc.start(); osc.stop(ctx.currentTime + 1.3);
  },
  BlackPhoebe() {
    const ctx = getAudioCtx();
    // "Fee-bee": two clean whistled notes, second slightly lower
    function note(delay, f1, f2, dur) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t0 = ctx.currentTime + delay;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f1, t0);
      osc.frequency.linearRampToValueAtTime(f2, t0 + dur * 0.7);
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.32, t0 + 0.03);
      gain.gain.setValueAtTime(0.32, t0 + dur - 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t0); osc.stop(t0 + dur + 0.02);
    }
    note(0,    2100, 2350, 0.28);  // "fee" — rising
    note(0.38, 1900, 1550, 0.38);  // "bee" — falling
  }
};

// ─── Render ───────────────────────────────────────────────────────────────────
function renderAnimals() {
  const grid = document.getElementById('animal-grid');

  ANIMALS.forEach(animal => {
    const btn = document.createElement('button');
    btn.className = 'animal-btn';
    const displayName = animal.label || animal.name;
    btn.setAttribute('aria-label', `Play ${displayName} sound`);
    btn.type = 'button';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = makeSVG(animal.name, animal.colors);

    const label = document.createElement('span');
    label.className = 'animal-name';
    label.textContent = displayName;

    btn.appendChild(card);
    btn.appendChild(label);

    btn.addEventListener('click', (e) => {
      // Paint-pulse class
      btn.classList.remove('playing');
      void btn.offsetWidth;
      btn.classList.add('playing');
      setTimeout(() => btn.classList.remove('playing'), 700);

      // Ripple effect
      spawnRipple(e.clientX, e.clientY);

      // Play sound
      playAnimalSound(animal.name);
    });

    grid.appendChild(btn);
  });
}

function spawnRipple(x, y) {
  const container = document.getElementById('ripple-container');
  const size = 120;
  const el = document.createElement('div');
  el.className = 'ripple';
  el.style.cssText = `left:${x - size/2}px;top:${y - size/2}px;width:${size}px;height:${size}px`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', renderAnimals);
