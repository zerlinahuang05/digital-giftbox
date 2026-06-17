"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  defaultLetter,
  emptyPayload,
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

export default function NotePage() {
  const router = useRouter();
  const [payload] = useState<LoveboxPayload>(readDraftPayload);
  const [letter, setLetter] = useState(() => payload.letter || defaultLetter);

  function sealLetter() {
    const nextPayload = {
      ...payload,
      letter,
    };

    window.localStorage.setItem(loveboxDraftKey, JSON.stringify(nextPayload));
    router.push("/share");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-5 px-4 py-5">
      <header className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-xl shadow-rose-100">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-rose-500">
          stationery page
        </p>
        <h1 className="mt-2 text-3xl font-black text-rose-950">Write the main letter.</h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          This is the big note he will read after opening the package.
        </p>
      </header>

      <section className="rounded-[2rem] border border-rose-100 bg-white/80 p-5 shadow-xl shadow-orange-100">
        <h2 className="text-lg font-black text-rose-950">Packed gifts</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {payload.gifts.length ? (
            payload.gifts.map((packedGift) => {
              const gift = getGiftOption(packedGift.giftId);

              return (
                <span
                  className="rounded-full bg-rose-100 px-3 py-2 text-sm font-bold text-rose-800"
                  key={packedGift.instanceId}
                >
                  {gift.emoji} {gift.name}
                </span>
              );
            })
          ) : (
            <Link className="text-sm font-bold text-rose-600 underline" href="/pack">
              Add gifts before sealing your Lovebox.
            </Link>
          )}
        </div>
      </section>

      <section className="relative flex flex-1 flex-col rounded-[2rem] border border-rose-100 bg-[#fffaf4] p-5 shadow-2xl shadow-rose-100">
        <div className="absolute inset-x-6 top-16 border-t border-rose-100" />
        <div className="absolute inset-x-6 top-28 border-t border-rose-100" />
        <div className="absolute inset-x-6 top-40 border-t border-rose-100" />
        <label className="relative z-10 flex flex-1 flex-col">
          <span className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-rose-500">
            Dear love,
          </span>
          <textarea
            className="min-h-80 flex-1 resize-none rounded-[1.5rem] border border-rose-100 bg-white/65 p-4 text-base leading-8 text-stone-800 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
            onChange={(event) => setLetter(event.target.value)}
            value={letter}
          />
        </label>
      </section>

      <button
        className="rounded-full bg-rose-500 px-6 py-4 text-base font-black text-white shadow-xl shadow-rose-300 transition hover:-translate-y-0.5 hover:bg-rose-600"
        onClick={sealLetter}
        type="button"
      >
        Seal my letter!
      </button>
    </main>
  );
}
