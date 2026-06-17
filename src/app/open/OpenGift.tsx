"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { defaultNote, getGiftById } from "@/lib/gifts";

export function OpenGift() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const gift = getGiftById(searchParams.get("gift"));
  const note = searchParams.get("note") || defaultNote;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <section
        className={`w-full max-w-md rounded-[2rem] bg-gradient-to-br ${gift.color} p-4 shadow-2xl shadow-rose-200`}
      >
        <div className="rounded-[1.6rem] border border-white/80 bg-white/75 p-5 text-center backdrop-blur">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-rose-500">
            Digital Giftbox
          </p>
          <h1 className="mt-3 text-4xl font-black text-rose-950">
            {isOpen ? "A gift for you" : "Tap to open"}
          </h1>

          <button
            className={`mx-auto my-8 flex h-44 w-44 items-center justify-center rounded-[2rem] bg-white text-7xl shadow-xl shadow-rose-200 transition duration-500 ${
              isOpen ? "rotate-2 scale-105" : "hover:-translate-y-1 hover:rotate-3"
            }`}
            onClick={() => setIsOpen(true)}
            type="button"
          >
            <span aria-hidden="true">{isOpen ? gift.emoji : "🎁"}</span>
            <span className="sr-only">Open the digital gift</span>
          </button>

          {isOpen ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose-500">
                  {gift.name}
                </p>
                <h2 className="mt-2 text-2xl font-black text-rose-950">{gift.tagline}</h2>
                <p className="mt-3 text-sm leading-6 text-stone-700">{gift.description}</p>
              </div>
              <p className="rounded-3xl bg-white/80 p-5 text-left text-base leading-7 text-stone-800 shadow-inner">
                {note}
              </p>
              <Link
                className="inline-flex rounded-full bg-rose-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-600"
                href="/"
              >
                Make another gift
              </Link>
            </div>
          ) : (
            <p className="mx-auto max-w-xs text-base leading-7 text-stone-700">
              A soft little surprise is waiting inside. Press the box when you are ready.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
