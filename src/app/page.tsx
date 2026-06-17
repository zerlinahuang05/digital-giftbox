import Link from "next/link";

// Decorative background particles — hearts and sparkles scattered around.
// Each item has the character to render and Tailwind classes for position + animation.
const BG_PARTICLES = [
  {
    char: "♡",
    cls: "left-[7%] top-[14%] text-rose-200 text-5xl [animation:heart-rise_4.8s_ease-in-out_infinite_0.2s]",
  },
  {
    char: "✦",
    cls: "left-[88%] top-[20%] text-amber-200 text-3xl [animation:sparkle_3.2s_ease-in-out_infinite_1s]",
  },
  {
    char: "♡",
    cls: "left-[80%] top-[62%] text-pink-200 text-4xl [animation:heart-rise_5.1s_ease-in-out_infinite_1.8s]",
  },
  {
    char: "✦",
    cls: "left-[10%] top-[68%] text-rose-200 text-2xl [animation:sparkle_2.9s_ease-in-out_infinite_0.7s]",
  },
  {
    char: "♡",
    cls: "left-[48%] top-[6%] text-pink-200 text-2xl [animation:heart-rise_3.8s_ease-in-out_infinite_2.2s]",
  },
  {
    char: "✿",
    cls: "left-[22%] top-[84%] text-rose-200 text-3xl [animation:float-soft_4.2s_ease-in-out_infinite_1.1s]",
  },
  {
    char: "✦",
    cls: "left-[65%] top-[80%] text-amber-200 text-xl [animation:sparkle_3.5s_ease-in-out_infinite_0.4s]",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-5 overflow-hidden">
      {/* Background particles */}
      {BG_PARTICLES.map(({ char, cls }, i) => (
        <span
          key={i}
          className={`absolute pointer-events-none select-none ${cls}`}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}

      {/* Hero card */}
      <div className="relative z-10 text-center max-w-sm w-full">
        {/* Badge */}
        <p className="inline-block bg-rose-100 text-rose-600 text-xs font-black uppercase tracking-[0.22em] px-4 py-2 rounded-full mb-8 opacity-0 [animation:fade-up_0.6s_ease-out_0.05s_forwards]">
          Lovebox 💝
        </p>

        {/* Main headline */}
        <h1 className="text-[2.75rem] sm:text-6xl font-black leading-[1.08] tracking-tight text-rose-950 mb-5 opacity-0 [animation:fade-up_0.65s_ease-out_0.18s_forwards]">
          A little package,
          <br />
          just for&nbsp;you.
        </h1>

        {/* Subtitle */}
        <p className="text-stone-600 text-lg leading-relaxed mb-10 opacity-0 [animation:fade-up_0.65s_ease-out_0.32s_forwards]">
          Send a tiny digital gift when distance feels too far.
        </p>

        {/* CTA button */}
        <Link
          href="/pack"
          className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-black text-lg px-9 py-4 rounded-full shadow-2xl shadow-rose-300/70 transition-all hover:-translate-y-0.5 opacity-0 [animation:fade-up_0.65s_ease-out_0.45s_forwards]"
        >
          Send a digital gift!
          <span aria-hidden="true">💝</span>
        </Link>

        {/* Tiny footnote */}
        <p className="text-stone-400 text-sm mt-5 opacity-0 [animation:fade-up_0.65s_ease-out_0.58s_forwards]">
          Free · No sign-up · Made with love
        </p>
      </div>

      {/* Decorative oversized gift box, bottom-right corner */}
      <div
        className="absolute bottom-0 right-[-1rem] w-52 h-52 pointer-events-none select-none text-[9rem] flex items-end justify-end opacity-[0.08] [animation:float-soft_5s_ease-in-out_infinite]"
        aria-hidden="true"
      >
        🎁
      </div>
    </main>
  );
}
