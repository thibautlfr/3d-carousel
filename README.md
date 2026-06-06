# Research 001 — 3D Carousel

An interactive 3D carousel built with Three.js and TypeScript. Images are arranged in a circle and rotate via scroll/touch with friction-based damping. A chromatic aberration post-processing effect adds a visual edge.

**[Live demo at : https://thibautlfr.github.io/3d-carousel/](https://thibautlfr.github.io/3d-carousel/)**

## Features

- Scroll and touch-driven rotation with inertia
- Chromatic aberration post-processing
- Responsive layout (mobile / tablet / desktop)
- Debug UI via `#debug` in the URL

## Tech Stack

- [Three.js](https://threejs.org/) — 3D rendering
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Vite](https://vitejs.dev/) — build tool
- [Biome](https://biomejs.dev/) — linting and formatting

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view the experience.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm deploy` | Publish to GitHub Pages |
