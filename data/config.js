/*
  ════════════════════════════════════════════════════════════════
   ✏️  WORDS & SAMPLE TEXT  —  EDIT THE TEXT ON EACH PAGE HERE  ✏️
  ════════════════════════════════════════════════════════════════

  Change any of the text in quotes below to customize what your app says.
  (To change COLORS, open: app/globals.css — the colors are at the top.)
*/

export const CONFIG = {
  // The app's name (shown in a few places)
  appName: "Lovebox",

  // 1) LANDING PAGE
  landing: {
    title: "A surprise,\njust for you.",
    subtitle: "Someone packed a little box of love and sent it across the miles.",
    button: "Send a digital gift!",
  },

  // 2) GIFT PACKING PAGE
  pack: {
    title: "Pack your gift box",
    hint: "Drag the gifts down into the box 💕",
    button: "All packaged up!",
  },

  // 3) NOTE PAGE
  note: {
    title: "Write a little note",
    placeholder: "Dear you,\n\nI miss you so much. Even 1,000 miles can't stop how much I love you...\n\nForever yours 💌",
    button: "Seal my letter!",
  },

  // 4) SHARE / SEND PAGE
  share: {
    title: "Your gift is ready!",
    subtitle: "Copy the link and send it to your special someone.",
    copyButton: "Copy gift link",
    previewButton: "Preview the gift",
  },

  // 5) RECEIVER PAGE (what your special someone sees)
  receiver: {
    // Delivery tracking timeline steps (top = first, bottom = last)
    trackingSteps: [
      "Packed with care",
      "Sealed with a note",
      "Sent across 1,000 miles",
      "Delivered to you",
    ],
    packageCount: "You have 1 package!",
    revealButton: "See my package",
    openButton: "Open package",
    openLetterHint: "Tap the letter to read it 💌",
    emptyTitle: "Hmm, this box looks empty",
    emptyText: "This gift link looks broken or incomplete.",
  },

  // The message shown if there is no custom note written
  defaultNote: "I made this just for you. 💖",
};
