"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { decodePayload } from "@/lib/encode";
import { DISTANCE, GIFTS } from "@/lib/gifts";

// The four visual stages the receiver moves through.
type Stage = "tracking" | "opening" | "revealed" | "letter";

const TRACKING_STEPS = [
  { icon: "📦", label: "Packed with care" },
  { icon: "💌", label: "Sealed with a note" },
  { icon: "✈️", label: `Sent across ${DISTANCE}` },
  { icon: "🏠", label: "Delivered to you" },
];

// Decorative particles for the reveal burst.
const REVEAL_PARTICLES = [
  {
    char: "✨",
    cls: "left-[8%] top-[18%] text-2xl opacity-0 [animation:sparkle_1.1s_ease-out_0.2s_forwards]",
  },
  {
    char: "♡",
    cls: "left-[82%] top-[12%] text-3xl text-rose-300 opacity-0 [animation:heart-rise_1.4s_ease-out_0.35s_forwards]",
  },
  {
    char: "✨",
    cls: "left-[88%] top-[50%] text-xl opacity-0 [animation:sparkle_0.95s_ease-out_0.55s_forwards]",
  },
  {
    char: "♡",
    cls: "left-[4%] top-[55%] text-2xl text-pink-300 opacity-0 [animation:heart-rise_1.3s_ease-out_0.25s_forwards]",
  },
  {
    char: "✦",
    cls: "left-[48%] top-[8%] text-3xl text-amber-300 opacity-0 [animation:sparkle_1.2s_ease-out_0.1s_forwards]",
  },
  {
    char: "✨",
    cls: "left-[28%] top-[72%] text-xl opacity-0 [animation:sparkle_0.9s_ease-out_0.65s_forwards]",
  },
  {
    char: "♡",
    cls: "left-[70%] top-[68%] text-2xl text-rose-200 opacity-0 [animation:heart-rise_1.5s_ease-out_0.45s_forwards]",
  },
];

