"use client";

/*
  PAGE 3 — NOTE PAGE
  Write a little note on the stationery, then "Seal my letter!" plays a
  cute animation of the note tucking into an envelope.

  Edit the words/placeholder on this page in: data/config.js  (the "note" section)
*/

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Background from "@/components/Background";
import { CONFIG } from "@/data/config";
import { useGift } from "@/components/GiftProvider";

export default function NotePage() {
  const router = useRouter();
  const { note, setNote } = useGift();
  const [sealing, setSealing] = useState(false);

  function handleSeal() {
    setSealing(true);
    // Let the sealing animation play, then go to the share page.
    setTimeout(() => router.push("/share"), 2300);
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center px-4 py-5">
      <Background />

      {/* Closed box at the top */}
      <motion.img
        src="/assets/box-closed.png"
        alt="Your packed gift box"
        className="h-32 w-32 object-contain drop-shadow-[0_12px_16px_rgba(255,85,136,0.25)] sm:h-40 sm:w-40"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        draggable={false}
      />

      <h1 className="font-pixel mt-1 text-center text-base text-plum sm:text-xl">
        {CONFIG.note.title}
      </h1>

      {/* The stationery / little card you write on */}
      <div className="mt-5 w-full max-w-md flex-1">
        <div
          className="relative rounded-[1.5rem] border-4 border-white p-1 shadow-[0_14px_30px_rgba(107,59,94,0.15)]"
          style={{ background: "linear-gradient(180deg,#fffaf3,#fff1f4)" }}
        >
          {/* little decorative tape on the corners */}
          <span className="absolute -top-2 left-6 h-5 w-12 -rotate-6 rounded-sm bg-blush/70" />
          <span className="absolute -top-2 right-6 h-5 w-12 rotate-6 rounded-sm bg-blush/70" />

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={9}
            className="w-full resize-none rounded-[1.2rem] bg-transparent px-5 py-4 text-lg leading-8 text-plum outline-none placeholder:text-plum/35"
            style={{
              // subtle stationery lines
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 31px, rgba(107,59,94,0.10) 32px)",
            }}
          />
        </div>
      </div>

      <button className="btn-cute mt-4 mb-2" onClick={handleSeal} disabled={sealing}>
        {CONFIG.note.button}
      </button>

      {/* ───── Sealing animation overlay ───── */}
      <AnimatePresence>
        {sealing && <SealingAnimation note={note} />}
      </AnimatePresence>
    </main>
  );
}

// The cute "note tucks into an envelope and gets sealed" animation.
function SealingAnimation({ note }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative h-72 w-72">
        {/* The paper note flies down and shrinks into the envelope */}
        <motion.div
          className="absolute left-1/2 top-0 w-48 -translate-x-1/2 rounded-xl border-2 border-white bg-white p-3 text-left text-[10px] leading-snug text-plum shadow-lg"
          initial={{ y: -40, scale: 1, opacity: 1, rotate: -2 }}
          animate={{ y: 120, scale: 0.35, opacity: 0, rotate: 4 }}
          transition={{ duration: 1.1, ease: "easeIn", delay: 0.2 }}
        >
          <p className="line-clamp-6 whitespace-pre-line">
            {note || CONFIG.defaultNote}
          </p>
        </motion.div>

        {/* The envelope, which pops in and "seals" */}
        <motion.img
          src="/assets/envelope.png"
          alt="Envelope"
          className="absolute bottom-4 left-1/2 h-44 w-44 -translate-x-1/2 object-contain"
          initial={{ scale: 0.6, y: 30, opacity: 0 }}
          animate={{ scale: [0.6, 1.1, 1], y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          draggable={false}
        />

        {/* A heart "seal" pops on top at the end */}
        <motion.span
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-4xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 1], opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8, ease: "backOut" }}
        >
          ❤️
        </motion.span>

        <motion.p
          className="font-pixel absolute -bottom-6 left-1/2 w-72 -translate-x-1/2 text-center text-xs text-plum"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Sealed with love!
        </motion.p>
      </div>
    </motion.div>
  );
}
