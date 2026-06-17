// ════════════════════════════════════════════════════════════════
//  🎁  LOVEBOX — gifts.ts
//  This is the ONE file you need to edit to customise your app!
// ════════════════════════════════════════════════════════════════
//
//  HOW TO EDIT GIFTS
//  ─────────────────
//  Each gift has three fields:
//    id    — a unique short name with no spaces (used internally)
//    name  — the label shown under the gift icon
//    emoji — the big emoji displayed as the "cutout" gift
//
//  • To add a gift: copy any line and change the three values.
//  • To remove a gift: delete its line.
//  • To reorder: move lines up or down.
//
// ════════════════════════════════════════════════════════════════

export type GiftItem = {
  id: string;
  name: string;
  emoji: string;
};

export const GIFTS: GiftItem[] = [
  { id: "teddy", name: "Teddy Bear", emoji: "🧸" },
  { id: "flowers", name: "Flowers", emoji: "🌷" },
  { id: "candy", name: "Candy", emoji: "🍬" },
  { id: "coffee", name: "Coffee", emoji: "☕" },
  { id: "latte", name: "Latte", emoji: "🥛" },
  { id: "letter", name: "Love Letter", emoji: "💌" },
  { id: "playlist", name: "Playlist", emoji: "🎧" },
  { id: "star", name: "Wishing Star", emoji: "⭐" },
  { id: "cake", name: "Little Cake", emoji: "🍰" },
  { id: "photo", name: "Memory", emoji: "📷" },
  { id: "rose", name: "Red Rose", emoji: "🌹" },
];

// ════════════════════════════════════════════════════════════════
//  ✏️  DEFAULT NOTE
//  Pre-fills the note-writing page. Your user can change it.
// ════════════════════════════════════════════════════════════════

export const DEFAULT_NOTE =
  "Hi love,\n\nI made you this little Lovebox because even when miles stand between us, you are always close in my heart. Every tiny gift inside is a piece of how I feel about you.\n\nWith all my love,";

// ════════════════════════════════════════════════════════════════
//  ✈️  TRACKING DISTANCE
//  Shown on the delivery-tracking screen your boyfriend sees.
// ════════════════════════════════════════════════════════════════

export const DISTANCE = "1,000 miles";
