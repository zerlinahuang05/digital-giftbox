# 💌 Lovebox

A cute digital gift-sending app for long-distance love. Pack a little box
with gifts, write a note, seal it in an envelope, and send a magic link.
When your special someone opens it, they get a delivery-tracking screen,
a package to open, confetti, and your hidden letter. 🥰

Built with **Next.js** + **Tailwind CSS**. Everything is frontend-only —
**no database, no login, no API keys.** The whole gift is stored right
inside the share link.

---

## 🚀 How to run it (for total beginners)

You need [Node.js](https://nodejs.org) installed (version 18 or newer).

1. Open a terminal in this folder.
2. Install the building blocks (only needed once):
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open your browser to **http://localhost:3000** 🎉

To stop the app, press `Ctrl + C` in the terminal.

---

## ✏️ The 2 files you'll edit most

You can customize almost everything without touching the "scary" code.
These are the friendly files:

### 1. `data/gifts.js` — add or change the gifts
This is where you list the gifts people can pack. Each gift has a name,
a picture, and a backup emoji. There are step-by-step comments inside
showing exactly how to **add a new gift**.

To add a picture: drop a see-through **PNG** image into the
`public/assets` folder, then point to it like `/assets/your-file.png`.

### 2. `data/config.js` — change all the words / sample text
Every title, button label, hint, the delivery tracking steps, and the
default note live here. Just change the text inside the quotes.

---

## 🎨 Changing the colors

Open `app/globals.css`. Right at the top is a `:root { ... }` block with
all the theme colors (cream, blush, pink, etc.). Change the hex codes
(like `#ff7aa2`) and the whole app updates.

---

## 🗺️ What each page is

| Page                | File                 | What it does                                  |
| ------------------- | -------------------- | --------------------------------------------- |
| Landing (home)      | `app/page.js`        | The cute welcome screen with the big button.  |
| Pack your gift      | `app/pack/page.js`   | Drag gifts into the open box (works on phones).|
| Write a note        | `app/note/page.js`   | Stationery + the "seal into envelope" animation.|
| Share / send        | `app/share/page.js`  | Builds the gift link; copy or preview it.     |
| Receiver opens it   | `app/gift/page.js`   | Tracking timeline → open package → reveal.     |

Helper pieces (you usually won't need to edit these):

- `components/GiftProvider.js` — remembers your gift between pages.
- `components/Background.js` — the floating hearts & sparkles.
- `components/Draggable.js` / `Droppable.js` — the drag-and-drop magic.
- `components/GiftImage.js` — shows a gift picture (emoji backup).
- `lib/giftCode.js` — packs the gift into the share link.

---

## 💡 Good to know

- **The gift travels in the link.** When you click *Copy gift link*, the
  chosen gifts and your note are encoded right into the URL. Anyone with
  the link sees the gift — no server needed.
- **Mobile-first.** The whole thing is designed for phones, and the
  drag-and-drop works with touch.
- Want to test as the receiver? On the share page, hit **Preview the gift**.

Made with love. 💖
