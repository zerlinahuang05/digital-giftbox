"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";

import { encodePayload, type GiftPayload } from "@/lib/encode";
import { GIFTS } from "@/lib/gifts";

const DRAFT_KEY = "lovebox-draft";

// Read the completed draft from localStorage (lazy initializer).
function readDraft(): GiftPayload {
  if (typeof window === "undefined") return { gifts: [], note: "" };
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return { gifts: [], note: "" };
    const parsed = JSON.parse(raw) as Partial<GiftPayload>;
    return {
      gifts: Array.isArray(parsed.gifts) ? parsed.gifts : [],
      note: typeof parsed.note === "string" ? parsed.note : "",
    };
  } catch {
    return { gifts: [], note: "" };
  }
}

// useSyncExternalStore helpers for browser origin (avoids hydration mismatch).
function noopSubscribe() {
  return () => {};
}

function getBrowserOrigin() {
  return window.location.origin;
}

function getServerOrigin() {
  return "";
}

export default function SharePage() {
  const [draft] = useState<GiftPayload>(readDraft);
  const [copied, setCopied] = useState(false);

  const origin = useSyncExternalStore(noopSubscribe, getBrowserOrigin, getServerOrigin);

  const giftLink = useMemo(() => {
    if (!origin) return "";
    return `${origin}/open?box=${encodePayload(draft)}`;
  }, [origin, draft]);

  async function copyLink() {
    if (!giftLink) return;
    await navigator.clipboard.writeText(giftLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-5 py-10">
      <div className="w-full max-w-sm">
        {/* Sealed envelope hero */}
        <div className="text-center mb-7">
          <span className="text-7xl [animation:pop-in_0.55s_ease-out_forwards] block mb-3">
            📮
          </span>
          <h1 className="text-3xl font-black text-rose-950">All sealed up! 💌</h1>
          <p className="text-stone-500 mt-2 text-sm leading-relaxed">
            Your Lovebox is ready to send.
          </p>
        </div>

        {/* Package contents preview */}
        <div className="bg-white rounded-3xl border border-rose-100 p-4 shadow-lg mb-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-rose-400 mb-3">
            Inside the box
          </p>
          <div className="flex flex-wrap gap-2">
            {draft.gifts.length > 0 ? (
              draft.gifts.map((id, i) => {
                const gift = GIFTS.find((g) => g.id === id);
                if (!gift) return null;
                return (
                  <span
                    key={`${id}-${i}`}
                    className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-800 text-sm font-semibold px-3 py-1.5 rounded-full"
                  >
                    <span aria-hidden="true">{gift.emoji}</span>
                    {gift.name}
                  </span>
                );
              })
            ) : (
              <span className="text-stone-400 text-sm">No gifts added yet.</span>
            )}
          </div>
        </div>

        {/* Shareable link */}
        <div className="mb-5">
          <label
            htmlFor="gift-link"
            className="block text-[11px] font-black uppercase tracking-[0.2em] text-stone-500 mb-2"
          >
            Gift link
          </label>
          <input
            id="gift-link"
            className="w-full bg-rose-50 border border-rose-200 rounded-2xl px-4 py-3 text-sm text-stone-700 outline-none focus:ring-2 focus:ring-rose-300 font-mono select-all"
            readOnly
            value={giftLink}
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            className="w-full py-4 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-black rounded-full shadow-xl shadow-rose-300/60 transition-all hover:-translate-y-0.5"
            onClick={copyLink}
          >
            {copied ? "Copied! ✓" : "Copy gift link 📋"}
          </button>

          <Link
            href={giftLink || "/open"}
            className="w-full py-4 bg-white hover:bg-rose-50 text-rose-600 font-black rounded-full border-2 border-rose-200 text-center transition-all hover:-translate-y-0.5 shadow-sm"
          >
            Preview opening ↗
          </Link>

          <Link
            href="/pack"
            className="text-center text-stone-400 text-sm hover:text-stone-600 transition-colors mt-1"
          >
            ← Edit gifts
          </Link>
        </div>
      </div>
    </div>
  );
}
