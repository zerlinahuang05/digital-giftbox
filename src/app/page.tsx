"use client";

import { useMemo, useState } from "react";
import { defaultNote, gifts, type GiftId } from "@/lib/gifts";

export default function Home() {
  const [selectedGiftId, setSelectedGiftId] = useState<GiftId>("flowers");
  const [note, setNote] = useState(defaultNote);
  const [copied, setCopied] = useState(false);

  const selectedGift = gifts.find((gift) => gift.id === selectedGiftId) ?? gifts[0];

  const giftLink = useMemo(() => {
    const params = new URLSearchParams({
      gift: selectedGiftId,
      note,
    });
    const origin = typeof window === "undefined" ? "" : window.location.origin;

    return `${origin}/open?${params.toString()}`;
  }, [note, selectedGiftId]);

  async function copyGiftLink() {
    await navigator.clipboard.writeText(giftLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/65 shadow-2xl shadow-rose-200/40 backdrop-blur">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="flex flex-col justify-center gap-6">
            <p className="w-fit rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">
              Digital Giftbox
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-rose-950 sm:text-6xl">
                Send him a tiny love gift.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-stone-700">
                Pick something sweet, write a note, preview the surprise, and share a
                cozy opening page made for a short romantic video.
              </p>
            </div>
            <a
              className="w-fit rounded-full bg-rose-500 px-6 py-3 text-base font-bold text-white shadow-lg shadow-rose-300 transition hover:-translate-y-0.5 hover:bg-rose-600"
              href="#build"
            >
              Build his gift
            </a>
          </div>

          <div className="rounded-[1.75rem] bg-gradient-to-br from-rose-200 via-amber-100 to-pink-100 p-5">
            <div className="rounded-[1.4rem] border border-white/80 bg-white/70 p-6 text-center shadow-xl">
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-white text-6xl shadow-inner">
                🎁
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-rose-500">
                Made with love
              </p>
              <h2 className="mt-3 text-3xl font-black text-rose-950">For my favorite person</h2>
              <p className="mt-4 text-stone-700">
                A soft little page he can tap open whenever he misses you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="build"
        className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-xl shadow-orange-100/70 backdrop-blur sm:p-7 lg:grid-cols-[1fr_0.9fr]"
      >
        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose-500">
              Step 1
            </p>
            <h2 className="mt-2 text-2xl font-black text-rose-950">Choose a digital gift</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {gifts.map((gift) => {
              const isSelected = selectedGiftId === gift.id;

              return (
                <button
                  aria-pressed={isSelected}
                  className={`rounded-3xl border p-4 text-left transition ${
                    isSelected
                      ? "border-rose-400 bg-rose-50 shadow-lg shadow-rose-100"
                      : "border-rose-100 bg-white/75 hover:-translate-y-0.5 hover:border-rose-300"
                  }`}
                  key={gift.id}
                  onClick={() => setSelectedGiftId(gift.id)}
                  type="button"
                >
                  <span className="text-4xl" aria-hidden="true">
                    {gift.emoji}
                  </span>
                  <span className="mt-3 block text-lg font-black text-rose-950">{gift.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-stone-600">
                    {gift.tagline}
                  </span>
                </button>
              );
            })}
          </div>

          <label className="block">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-rose-500">
              Step 2
            </span>
            <span className="mt-2 block text-2xl font-black text-rose-950">
              Write a personal note
            </span>
            <textarea
              className="mt-4 min-h-40 w-full resize-none rounded-3xl border border-rose-100 bg-white/90 p-4 text-base leading-7 text-stone-800 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
              maxLength={280}
              onChange={(event) => setNote(event.target.value)}
              value={note}
            />
          </label>
          <p className="text-sm text-stone-500">{note.length}/280 characters</p>
        </div>

        <aside className="space-y-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose-500">
              Step 3
            </p>
            <h2 className="mt-2 text-2xl font-black text-rose-950">Preview before sending</h2>
          </div>

          <div
            className={`rounded-[2rem] bg-gradient-to-br ${selectedGift.color} p-4 shadow-xl shadow-rose-100`}
          >
            <div className="rounded-[1.5rem] border border-white/80 bg-white/75 p-5 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white text-5xl shadow-inner">
                {selectedGift.emoji}
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose-500">
                Open me
              </p>
              <h3 className="mt-2 text-3xl font-black text-rose-950">{selectedGift.name}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-700">{selectedGift.description}</p>
              <p className="mt-5 rounded-3xl bg-white/80 p-4 text-left text-base leading-7 text-stone-800">
                {note || "Write something sweet to make the preview feel personal."}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-rose-100 bg-white/80 p-4">
            <label className="text-sm font-bold text-rose-900" htmlFor="gift-link">
              Final gift-opening link
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-rose-100 bg-rose-50 px-3 py-3 text-sm text-stone-700"
              id="gift-link"
              readOnly
              value={giftLink}
            />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <a
                className="rounded-full bg-stone-900 px-5 py-3 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
                href={giftLink}
              >
                Open final page
              </a>
              <button
                className="rounded-full bg-rose-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-rose-600"
                onClick={copyGiftLink}
                type="button"
              >
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
