"use client";

/*
  PAGE 4 — SHARE / SEND PAGE
  Builds the magic gift link (the whole gift is stored INSIDE the link,
  so no database is needed). Copy it, or preview it as the receiver.

  Edit the words on this page in: data/config.js  (the "share" section)
*/

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Background from "@/components/Background";
import GiftImage from "@/components/GiftImage";
import { CONFIG } from "@/data/config";
import { useGift } from "@/components/GiftProvider";
import { encodeGift } from "@/lib/giftCode";
import { getGiftById } from "@/data/gifts";

export default function SharePage() {
  const { gifts, note } = useGift();
  const [link, setLink] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Build the link after the page loads (we need the browser's address).
  useEffect(() => {
    const c = encodeGift({ gifts, note });
    setCode(c);
    setLink(`https://digital-giftbox.vercel.app/gift?d=${c}`);
  }, [gifts, note]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const chosen = gifts.map(getGiftById).filter(Boolean);

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-8 text-center">
      <Background />

      <motion.img
        src="/assets/box-closed.png"
        alt="Your sealed gift"
        className="h-36 w-36 object-contain drop-shadow-[0_14px_18px_rgba(255,85,136,0.25)] sm:h-44 sm:w-44"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.7 }}
        draggable={false}
      />

      <h1 className="font-pixel mt-3 text-lg text-plum sm:text-2xl">
        {CONFIG.share.title}
      </h1>
      <p className="mt-3 max-w-sm font-medium text-plum/60">
        {CONFIG.share.subtitle}
      </p>

      {/* A tiny preview of what's inside */}
      <div className="card-cute mt-6 w-full max-w-sm p-4">
        <p className="text-sm font-bold text-plum/70">Inside this box:</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {chosen.length > 0 ? (
            chosen.map((g) => (
              <div key={g.id} className="flex flex-col items-center">
                <GiftImage gift={g} className="h-12 w-12 object-contain" />
                <span className="text-xs font-semibold text-plum/60">{g.name}</span>
              </div>
            ))
          ) : (
            <span className="text-sm text-plum/50">No gifts yet</span>
          )}
          <div className="flex flex-col items-center">
            <span className="text-3xl">💌</span>
            <span className="text-xs font-semibold text-plum/60">a note</span>
          </div>
        </div>
      </div>

      {/* The link itself */}
      <div className="mt-5 w-full max-w-sm truncate rounded-2xl border-2 border-blush bg-white/80 px-4 py-3 text-xs font-semibold text-plum/60">
        {link || "Building your link..."}
      </div>

      <div className="mt-5 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
        <button className="btn-cute" onClick={copyLink}>
          {copied ? "Copied! 💕" : CONFIG.share.copyButton}
        </button>
        <Link href={`/gift?d=${code}`} className="btn-cute btn-soft">
          {CONFIG.share.previewButton}
        </Link>
      </div>

      <Link href="/" className="mt-8 text-sm font-bold text-plum/40 underline">
        ← start over
      </Link>
    </main>
  );
}
