# Animal Sounds

A GitHub Pages web app with abstract painted animal buttons that play sounds when clicked.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch**, select `main` / `(root)` or `/ docs` as needed
4. Your page is live at `https://<username>.github.io/<repo>/`

No build step required — pure static HTML/CSS/JS.

## Add or Remove Animals

Edit the `ANIMALS` array at the top of `app.js`:

```js
const ANIMALS = [
  { name: 'Cat',  colors: ['#e8c4a0','#c97a3e','#7a4a1e'] },
  // add more entries here…
];
```

- `name`: must match a key in `SOUNDS` and `ANIMAL_SHAPES` (case-sensitive) — or falls back to defaults
- `colors`: `[background, mid-tone, accent]` hex values — controls the painting palette

## Add Custom Sounds

Add a function to the `SOUNDS` object in `app.js` matching your animal's name:

```js
const SOUNDS = {
  MyAnimal() {
    const ctx = getAudioCtx();
    // use Web Audio API here
  }
};
```
