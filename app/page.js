"use client";

/*
  PAGE 1 — LANDING PAGE  (this is the homepage, the very first screen)
  Edit the words on this page in: data/config.js  (the "landing" section)
*/

import Link from "next/link";
import { motion } from "framer-motion";
import Background from "@/components/Background";
import { CONFIG } from "@/data/config";

export default function LandingPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-12 text-center">
      <Background />

      {/* A cute floating gift box on top */}
      <motion.img
        src="/assets/box-closed.png"
        alt="A gift box"
        className="mb-2 h-40 w-40 object-contain drop-shadow-[0_14px_18px_rgba(255,85,136,0.25)] sm:h-52 sm:w-52"
        initial={{ y: 20, opacity: 0, scale: 0.8 }}
        animate={{ y: [0, -12, 0], opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 0.6, type: "spring", bounce: 0.5 },
          y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
        }}
        draggable={false}
      />

      <motion.h1
        className="font-pixel whitespace-pre-line text-2xl leading-relaxed text-plum drop-shadow-sm sm:text-4xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {CONFIG.landing.title}
      </motion.h1>

      <motion.p
        className="mt-6 max-w-sm text-lg font-medium text-plum/70"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {CONFIG.landing.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10"
      >
        <Link href="/pack" className="btn-cute text-base">
          {CONFIG.landing.button}
        </Link>
      </motion.div>

      <p className="mt-8 text-sm font-semibold text-plum/40">
        made with love · {CONFIG.appName}
      </p>
    </main>
  );
}
