# 3D Carousel

My first shaders: twelve film stills hang in a ring that turns as you scroll, with inertia. A vertex shader bends each plane into a wave, and the fragment shader splits the image into red, green and blue around the cursor, under a soft vignette.

**[Live demo → 3d-carousel.thibaut-lefrancois.com](https://3d-carousel.thibaut-lefrancois.com)**

## Features

- Scroll and touch rotation with friction-based damping, and a slow idle spin
- Planes bent by a sine wave in the vertex shader
- Chromatic aberration around the cursor in the fragment shader, with a vignette
- Loading screen with progress
- Debug panel and GPU stats with `#debug` in the URL (`h` toggles them)

## Stack

- [Three.js](https://threejs.org) and GLSL through [vite-plugin-glsl](https://github.com/UstymUkhman/vite-plugin-glsl)
- [TypeScript](https://www.typescriptlang.org) + [Vite](https://vite.dev)
- [lil-gui](https://lil-gui.georgealways.com) and [stats-gl](https://github.com/RenaudRohlinger/stats-gl) for debugging
- [Biome](https://biomejs.dev) for linting and formatting

## Getting started

```bash
git clone https://github.com/thibautlfr/3d-carousel.git
cd 3d-carousel
pnpm install
pnpm dev
```

The app runs at http://localhost:5173.

| Script         | Description                         |
| -------------- | ----------------------------------- |
| `pnpm dev`     | Start the dev server                |
| `pnpm build`   | Type-check and build into `dist/`   |
| `pnpm preview` | Preview the production build        |

Every push to `main` deploys to GitHub Pages through `.github/workflows/deploy.yml`.

## Author

Thibaut Lefrançois ([GitHub](https://github.com/thibautlfr) · [LinkedIn](https://www.linkedin.com/in/thibaut-lefrancois/))

The stills come from Studio Ghibli's *When Marnie Was There* (© 2014 Studio Ghibli). This is a non-commercial study, not affiliated with the studio.
