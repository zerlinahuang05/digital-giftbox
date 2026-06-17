# Lovebox 💝

A cute frontend-only digital gift app for long-distance relationships.

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:3000** to see the app.

---

## 🎁 How to customise the app

**Everything you might want to edit lives in one file:**

```
src/lib/gifts.ts
```

Open that file and you will find three clearly labeled sections:

| Section | What to change |
|---|---|
| `GIFTS` array | Add, remove, or reorder gift options (emoji + name) |
| `DEFAULT_NOTE` | The pre-filled letter text on the note page |
| `DISTANCE` | The "Sent across X miles" text on the tracking screen |

### Adding a new gift

Copy any existing line in the `GIFTS` array and change the three values:

```ts
{ id: "cookie", name: "Cookie", emoji: "🍪" },
```

- `id` — a unique short name, no spaces (used internally only)
- `name` — the label that shows beneath the gift icon
- `emoji` — the big emoji displayed as the "cutout" gift

### Changing colours

Colours live in `src/app/globals.css` at the top under `:root`. The main tones are:
- `--cream` — page background
- `--blush` — soft pink accent
- `--ink` — text colour

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/pack` | Gift packing — drag or tap gifts into the box |
| `/note` | Stationery letter — write and seal your note |
| `/share` | Copy the shareable gift link |
| `/open?box=…` | Receiver opening — tracking, reveal, and letter |

---

## Technical notes

- **No database, no login, no API keys.** Gift data is stored in `localStorage` while building, then encoded into the shareable URL for the receiver.
- Built with **Next.js 16** (App Router) + **Tailwind CSS v4**.
- Drag-and-drop uses the Pointer Events API — works on both mouse and touch/mobile.
