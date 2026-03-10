# Expense Tracker — Marketing Mojito Assignment

A personal expense tracker built with React + Vite, featuring live currency conversion via the Frankfurter API.

## Features
- Add / delete expenses with name, amount, and category
- Live running total
- Category-wise spending breakdown with visual bar
- Live currency conversion (USD → EUR, GBP, INR, JPY, etc.)
- Fully responsive (1600px desktop & 414px mobile)
- Graceful API loading & error states

## Components
- `ExpenseForm` — form to add new expenses
- `ExpenseList` — scrollable list with delete
- `SummaryPanel` — category breakdown with progress bar
- `CurrencyConverter` — live rates via Frankfurter API

## Tech Stack
- React 18 + Vite
- CSS Modules (no UI kits)
- Frankfurter.app (free, no API key needed)

## Run Locally
```bash
npm install
npm run dev
```

## Deploy
```bash
npm run build
# deploy /dist folder to Vercel or Netlify
```
