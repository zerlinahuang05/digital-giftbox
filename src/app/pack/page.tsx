"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { GIFTS } from "@/lib/gifts";

const DRAFT_KEY = "lovebox-draft";

// Read previously saved gift IDs from localStorage (used as lazy initializer).
function readSavedGifts(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { gifts?: unknown };
    return Array.isArray(parsed.gifts) ? (parsed.gifts as string[]) : [];
  } catch {
    return [];
  }
}

export default function PackPage() {
  const router = useRouter();

  // IDs of gifts packed into the box (may have duplicates).
  const [boxedIds, setBoxedIds] = useState<string[]>(readSavedGifts);

  // Drag state — we use both state (for rendering the ghost) and refs
  // (for stable values inside the pointer event handlers).
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [overBox, setOverBox] = useState(false);
  const dragIdRef = useRef<string | null>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const boxRef = useRef<HTMLDivElement>(null);

  // Attach / detach global pointer listeners while dragging.
  useEffect(() => {
    if (!dragId) return;

    function onMove(e: PointerEvent) {
      e.preventDefault();
      setDragPos({ x: e.clientX, y: e.clientY });
      if (boxRef.current) {
        const r = boxRef.current.getBoundingClientRect();
        setOverBox(
          e.clientX > r.left &&
            e.clientX < r.right &&
            e.clientY > r.top &&
            e.clientY < r.bottom,
        );
      }
    }

    function onUp(e: PointerEvent) {
      const sp = startPosRef.current;
      const moved = Math.hypot(e.clientX - sp.x, e.clientY - sp.y);

      if (boxRef.current) {
        const r = boxRef.current.getBoundingClientRect();
        const inBox =
          e.clientX > r.left &&
          e.clientX < r.right &&
          e.clientY > r.top &&
          e.clientY < r.bottom;

        // Add to box if: dropped over box OR barely moved (tap gesture).
        if (inBox || moved < 10) {
          const id = dragIdRef.current;
          if (id) setBoxedIds((prev) => [...prev, id]);
        }
      }

      setDragId(null);
      setOverBox(false);
      dragIdRef.current = null;
    }

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragId]);

  function startDrag(e: React.PointerEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    dragIdRef.current = id;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setDragId(id);
    setDragPos({ x: e.clientX, y: e.clientY });
  }

  function removeFromBox(index: number) {
    setBoxedIds((prev) => prev.filter((_, i) => i !== index));
  }

  function handleContinue() {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      const draft = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, gifts: boxedIds }));
    } catch {
      /* ignore */
    }
    router.push("/note");
  }

  const dragGift = dragId ? GIFTS.find((g) => g.id === dragId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#fff7f0]">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="px-5 pt-5 pb-3 flex flex-col items-center text-center">
        <Link href="/" className="text-rose-400 text-sm font-bold self-start mb-3">
          ← Back
        </Link>
        <h1 className="text-2xl font-black text-rose-950">Pack your Lovebox</h1>
        <p className="text-stone-500 text-sm mt-1">
          Drag a gift into the box — or tap it to add
        </p>
      </header>

      {/* ── Gift picker (horizontal scroll) ───────────────── */}
      <div className="px-5 py-2">
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-1 pt-1">
          {GIFTS.map((gift) => (
            <button
              key={gift.id}
              className="flex flex-col items-center gap-1.5 min-w-[64px] touch-none select-none cursor-grab active:scale-90 transition-transform duration-150"
              onPointerDown={(e) => startDrag(e, gift.id)}
              aria-label={`Add ${gift.name}`}
            >
              {/* Cutout emoji — just the emoji, no background box */}
              <span
                className="text-5xl drop-shadow-[0_3px_8px_rgba(0,0,0,0.13)] [animation:float-soft_3.5s_ease-in-out_infinite] hover:[animation-play-state:paused]"
                aria-hidden="true"
              >
                {gift.emoji}
              </span>
              {/* Floating label pill */}
              <span className="text-[11px] font-semibold text-rose-700 bg-white/80 border border-rose-100 px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                {gift.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Gift box (drop target + display) ───────────────── */}
      <div className="flex-1 flex flex-col px-5 pb-5 gap-3 min-h-0">
        <div className="relative flex-1 min-h-[200px]">
          {/* Open lid — resting tilted behind the box */}
          <div
            className="absolute left-1/2 z-20 pointer-events-none"
            style={{ top: "-8px", transform: "translateX(-50%) rotate(-7deg) translateY(-34px)" }}
            aria-hidden="true"
          >
            <div className="relative w-56 h-11 bg-rose-500 rounded-t-2xl rounded-b-sm shadow-lg border-b-4 border-rose-600">
              {/* Lid ribbon */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-white/20" />
              {/* Bow */}
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl leading-none">
                🎀
              </span>
            </div>
          </div>

          {/* Box body */}
          <div
            ref={boxRef}
            className={`
              relative w-full h-full
              bg-gradient-to-b from-rose-400 to-rose-600
              rounded-b-3xl rounded-t-sm
              border-t-8 border-rose-600
              shadow-2xl shadow-rose-300/60
              transition-transform duration-200
              ${overBox ? "scale-[1.018] ring-4 ring-white/50" : ""}
            `}
          >
            {/* Vertical ribbon strip */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 bg-white/35 pointer-events-none z-0" />
            {/* Horizontal ribbon strip */}
            <div className="absolute inset-x-0 top-[38%] h-6 bg-white/35 pointer-events-none z-0" />
            {/* Inner shadow at top rim */}
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-0" />
            {/* Bottom depth shadow */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-rose-700/40 to-transparent pointer-events-none z-0" />

            {/* Contents */}
            <div className="relative z-10 w-full h-full flex flex-wrap items-center justify-center gap-3 p-5 content-center">
              {boxedIds.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center text-rose-200/80 select-none">
                  <span className="text-5xl mb-2" aria-hidden="true">
                    🎀
                  </span>
                  <p className="text-sm font-semibold">Drop gifts here</p>
                  <p className="text-xs mt-0.5 opacity-70">or tap a gift above</p>
                </div>
              ) : (
                boxedIds.map((id, index) => {
                  const gift = GIFTS.find((g) => g.id === id);
                  if (!gift) return null;
                  return (
                    <button
                      key={`${id}-${index}`}
                      className="text-[2.6rem] leading-none drop-shadow-md [animation:pop-in_0.35s_ease-out_forwards] hover:scale-110 active:scale-90 transition-transform"
                      onClick={() => removeFromBox(index)}
                      title={`Tap to remove ${gift.name}`}
                      aria-label={`Remove ${gift.name} from box`}
                    >
                      {gift.emoji}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Remove hint */}
        {boxedIds.length > 0 && (
          <p className="text-center text-stone-400 text-xs">
            Tap a gift inside the box to remove it
          </p>
        )}

        {/* Continue button */}
        <button
          className={`
            w-full py-4 rounded-full font-black text-base text-white transition-all duration-200
            ${
              boxedIds.length > 0
                ? "bg-rose-500 hover:bg-rose-600 active:bg-rose-700 shadow-xl shadow-rose-300/60 hover:-translate-y-0.5"
                : "bg-rose-300 cursor-not-allowed opacity-60"
            }
          `}
          disabled={boxedIds.length === 0}
          onClick={handleContinue}
        >
          All packaged up! 📦
        </button>
      </div>

      {/* ── Drag ghost (follows pointer) ───────────────────── */}
      {dragGift ? (
        <div
          className="fixed pointer-events-none z-50 text-6xl leading-none -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl"
          style={{ left: dragPos.x, top: dragPos.y }}
          aria-hidden="true"
        >
          {dragGift.emoji}
        </div>
      ) : null}
    </div>
  );
}
