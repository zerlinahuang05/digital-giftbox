"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { decodeLoveboxPayload, getGiftOption } from "@/lib/lovebox";

const trackingSteps = [
  "Packed with care",
  "Sealed with a note",
  "Sent across 2,000 miles",
  "Delivered to you",
];

export function OpenGift() {
  const searchParams = useSearchParams();
  const [isDelivered, setIsDelivered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const payload = useMemo(
    () => decodeLoveboxPayload(searchParams.get("box")),
    [searchParams],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setIsDelivered(true), 1400);

    return () => window.clearTimeout(timer);
  }, []);

  function openPackage() {
    setIsOpening(true);
    window.setTimeout(() => setIsOpen(true), 3000);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-4 py-6">
      <section className="rounded-[2.3rem] border border-white/80 bg-white/75 p-5 shadow-2xl shadow-rose-200/50 backdrop-blur">
        {!isOpen ? (
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-500">
              delivery tracking
            </p>
            <h1 className="mt-3 text-4xl font-black text-rose-950">Your Lovebox is arriving.</h1>

            <div className="my-6 space-y-3 text-left">
              {trackingSteps.map((step, index) => (
                <div
                  className="flex items-center gap-3 rounded-3xl bg-rose-50/80 p-3 opacity-0 [animation:parcel-pop_0.45s_ease-out_forwards]"
                  key={step}
                  style={{ animationDelay: `${index * 180}ms` }}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-black text-rose-950">{step}</span>
                </div>
              ))}
            </div>

            <div
              className={`rounded-[2rem] bg-gradient-to-br from-rose-200 via-orange-100 to-pink-100 p-4 ${
                isOpening ? "ring-4 ring-rose-200 [animation:float-soft_0.45s_ease-in-out_infinite]" : ""
              }`}
            >
              <div className="relative mx-auto h-40 w-52">
                <div
                  className={`absolute left-8 top-4 h-16 w-36 rounded-t-3xl bg-rose-300 shadow-lg ${
                    isOpening ? "[animation:lid-open_1s_ease-out_forwards]" : ""
                  }`}
                />
                {isOpening ? (
                  <div className="absolute left-1/2 top-6 -translate-x-1/2 text-4xl">✨</div>
                ) : null}
                <div className="absolute bottom-4 left-6 h-28 w-40 rounded-[2rem] bg-rose-500 shadow-xl shadow-rose-300" />
                <div className="absolute bottom-4 left-1/2 h-28 w-6 -translate-x-1/2 bg-rose-200" />
                <div className="absolute bottom-16 left-6 h-6 w-40 bg-rose-200" />
                <div className="absolute bottom-11 left-0 h-10 w-52 rounded-2xl bg-white/60" />
              </div>
            </div>

            {isOpening ? (
              <p className="mt-4 rounded-full bg-rose-100 px-4 py-3 text-sm font-black uppercase tracking-[0.2em] text-rose-700">
                Opening your Lovebox...
              </p>
            ) : null}

            {isDelivered ? (
              <div className="mt-5 space-y-4">
                <h2 className="text-3xl font-black text-rose-950">You have 1 package!</h2>
                <button
                  className="rounded-full bg-rose-500 px-7 py-4 text-base font-black text-white shadow-xl shadow-rose-300 transition hover:-translate-y-0.5 hover:bg-rose-600"
                  disabled={isOpening}
                  onClick={openPackage}
                  type="button"
                >
                  {isOpening ? "Opening..." : "Open package"}
                </button>
              </div>
            ) : (
              <p className="mt-5 text-sm font-bold text-stone-500">Out for delivery...</p>
            )}
          </div>
        ) : (
          <div className="space-y-5 text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-500">
              delivered
            </p>
            <h1 className="text-4xl font-black text-rose-950">Your Lovebox is open.</h1>

            <div className="grid gap-3 sm:grid-cols-2">
              {payload.gifts.length ? (
                payload.gifts.map((packedGift) => {
                  const gift = getGiftOption(packedGift.giftId);

                  return (
                    <article
                      className={`rounded-[1.6rem] bg-gradient-to-br ${gift.color} p-3 text-left shadow-lg shadow-rose-100`}
                      key={packedGift.instanceId}
                    >
                      <div className="rounded-[1.3rem] bg-white/75 p-4">
                        <span className="text-4xl" aria-hidden="true">
                          {gift.emoji}
                        </span>
                        <h2 className="mt-2 text-lg font-black text-rose-950">{gift.name}</h2>
                        <p className="mt-1 text-sm leading-6 text-stone-700">{packedGift.note}</p>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="rounded-3xl bg-rose-50 p-5 text-sm text-stone-600">
                  This package was shy, but it still arrived with love.
                </p>
              )}
            </div>

            <article className="rounded-[2rem] border border-rose-100 bg-[#fffaf4] p-5 text-left shadow-inner">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-rose-500">
                the letter
              </p>
              <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-stone-800">
                {payload.letter}
              </p>
            </article>

            <p className="text-lg font-black text-rose-700">Sent with love, from far away.</p>
            <Link className="text-sm font-bold text-stone-600 underline" href="/">
              Make another Lovebox
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
