# Coo-Down

A level-based pigeon-scaring game: drag across each scene to shoo every pigeon away and unlock the next one.

Sets so far:

- **Cables de luz** — pigeons lined up along sagging power lines.
- **Tejados** — a staggered night-time rooftop skyline.
- **Balcones** — a building facade with three balcony railings.

Each level is a set of "perches" (line segments) that pigeons are distributed along. Clearing a level shows a 3-star completion screen and unlocks the next set; progress is saved in `localStorage`.

## Development

```sh
bun install
bun run dev
```

## Built with

- Vite
- TypeScript
- React
- Tailwind CSS
