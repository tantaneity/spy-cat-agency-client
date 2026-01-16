# spy cat agency client

next.js frontend for managing spy cats

![screenshot](public/screenshots/app.png)

## tech stack

- next.js 16
- react 19
- typescript
- tailwindcss

## architecture

- app router
- client-side rendering
- component-based structure
- centralized api client

## setup

install dependencies:

```bash
npm install
```

## environment

create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## run

development:

```bash
npm run dev
```

production:

```bash
npm run build
npm start
```

app available at `http://localhost:3000`

## features

- dark theme
- create spy cats with validated breeds
- update cat salary
- delete cats
- real-time validation
- error handling

## structure

```
app/
  page.tsx          - main page
  layout.tsx        - root layout
  globals.css       - global styles

components/
  spy-cat-form.tsx  - create cat form
  spy-cat-list.tsx  - cats list
  spy-cat-item.tsx  - single cat item

lib/
  api.ts            - api client

types/
  spy-cat.ts        - type definitions
```

