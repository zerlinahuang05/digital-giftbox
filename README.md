# Lovebox

A cute digital gift app for sending a romantic package from far away.

## What it does

Lovebox is a frontend-only Next.js + Tailwind CSS app. You can pack little gifts into a box, write tiny notes for each gift, seal a main letter, and create a shareable opening link.

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` to start packing a Lovebox.

## Editing gifts and notes

- Edit the gift choices in `src/lib/lovebox.ts`.
- Edit the default tiny gift note in `src/lib/lovebox.ts`.
- Edit the default main letter in `src/lib/lovebox.ts`.
- The builder homepage is `src/app/page.tsx`.
- The gift packing page is `src/app/pack/page.tsx`.
- The stationery note page is `src/app/note/page.tsx`.
- The share page is `src/app/share/page.tsx`.
- The receiver opening page is `src/app/open/OpenGift.tsx`.

The app uses hardcoded data, local browser state while building, and URL-encoded gift data for sharing. There are no databases, logins, API keys, or authentication.
