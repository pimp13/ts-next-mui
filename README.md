# typescript-next-mui

Next.js App Router starter styled with **Material UI (MUI)**.

## Stack

- Next.js 16 + React 19 + TypeScript
- `@mui/material` + `@mui/icons-material`
- `@mui/material-nextjs` App Router cache provider
- Emotion (`@emotion/react`, `@emotion/styled`, `@emotion/cache`)

## Scripts

```bash
pnpm dev      # http://localhost:3002
pnpm build
pnpm start
pnpm lint
```

## Structure

- `src/theme.ts` — MUI theme (palette, typography, component defaults)
- `src/components/ThemeRegistry.tsx` — Emotion cache + ThemeProvider + CssBaseline
- `src/components/AppShell.tsx` — AppBar / Drawer shell
- `src/components/Link.tsx` — Next.js Link wrapper for MUI `component={Link}`
- `src/app/` — routes (`/`, `/dashboard`, `/components`)
