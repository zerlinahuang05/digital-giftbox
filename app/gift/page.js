"use client";

/*
  PAGE 5 — RECEIVER PAGE  (what your special someone opens)
  This page reads the gift straight out of the link (?d=...), then:
    1) plays a cute delivery-tracking timeline
    2) shows the package to open
    3) bursts open with confetti and reveals the gifts + the letter

  Edit the words on this page in: data/config.js  (the "receiver" section)
*/

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Background from "@/components/Background";
import GiftImage from "@/components/GiftImage";
import { CONFIG } from "@/data/config";
import { decodeGift } from "@/lib/giftCode";
import { getGiftById } from "@/data/gifts";

export default function GiftPage() {
  return (
    <Suspense fallback={<Loading />}>
      <GiftReceiver />
    </Suspense>
  );
}

function Loading() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <p className="font-pixel text-sm text-plum">Loading your gift…</p>
    </main>
  );
}

function GiftReceiver() {
  const params = useSearchParams();
  const code = params.get("d");
  const gift = code ? decodeGift(code) : null;

  // phases: "tracking" -> "package" -> "reveal"
  const [phase, setPhase] = useState("tracking");

  if (!gift) return <BrokenGift />;

  const chosen = (gift.gifts || []).map(getGiftById).filter(Boolean);

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-8">
      <Background />
      <AnimatePresence mode="wait">
        {phase === "tracking" && (
          <Tracking key="tracking" onDone={() => setPhase("package")} />
        )}
        {phase === "package" && (
          <Package key="package" onOpen={() => setPhase("reveal")} />
        )}
        {phase === "reveal" && (
          <Reveal key="reveal" gifts={chosen} note={gift.note} />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ─────────────────────────  PHASE 1: TRACKING  ───────────────────────── */
function Tracking({ onDone }) {
  const steps = CONFIG.receiver.trackingSteps;
  const [active, setActive] = useState(0);
  const [finished, setFinished] = useState(false);

  // Light up each tracking step one by one.
  useEffect(() => {
    if (active >= steps.length - 1) {
      const t = setTimeout(() => setFinished(true), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActive((n) => n + 1), 950);
    return () => clearTimeout(t);
  }, [active, steps.length]);

  // How far down the line is "filled in" (0% to 100%)
  const fillPct = (active / (steps.length - 1)) * 100;
  const iconTop = `calc(${fillPct}% - ${6 + fillPct * 0.24}px)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-sm"
    >
      <h1 className="font-pixel text-center text-sm text-plum sm:text-base">
        Tracking your delivery
      </h1>

      <div className="card-cute mt-6 p-6">
        <div className="relative pl-12">
          {/* the rail (grey background line) */}
          <div className="absolute left-[14px] top-2 bottom-2 w-1.5 rounded-full bg-blush/60" />
          {/* the filled-in (solid color) progress line */}
          <motion.div
            className="absolute left-[14px] top-2 w-1.5 rounded-full bg-pink"
            initial={{ height: 0 }}
            animate={{ height: `calc(${fillPct}% - 0px)` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ maxHeight: "calc(100% - 16px)" }}
          />
          {/* the traveling mail icon */}
          <motion.div
            className="absolute left-0 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-pink text-lg shadow-md"
            initial={{ top: 0 }}
            animate={{ top: iconTop }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            ✉️
          </motion.div>

          {/* the steps */}
          <ul className="space-y-9">
            {steps.map((label, i) => {
              const done = i <= active;
              return (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className={`-ml-[42px] flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs transition-colors ${
                      done
                        ? "border-pink bg-pink text-white"
                        : "border-blush bg-white text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span
                    className={`text-sm font-bold transition-colors ${
                      done ? "text-plum" : "text-plum/40"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-center font-pixel text-xs text-plum">
        {CONFIG.receiver.packageCount}
      </p>

      <div className="mt-4 flex justify-center">
        <button
          className="btn-cute"
          onClick={onDone}
          style={{ opacity: finished ? 1 : 0.5 }}
          disabled={!finished}
        >
          {CONFIG.receiver.revealButton}
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────  PHASE 2: THE PACKAGE  ───────────────────────── */
function Package({ onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center text-center"
    >
      <p className="font-pixel text-sm text-plum">A package arrived! 📬</p>
      <motion.img
        src="/assets/box-closed.png"
        alt="A closed gift package"
        className="my-6 h-56 w-56 object-contain drop-shadow-[0_16px_22px_rgba(255,85,136,0.3)] sm:h-64 sm:w-64"
        animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        draggable={false}
      />
      <button className="btn-cute" onClick={onOpen}>
        {CONFIG.receiver.openButton}
      </button>
    </motion.div>
  );
}

/* ─────────────────────────  PHASE 3: THE REVEAL  ───────────────────────── */
function Reveal({ gifts, note }) {
  const [letterOpen, setLetterOpen] = useState(false);
  const firedRef = useRef(false);

  // Burst confetti when the reveal first appears.
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    burstConfetti();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-full max-w-md flex-col items-center text-center"
    >
      {/* The lid pops up and off */}
      <motion.img
        src="/assets/box-lid.png"
        alt=""
        className="pointer-events-none h-24 w-28 object-contain"
        initial={{ y: 60, opacity: 1, scale: 0.8 }}
        animate={{ y: -30, opacity: [1, 1, 0], rotate: -18, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        draggable={false}
      />

      <motion.h1
        className="font-pixel -mt-2 text-base text-plum sm:text-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        Surprise! 🎉
      </motion.h1>

      {/* The gifts popping out */}
      <div className="mt-6 flex flex-wrap items-end justify-center gap-5">
        {gifts.map((g, i) => (
          <motion.div
            key={g.id}
            className="flex flex-col items-center"
            initial={{ y: 80, scale: 0, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{
              delay: 0.4 + i * 0.25,
              type: "spring",
              bounce: 0.55,
              duration: 0.8,
            }}
          >
            <GiftImage
              gift={g}
              className="h-24 w-24 object-contain drop-shadow-lg sm:h-28 sm:w-28"
            />
            <span className="mt-1 rounded-full bg-white/80 px-3 py-0.5 text-xs font-bold text-plum shadow-sm">
              {g.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* The closed letter — tap to open */}
      <motion.div
        className="mt-10 flex flex-col items-center"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 + gifts.length * 0.25 }}
      >
        <button
          onClick={() => {
            setLetterOpen(true);
            burstConfetti();
          }}
          className="transition-transform hover:scale-105 active:scale-95"
        >
          <motion.img
            src="/assets/envelope.png"
            alt="A sealed letter"
            className="h-28 w-28 object-contain drop-shadow-lg"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />
        </button>
        <p className="mt-2 text-sm font-bold text-plum/60">
          {CONFIG.receiver.openLetterHint}
        </p>
      </motion.div>

      {/* The opened letter overlay */}
      <AnimatePresence>
        {letterOpen && (
          <Letter note={note} onClose={() => setLetterOpen(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Letter({ note, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-plum/30 p-5 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-sm rounded-[1.5rem] border-4 border-white p-1 shadow-2xl"
        style={{ background: "linear-gradient(180deg,#fffaf3,#fff1f4)" }}
        initial={{ scale: 0.6, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="absolute -top-2 left-8 h-5 w-12 -rotate-6 rounded-sm bg-blush/70" />
        <span className="absolute -top-2 right-8 h-5 w-12 rotate-6 rounded-sm bg-blush/70" />
        <div
          className="flex min-h-[220px] items-center justify-center whitespace-pre-line rounded-[1.2rem] px-6 py-6 text-center text-lg leading-8 text-plum"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 31px, rgba(107,59,94,0.10) 32px)",
          }}
        >
          {note || CONFIG.defaultNote}
        </div>
        <button onClick={onClose} className="btn-cute btn-soft mx-auto my-3 flex">
          close letter
        </button>
      </motion.div>
    </motion.div>
  );
}

function BrokenGift() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <Background />
      <span className="text-6xl">📦</span>
      <h1 className="font-pixel mt-4 text-base text-plum">
        {CONFIG.receiver.emptyTitle}
      </h1>
      <p className="mt-3 max-w-xs font-medium text-plum/60">
        {CONFIG.receiver.emptyText}
      </p>
      <Link href="/" className="btn-cute mt-8">
        Make your own gift
      </Link>
    </main>
  );
}

// Cute confetti burst (loaded only in the browser, when needed).
async function burstConfetti() {
  try {
    const confetti = (await import("canvas-confetti")).default;
    const colors = ["#ff7aa2", "#ffd479", "#bdeccd", "#cfe6ff", "#ff5588"];
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 }, colors });
    setTimeout(
      () => confetti({ particleCount: 60, spread: 100, origin: { y: 0.5 }, colors }),
      250
    );
  } catch {
    // confetti is just for fun; ignore if it fails
  }
}
