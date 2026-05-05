# Animal Sounds — Codebase Guide

## What this is

A zero-dependency, no-build browser app hosted on GitHub Pages. Three files:
- `index.html` — minimal shell (header + `#animal-grid` + `#ripple-container`)
- `styles.css` — all styling, including the mode switch and card animations
- `app.js` — everything else: data, SVG rendering, audio playback, speech

Open `index.html` directly in a browser to run it locally. No server or build step needed.

---

## Sound system

### Playback chain

```
user tap
  └─ speakAndPlay(name, label)      [app.js ~659]
       speaks the animal's name via Web Speech API, then calls:
       └─ playAnimalSound(name)      [app.js ~627]
            ├─ if soundMode === 'human'  →  speakPhonetic(name)
            ├─ if no RECORDINGS entry   →  speakPhonetic(name)
            ├─ Audio(RECORDINGS[name].url).play()
            │    └─ on network/format error  →  speakPhonetic(name)
            └─ (success) plays Wikimedia OGG file, auto-stops after rec.duration seconds
```

### speakPhonetic(name) [app.js ~637]

Uses the Web Speech API to say the animal's phonetic sound ("meow", "woof woof", etc.)
with per-animal `pitch` and `rate` from the `PHONETICS` table. Falls through to
`SOUNDS_SYNTH` only if `window.speechSynthesis` is not available at all.

### soundMode [app.js ~625]

A module-level `let soundMode = 'real'` controls behaviour:
- `'real'`  — try Wikimedia recording first, fall back to phonetic speech on failure
- `'human'` — always use phonetic speech, skip recordings entirely

Toggled by the **Real / Human** pill switch in the header (wired in `initModeSwitch()`).

---

## Key data structures

### ANIMALS [app.js ~4]
Array of `{ name, label?, colors }`. `name` is the key used in every other table.
`label` is the display name when it differs from `name` (e.g. `BlackPhoebe` → `'Black Phoebe'`).
`colors` is `[backgroundColor, midTone, accentColor]` fed to the SVG painter.

### RECORDINGS [app.js ~604]
```js
{ url: 'https://upload.wikimedia.org/...', duration: 4, start?: 0 }
```
Public-domain OGG files from Wikimedia Commons. `duration` is how many seconds to play
before auto-stopping. Caterpillar and Dragonfly have no entries (no suitable recordings found).

### PHONETICS [app.js ~628]
```js
{ text: 'meow', pitch: 1.6, rate: 0.7 }
```
Text spoken by the Web Speech API when falling back. `pitch` 0–2 (1 = normal),
`rate` 0.1–10 (1 = normal). Tune these to match the animal's character.

### SOUNDS_SYNTH [app.js ~1080]
Procedural Web Audio API synth functions — one per animal. These are a **last resort**
only when `window.speechSynthesis` is unavailable. Do not invest time improving them.

### ANIMAL_SHAPES [app.js ~50 onwards]
SVG generator functions keyed by animal name. Each has three parts: `bg`, `body`,
`highlights`. A `default` entry exists as a catch-all for unknown names.

---

## Adding a new animal

1. **ANIMALS** — append `{ name: 'Fox', colors: ['#e8c068', '#b86820', '#4a2008'] }`
2. **RECORDINGS** — add a Wikimedia Commons OGG URL + duration (or skip if none exists)
3. **PHONETICS** — add `{ text: 'yip yip', pitch: 1.4, rate: 1.1 }`
4. **ANIMAL_SHAPES** — add an SVG generator (copy the `default` entry as a starting point)
5. No other registration needed — `renderAnimals()` iterates ANIMALS automatically.

---

## Initialization

```
DOMContentLoaded
  ├─ renderAnimals()   — builds the grid cards and wires click → speakAndPlay
  └─ initModeSwitch()  — wires the Real/Human toggle buttons to soundMode
```

`_audioCache` (Map) stores `Audio` objects keyed by animal name so OGG files are only
fetched once per session.

---

## Audio context

`getAudioCtx()` lazily creates and resumes a shared `AudioContext` for Web Audio synthesis.
Browsers require a user gesture before audio plays — the animal card click provides that.
The narration utterance in `speakAndPlay` is sent before `playAnimalSound` so voices
load in time (they arrive async via `speechSynthesis.getVoices()`).
