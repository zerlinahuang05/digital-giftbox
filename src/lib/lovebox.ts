export type LoveboxGiftId =
  | "flowers"
  | "candy"
  | "coffee"
  | "latte"
  | "letter"
  | "playlist"
  | "star"
  | "photo";

export type GiftOption = {
  id: LoveboxGiftId;
  name: string;
  emoji: string;
  blurb: string;
  color: string;
};

export type PackedGift = {
  instanceId: string;
  giftId: LoveboxGiftId;
  note: string;
};

export type LoveboxPayload = {
  gifts: PackedGift[];
  letter: string;
};

export const loveboxDraftKey = "lovebox-draft";

export const giftOptions: GiftOption[] = [
  {
    id: "flowers",
    name: "Flowers",
    emoji: "🌷",
    blurb: "A tiny bouquet for the softest boy.",
    color: "from-rose-200 to-pink-100",
  },
  {
    id: "candy",
    name: "Candy",
    emoji: "🍬",
    blurb: "A pocket of sweetness for later.",
    color: "from-fuchsia-200 to-rose-100",
  },
  {
    id: "coffee",
    name: "Coffee",
    emoji: "☕",
    blurb: "A warm cup for a long-distance morning.",
    color: "from-amber-200 to-stone-100",
  },
  {
    id: "latte",
    name: "Latte",
    emoji: "🥛",
    blurb: "Foam hearts and cozy thoughts.",
    color: "from-orange-100 to-rose-100",
  },
  {
    id: "letter",
    name: "Handwritten letter",
    emoji: "💌",
    blurb: "A little envelope full of feelings.",
    color: "from-red-100 to-pink-100",
  },
  {
    id: "playlist",
    name: "Playlist",
    emoji: "🎧",
    blurb: "Songs that sound like missing you.",
    color: "from-violet-100 to-rose-100",
  },
  {
    id: "star",
    name: "Star",
    emoji: "⭐",
    blurb: "One tiny sky-light for his pocket.",
    color: "from-yellow-100 to-orange-100",
  },
  {
    id: "photo",
    name: "Photo memory",
    emoji: "📷",
    blurb: "A sweet snapshot you can almost hold.",
    color: "from-sky-100 to-pink-100",
  },
];

export const defaultGiftNote = "I picked this because it reminded me of you.";

export const defaultLetter =
  "Hi love,\n\nI packed this little Lovebox for you because even when we are far apart, I still want you to feel close to me.\n\nOpen these tiny gifts whenever you miss me.";

export function getGiftOption(id: string | null | undefined) {
  return giftOptions.find((gift) => gift.id === id) ?? giftOptions[0];
}

export function emptyPayload(): LoveboxPayload {
  return {
    gifts: [],
    letter: defaultLetter,
  };
}

export function encodeLoveboxPayload(payload: LoveboxPayload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
}

export function decodeLoveboxPayload(encoded: string | null | undefined): LoveboxPayload {
  if (!encoded) {
    return emptyPayload();
  }

  try {
    const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
    const binary = atob(`${normalized}${padding}`);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as Partial<LoveboxPayload>;

    return {
      gifts: Array.isArray(parsed.gifts) ? parsed.gifts : [],
      letter: typeof parsed.letter === "string" ? parsed.letter : defaultLetter,
    };
  } catch {
    return emptyPayload();
  }
}
