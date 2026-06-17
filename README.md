# digital-giftbox

A cute digital gift app for Edison while the entire states of Oregon, Washington, and California span us

## Digital Giftbox

A warm, mobile-friendly Next.js + Tailwind CSS app for sending a tiny digital gift.

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` to build a gift, preview it, and copy the final `/open` link.

## Editing gifts and notes

- Edit the gift choices in `src/lib/gifts.ts`.
- Edit the default note in `src/lib/gifts.ts`.
- The builder homepage is `src/app/page.tsx`.
- The final gift-opening page is `src/app/open/OpenGift.tsx`.

The app uses hardcoded data and browser URL parameters only. There are no databases, logins, API keys, or authentication.
