export type GiftId = "flowers" | "candy" | "coffee" | "letter";

export type Gift = {
  id: GiftId;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string;
};

export const gifts: Gift[] = [
  {
    id: "flowers",
    name: "Flowers",
    emoji: "🌷",
    tagline: "A tiny bouquet for his day",
    description: "Soft tulips, blush petals, and a little reminder that he is loved.",
    color: "from-rose-200 via-pink-100 to-amber-100",
  },
  {
    id: "candy",
    name: "Candy",
    emoji: "🍬",
    tagline: "Something sweet, just like him",
    description: "A pocketful of pastel candies wrapped in flirty little sparkles.",
    color: "from-fuchsia-200 via-rose-100 to-orange-100",
  },
  {
    id: "coffee",
    name: "Coffee",
    emoji: "☕",
    tagline: "A cozy cup for a cozy love",
    description: "Warm coffee, cinnamon clouds, and one quiet moment together.",
    color: "from-amber-200 via-stone-100 to-rose-100",
  },
  {
    id: "letter",
    name: "Letter",
    emoji: "💌",
    tagline: "A love note to keep",
    description: "A sealed note with all the mushy words he deserves to hear.",
    color: "from-pink-200 via-red-100 to-orange-100",
  },
];

export const defaultNote =
  "Hi love, I made you a tiny digital gift because you make ordinary days feel special.";

export function getGiftById(id: string | null | undefined) {
  return gifts.find((gift) => gift.id === id) ?? gifts[0];
}
