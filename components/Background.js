"use client";

/*
  The soft, cute background decorations: floating hearts + twinkling
  sparkles. Drop <Background /> behind any page. It sits behind
  everything and never blocks taps (pointer-events: none).
*/

import { useMemo } from "react";

// Fixed-ish positions so it looks nicely scattered (not random each render)
const HEARTS = [
  { left: "8%", top: "12%", size: 26, dur: 7, rot: -12 },
  { left: "82%", top: "10%", size: 34, dur: 8, rot: 10 },
  { left: "14%", top: "70%", size: 22, dur: 6, rot: 8 },
  { left: "88%", top: "62%", size: 28, dur: 9, rot: -8 },
  { left: "50%", top: "85%", size: 20, dur: 7.5, rot: 6 },
  { left: "70%", top: "38%", size: 18, dur: 6.5, rot: -6 },
];

const SPARKLES = [
  { left: "20%", top: "30%", size: 16, dur: 3 },
  { left: "62%", top: "18%", size: 12, dur: 2.4 },
  { left: "40%", top: "55%", size: 14, dur: 3.6 },
  { left: "78%", top: "78%", size: 18, dur: 2.8 },
  { left: "30%", top: "88%", size: 12, dur: 3.2 },
  { left: "92%", top: "40%", size: 14, dur: 2.6 },
  { left: "6%", top: "48%", size: 12, dur: 3.4 },
];

export default function Background() {
  // useMemo so the arrays aren't recreated on every render
  const hearts = useMemo(() => HEARTS, []);
  const sparkles = useMemo(() => SPARKLES, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {hearts.map((h, i) => (
        <span
          key={`h-${i}`}
          className="absolute animate-floaty select-none opacity-60"
          style={{
            left: h.left,
            top: h.top,
            fontSize: h.size,
            "--dur": `${h.dur}s`,
            "--rot": `${h.rot}deg`,
          }}
        >
          💗
        </span>
      ))}
      {sparkles.map((s, i) => (
        <span
          key={`s-${i}`}
          className="absolute animate-twinkle select-none"
          style={{
            left: s.left,
            top: s.top,
            fontSize: s.size,
            "--dur": `${s.dur}s`,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}
