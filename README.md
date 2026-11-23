# typescript-next-mui

Next.js + Material UI admin starter with the same feature-oriented structure as `typescript-next`.

## Stack

- Next.js 16 App Router
- Material UI 9
- React Hook Form + Zod
- TanStack React Query
- Go API (`http://localhost:8080/api`)

## Run

```bash
pnpm dev   # http://localhost:3002
```

Make sure the Go API is running on `:8080`, then sign in at `/login`.

## Structure

```
src/
  lib/                 # goApiFetch, query client/keys
  features/
    auth/              # login, session hooks
    users/             # users API + RHF dialogs + DataGrid
    articles/          # articles API + RHF dialogs + DataGrid
    dashboard/         # overview cards
  components/
    providers/         # Theme + Query + Snackbar
    dashboard/         # DashboardShell
  app/
    (site)/            # marketing shell
    (auth)/login
    (dashboard)/dashboard/{,users,articles}
```

## Key routes

| Route | Purpose |
| --- | --- |
| `/login` | Cookie auth against Go `/auth/login` |
| `/dashboard` | Live counts via React Query |
| `/dashboard/users` | Users CRUD |
| `/dashboard/articles` | Articles CRUD |