export function OpenGift() {
  const searchParams = useSearchParams();
  const [stage, setStage] = useState<Stage>("tracking");
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [delivered, setDelivered] = useState(false);

  const payload = useMemo(
    () => decodePayload(searchParams.get("box") ?? ""),
    [searchParams],
  );

  // Animate tracking steps in one by one.
  useEffect(() => {
    let count = 0;
    const id = window.setInterval(() => {
      count += 1;
      setVisibleSteps(count);
      if (count >= TRACKING_STEPS.length) {
        window.clearInterval(id);
        window.setTimeout(() => setDelivered(true), 700);
      }
    }, 560);
    return () => window.clearInterval(id);
  }, []);

  function handleOpen() {
    setStage("opening");
    // Let the lid-open animation play (≈1 s), then reveal gifts.
    window.setTimeout(() => setStage("revealed"), 1100);
  }

  function handleLetterOpen() {
    setStage("letter");
  }

  return (
    <div className="min-h-screen bg-[#fff7f0] overflow-x-hidden">
      {/* ════════════════════════════════════
          STAGE: TRACKING
          Shows delivery steps + closed box.
      ════════════════════════════════════ */}
      {stage === "tracking" ? (
        <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10">
          <h1 className="text-2xl font-black text-rose-950 text-center mb-1">
            Your package is here! 🎁
          </h1>
          <p className="text-stone-500 text-sm text-center mb-8">Tracking your delivery</p>

          {/* Tracking steps */}
          <div className="w-full max-w-sm space-y-3 mb-8">
            {TRACKING_STEPS.map((step, i) => (
              <div
                key={step.label}
                className={`
                  flex items-center gap-3 px-4 py-3.5 rounded-2xl
                  transition-all duration-400
                  ${
                    i < visibleSteps
                      ? "bg-white border border-rose-100 shadow-md [animation:tracking-in_0.4s_ease-out_both]"
                      : "opacity-0 pointer-events-none"
                  }
                `}
              >
                <span className="text-2xl" aria-hidden="true">
                  {step.icon}
                </span>
                <span className="font-semibold text-rose-950 text-sm flex-1">{step.label}</span>
                {i < visibleSteps && (
                  <span className="text-rose-500 font-black text-lg" aria-hidden="true">
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Closed gift box illustration */}
          <div
            className="relative w-32 h-28 mb-6 [animation:bounce-soft_2.2s_ease-in-out_infinite]"
            aria-hidden="true"
          >
            {/* Lid */}
            <div className="absolute inset-x-0 top-0 h-10 bg-rose-500 rounded-t-2xl shadow-md border-b-4 border-rose-600">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-white/20" />
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl leading-none">
                🎀
              </span>
            </div>
            {/* Body */}
            <div className="absolute bottom-0 inset-x-0 h-[4.5rem] bg-rose-500 rounded-b-2xl shadow-xl shadow-rose-300/50">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-white/20" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-white/20" />
            </div>
          </div>

          {/* "Open package" button — appears after all tracking steps are shown */}
          {delivered ? (
            <div className="text-center [animation:fade-up_0.5s_ease-out_forwards]">
              <p className="text-xl font-black text-rose-950 mb-4">You have 1 package! 🎁</p>
              <button
                className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-black text-base px-9 py-4 rounded-full shadow-2xl shadow-rose-300/70 transition-all hover:-translate-y-0.5"
                onClick={handleOpen}
              >
                Open package 🎀
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* ════════════════════════════════════
          STAGE: OPENING
          Box lid flies open animation.
      ════════════════════════════════════ */}
      {stage === "opening" ? (
        <div className="min-h-screen flex flex-col items-center justify-center px-5">
          <p className="text-stone-500 text-sm mb-8 [animation:fade-in_0.35s_ease-out_forwards]">
            Opening your Lovebox…
          </p>

          {/* Animated box */}
          <div className="relative w-44 h-40" aria-hidden="true">
            {/* Lid flies away */}
            <div className="absolute inset-x-0 top-0 h-12 bg-rose-500 rounded-t-2xl shadow-lg border-b-4 border-rose-600 origin-bottom [animation:lid-open_1s_ease-out_forwards]">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-white/20" />
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl leading-none">
                🎀
              </span>
            </div>
            {/* Box body stays */}
            <div className="absolute bottom-0 inset-x-0 h-28 bg-rose-500 rounded-b-2xl shadow-2xl shadow-rose-300/60">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-white/20" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-white/20" />
              <p className="absolute inset-0 flex items-center justify-center text-rose-200/60 text-sm font-semibold">
                opening…
              </p>
            </div>
          </div>

          {/* Sparkle burst while opening */}
          <div className="relative mt-6 flex gap-4 text-3xl" aria-hidden="true">
            <span className="opacity-0 [animation:sparkle_0.7s_ease-out_0.3s_forwards]">✨</span>
            <span className="opacity-0 [animation:sparkle_0.7s_ease-out_0.5s_forwards]">💫</span>
            <span className="opacity-0 [animation:sparkle_0.7s_ease-out_0.4s_forwards]">✨</span>
          </div>
        </div>
      ) : null}

      {/* ════════════════════════════════════
          STAGE: REVEALED
          Gifts float out + sealed envelope.
      ════════════════════════════════════ */}
      {stage === "revealed" ? (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-5 py-10 overflow-hidden">
          {/* Background particle burst */}
          {REVEAL_PARTICLES.map(({ char, cls }, i) => (
            <span
              key={i}
              className={`absolute pointer-events-none select-none ${cls}`}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}

          <h1 className="text-3xl font-black text-rose-950 text-center mb-2 opacity-0 [animation:fade-up_0.5s_ease-out_0.1s_forwards]">
            Your Lovebox is open! 🎉
          </h1>
          <p className="text-stone-500 text-sm text-center mb-7 opacity-0 [animation:fade-up_0.5s_ease-out_0.22s_forwards]">
            Look what was packed for you
          </p>

          {/* Revealed gifts */}
          <div className="flex flex-wrap justify-center gap-5 mb-9 max-w-sm">
            {payload.gifts.length > 0 ? (
              payload.gifts.map((id, i) => {
                const gift = GIFTS.find((g) => g.id === id);
                if (!gift) return null;
                return (
                  <div
                    key={`${id}-${i}`}
                    className="flex flex-col items-center gap-1.5 opacity-0 [animation:gift-reveal_0.55s_ease-out_forwards]"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <span className="text-5xl drop-shadow-md" aria-hidden="true">
                      {gift.emoji}
                    </span>
                    <span className="text-[11px] font-semibold text-rose-700 bg-white border border-rose-100 px-2 py-0.5 rounded-full shadow-sm">
                      {gift.name}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-rose-300 text-sm">A surprise inside…</p>
            )}
          </div>

          {/* Sealed envelope — tap to open the letter */}
          <div className="opacity-0 [animation:fade-up_0.55s_ease-out_0.85s_forwards]">
            <p className="text-center text-stone-500 text-sm mb-3">There&apos;s a note inside 💌</p>
            <button
              className="flex flex-col items-center gap-2 group mx-auto"
              onClick={handleLetterOpen}
              aria-label="Open the letter"
            >
              <span className="text-7xl drop-shadow-lg group-hover:scale-105 group-active:scale-95 transition-transform [animation:bounce-soft_2.2s_ease-in-out_infinite_1s]">
                📩
              </span>
              <span className="text-rose-500 font-black text-sm">Tap to open the letter</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* ════════════════════════════════════
          STAGE: LETTER
          Letter unfolds and note is shown.
      ════════════════════════════════════ */}
      {stage === "letter" ? (
        <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10">
          <div className="w-full max-w-sm [animation:fade-up_0.45s_ease-out_forwards]">
            {/* Letter header */}
            <div className="text-center mb-5">
              <span className="text-5xl" aria-hidden="true">
                💌
              </span>
              <h2 className="text-2xl font-black text-rose-950 mt-2">Your letter</h2>
            </div>

            {/* Stationery paper unfolding */}
            <div className="bg-[#fffcf7] rounded-3xl border border-rose-100 shadow-xl overflow-hidden origin-top [animation:letter-drop_0.65s_ease-out_forwards]">
              {/* Paper header */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-rose-100 bg-rose-50/50">
                <span className="text-rose-300" aria-hidden="true">
                  💌
                </span>
                <span className="text-rose-400 text-sm font-medium">Lovebox Letter</span>
                <div className="ml-auto flex gap-1" aria-hidden="true">
                  <span className="text-rose-200 text-xs">♡</span>
                  <span className="text-rose-200 text-xs">♡</span>
                </div>
              </div>

              {/* Letter body */}
              <div
                className="px-6 py-5 pb-6 whitespace-pre-wrap text-[#3d1f1a] text-base leading-[1.8] min-h-48"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                {payload.note || "A message full of love…"}
              </div>
            </div>

            {/* Sign-off */}
            <p className="text-center text-rose-400 font-semibold mt-6 text-sm [animation:fade-up_0.5s_ease-out_0.5s_forwards] opacity-0">
              Sent with love, from far away ❤️
            </p>

            <div className="text-center mt-4">
              <Link
                href="/"
                className="text-stone-400 text-sm hover:text-stone-600 transition-colors"
              >
                Send your own Lovebox →
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
