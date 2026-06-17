"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import {
  emptyPayload,
  encodeLoveboxPayload,
  getGiftOption,
  loveboxDraftKey,
  type LoveboxPayload,
} from "@/lib/lovebox";

function readDraftPayload() {
  if (typeof window === "undefined") {
    return emptyPayload();
  }

  const saved = window.localStorage.getItem(loveboxDraftKey);

  if (!saved) {
    return emptyPayload();
  }

  try {
    return JSON.parse(saved) as LoveboxPayload;
  } catch {
    return emptyPayload();
  }
}

function subscribeToNoopStore() {
  return () => {};
}

function getBrowserOrigin() {
  return window.location.origin;
}

function getServerOrigin() {
  return "";
}

export default function SharePage() {
  const [payload] = useState<LoveboxPayload>(readDraftPayload);
  const [copied, setCopied] = useState(false);
  const origin = useSyncExternalStore(subscribeToNoopStore, getBrowserOrigin, getServerOrigin);

  const giftLink = useMemo(() => {
    if (!origin) {
      return "";
    }

    return `${origin}/open?box=${encodeLoveboxPayload(payload)}`;
  }, [origin, payload]);

  async function copyGiftLink() {
    await navigator.clipboard.writeText(giftLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-5 px-4 py-5">
      <section className="rounded-[2.3rem] border border-white/80 bg-white/75 p-6 shadow-2xl shadow-rose-200/50">
        <div className="text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] bg-rose-100 text-6xl shadow-inner">
            💌
          </div>
          <p className="mt-5 text-sm font-black uppercase tracking-[0.3em] text-rose-500">
            sealed and ready
          </p>
          <h1 className="mt-3 text-4xl font-black text-rose-950">Your Lovebox link is ready.</h1>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            Send this link to him. The package data is tucked inside the URL for now.
          </p>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-rose-100 bg-rose-50/70 p-4">
          <p className="text-sm font-black text-rose-950">Package contents</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {payload.gifts.map((packedGift) => {
              const gift = getGiftOption(packedGift.giftId);

              return (
                <span
                  className="rounded-full bg-white px-3 py-2 text-sm font-bold text-rose-800 shadow-sm"
                  key={packedGift.instanceId}
                >
                  {gift.emoji} {gift.name}
                </span>
              );
            })}
          </div>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-black text-rose-950">Shareable gift link</span>
          <input
            className="mt-2 w-full rounded-2xl border border-rose-100 bg-white px-3 py-3 text-sm text-stone-700"
            readOnly
            value={giftLink}
          />
        </label>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            className="rounded-full bg-rose-500 px-5 py-4 text-sm font-black text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-600"
            onClick={copyGiftLink}
            type="button"
          >
            {copied ? "Copied!" : "Copy gift link"}
          </button>
          <Link
            className="rounded-full bg-stone-900 px-5 py-4 text-center text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-800"
            href={giftLink || "/open"}
          >
            Preview opening
          </Link>
        </div>
      </section>
    </main>
  );
}
