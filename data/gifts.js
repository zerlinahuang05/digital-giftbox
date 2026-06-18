/*
  ════════════════════════════════════════════════════════════════
   🎁  GIFT OPTIONS  —  THIS IS THE FILE YOU EDIT TO ADD GIFTS  🎁
  ════════════════════════════════════════════════════════════════

  Each gift in the list below has 4 things:

    id    -> a short, unique nickname (no spaces). Used by the code.
    name  -> the cute label shown under the gift on the screen.
    src   -> the picture file. Put your image in the "public/assets" folder
             and write its path as "/assets/your-file.png".
             Tip: use PNG images with a transparent (see-through) background.
    emoji -> a backup emoji shown if the picture ever fails to load.

  TO ADD A NEW GIFT:
    1. Drop a transparent PNG into the "public/assets" folder.
    2. Copy one of the blocks below, paste it, and change the values.
    3. Save the file — that's it! The new gift appears automatically.
*/

export const GIFTS = [
  {
    id: "teddy",
    name: "Teddy Bear",
    src: "/assets/teddy.png",
    emoji: "🧸",
  },
  {
    id: "candy",
    name: "Candy",
    src: "/assets/candy.png",
    emoji: "🍬",
  },

  // 👉 Add more gifts here! For example:
  // {
  //   id: "flower",
  //   name: "Flower",
  //   src: "/assets/flower.png",
  //   emoji: "🌸",
  // },
];

// Helper: find a gift by its id (used around the app — no need to edit).
export function getGiftById(id) {
  return GIFTS.find((gift) => gift.id === id);
}
