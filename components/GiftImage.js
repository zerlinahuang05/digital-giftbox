"use client";

/*
  Shows a gift's picture. If the picture file is missing or fails to
  load, it shows the backup emoji instead so the app never looks broken.
*/

import { useState } from "react";

export default function GiftImage({ gift, className = "", style }) {
  const [failed, setFailed] = useState(false);

  if (!gift) return null;

  if (failed || !gift.src) {
    return (
      <span className={className} style={{ ...style, lineHeight: 1 }}>
        {gift.emoji || "🎁"}
      </span>
    );
  }

  return (
    // Using a plain <img> keeps things simple for beginners.
    <img
      src={gift.src}
      alt={gift.name}
      className={className}
      style={style}
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}
