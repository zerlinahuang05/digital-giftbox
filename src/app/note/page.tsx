"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { DEFAULT_NOTE } from "@/lib/gifts";

const DRAFT_KEY = "lovebox-draft";

// Read previously saved note from localStorage (lazy initializer — no useEffect needed).
function readSavedNote(): string {
  if (typeof window === "undefined") return DEFAULT_NOTE;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { note?: unknown };
      if (typeof parsed.note === "string") return parsed.note;
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_NOTE;
}

export default function NotePage() {
  const router = useRouter();
  const [note, setNote] = useState<string>(readSavedNote);

  // sealing: stationery is animating out
  // sealed:  full-screen envelope flash is showing
  const [sealing, setSealing] = useState(false);
  const [sealed, setSealed] = useState(false);

  function handleSeal() {
    // Save the note
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      const draft = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, note }));
    } catch {
      /* ignore */
    }

    // Trigger stationery fold-away animation, then show the full-screen seal flash,
    // then navigate.
    setSealing(true);
    // Let the stationery fold-away animation run for ~700 ms,
    // then show the full-screen envelope flash for ~900 ms, then navigate.
    window.setTimeout(() => setSealed(true), 700);
    window.setTimeout(() => router.push("/share"), 1900);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fff7f0] relative overflow-hidden">
      {/* ── Envelope seal flash overlay ──────────────────────── */}
      {sealed ? (
        <div className="fixed inset-0 z-50 bg-[#fff7f0] flex flex-col items-center justify-center [animation:fade-in_0.45s_ease-out_forwards]">
          <span className="text-8xl block mb-4 [animation:pop-in_0.5s_ease-out_forwards]">
            📮
          </span>
          <p className="text-rose-600 font-black text-xl [animation:fade-up_0.5s_ease-out_0.2s_forwards] opacity-0">
            Sealed with love!
          </p>
        </div>
      ) : null}

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="px-5 pt-5 pb-2 flex flex-col items-center text-center">
        <Link href="/pack" className="text-rose-400 text-sm font-bold self-start mb-3">
          ← Back
        </Link>

        {/* Small closed gift box icon */}
        <div className="relative w-16 h-[3.25rem] mb-3" aria-hidden="true">
          {/* Lid */}
          <div className="absolute inset-x-0 top-0 h-5 bg-rose-500 rounded-t-xl shadow border-b-2 border-rose-600">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-white/25" />
          </div>
          {/* Body */}
          <div className="absolute bottom-0 inset-x-0 h-[2.1rem] bg-rose-500 rounded-b-xl shadow-lg">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-white/25" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[5px] bg-white/25" />
          </div>
          {/* Bow */}
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg leading-none">
            🎀
          </span>
        </div>

        <h1 className="text-2xl font-black text-rose-950">Write your note</h1>
        <p className="text-stone-500 text-sm mt-1">A little letter to tuck inside the box</p>
      </header>

      {/* ── Stationery ──────────────────────────────────────── */}
      <div
        className={`
          relative flex-1 mx-4 mt-3 mb-4 rounded-3xl overflow-hidden
          shadow-xl border border-rose-100/60
          transition-opacity
          ${sealing ? "opacity-0 [animation:scale-out-up_0.65s_ease-in_forwards]" : "opacity-100"}
        `}
      >
        {/* Paper background */}
        <div className="absolute inset-0 bg-[#fffcf7]" />

        {/* Ruled lines */}
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-x-5 h-px bg-rose-100"
            style={{ top: `${88 + i * 38}px` }}
          />
        ))}

        {/* Paper header strip */}
        <div className="relative z-10 flex items-center gap-2 px-6 pt-5 pb-3 border-b border-rose-100">
          <span className="text-rose-300 text-lg" aria-hidden="true">
            💌
          </span>
          <span className="text-rose-400 text-sm font-medium tracking-wide">Lovebox Letter</span>
          <div className="ml-auto flex gap-1" aria-hidden="true">
            <span className="text-rose-200 text-xs">♡</span>
            <span className="text-rose-200 text-xs">♡</span>
            <span className="text-rose-200 text-xs">♡</span>
          </div>
        </div>

        {/* Textarea — styled to look like handwriting on the ruled paper */}
        <textarea
          className="relative z-10 w-full min-h-[300px] px-6 py-3 pb-6 bg-transparent resize-none outline-none text-[#3d1f1a] text-[1.05rem]"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif', lineHeight: "38px" }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write something sweet…"
          maxLength={600}
        />

        {/* Character count */}
        <p className="relative z-10 text-right px-6 pb-4 text-rose-300 text-xs">
          {note.length}/600
        </p>
      </div>

      {/* ── Seal button ─────────────────────────────────────── */}
      <div className="px-5 pb-6">
        <button
          className="w-full py-4 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-black text-base rounded-full shadow-xl shadow-rose-300/60 transition-all hover:-translate-y-0.5 disabled:opacity-60"
          onClick={handleSeal}
          disabled={sealing}
        >
          {sealing ? "Sealing… 📮" : "Seal my letter! 💌"}
        </button>
      </div>
    </div>
  );
}
