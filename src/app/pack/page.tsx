"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useRouter } from "next/navigation";
import {
  defaultGiftNote,
  emptyPayload,
  getGiftOption,
  giftOptions,
  loveboxDraftKey,
  type LoveboxGiftId,
  type PackedGift,
} from "@/lib/lovebox";

type DragState = {
  giftId: LoveboxGiftId;
  x: number;
  y: number;
  startX: number;
  startY: number;
};

function readPackedGifts() {
  if (typeof window === "undefined") {
    return [];
  }

  const saved = window.localStorage.getItem(loveboxDraftKey);

  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved) as { gifts?: PackedGift[] };
    return Array.isArray(parsed.gifts) ? parsed.gifts : [];
  } catch {
    return [];
  }
}

export default function PackPage() {
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);
  const [packedGifts, setPackedGifts] = useState<PackedGift[]>(readPackedGifts);
  const [pendingGiftId, setPendingGiftId] = useState<LoveboxGiftId | null>(null);
  const [giftNote, setGiftNote] = useState(defaultGiftNote);
  const [dragging, setDragging] = useState<DragState | null>(null);

  const pendingGift = useMemo(
    () => (pendingGiftId ? getGiftOption(pendingGiftId) : null),
    [pendingGiftId],
  );

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const { giftId, startX, startY } = dragging;

    function onPointerMove(event: PointerEvent) {
      setDragging((current) =>
        current ? { ...current, x: event.clientX, y: event.clientY } : current,
      );
    }

    function onPointerUp(event: PointerEvent) {
      const box = boxRef.current?.getBoundingClientRect();
      const moved = Math.hypot(event.clientX - startX, event.clientY - startY);
      const droppedInBox =
        !!box &&
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom;

      setDragging(null);

      if (droppedInBox || moved < 10) {
        setPendingGiftId(giftId);
        setGiftNote(defaultGiftNote);
      }
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragging]);

  function startDrag(event: ReactPointerEvent<HTMLButtonElement>, giftId: LoveboxGiftId) {
    event.preventDefault();
    setDragging({
      giftId,
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
    });
  }

  function addPendingGift() {
    if (!pendingGiftId) {
      return;
    }

    setPackedGifts((current) => [
      ...current,
      {
        instanceId: `${pendingGiftId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        giftId: pendingGiftId,
        note: giftNote.trim() || defaultGiftNote,
      },
    ]);
    setPendingGiftId(null);
  }

  function removeGift(instanceId: string) {
    setPackedGifts((current) => current.filter((gift) => gift.instanceId !== instanceId));
  }

  function continueToLetter() {
    const current = emptyPayload();
    current.gifts = packedGifts;
    window.localStorage.setItem(loveboxDraftKey, JSON.stringify(current));
    router.push("/note");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-5 px-4 py-5">
      <header className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-xl shadow-rose-100">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-rose-500">
          pack the Lovebox
        </p>
        <h1 className="mt-2 text-3xl font-black text-rose-950">Drag gifts into the box.</h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Use your finger to drag, or tap any gift to add it. Each gift gets its own tiny note.
        </p>
      </header>

      <section className="sticky top-3 z-10 -mx-4 overflow-x-auto px-4 pb-2">
        <div className="flex min-w-max gap-3">
          {giftOptions.map((gift) => (
            <button
              className={`touch-none rounded-3xl border border-white/80 bg-gradient-to-br ${gift.color} px-4 py-3 text-left shadow-lg shadow-rose-100 transition active:scale-95`}
              key={gift.id}
              onPointerDown={(event) => startDrag(event, gift.id)}
              type="button"
            >
              <span className="block text-3xl" aria-hidden="true">
                {gift.emoji}
              </span>
              <span className="mt-1 block text-sm font-black text-rose-950">{gift.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-1 flex-col justify-end gap-5">
        <div className="rounded-[2rem] border border-rose-100 bg-white/65 p-4 shadow-xl shadow-orange-100">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-rose-950">Inside the box</h2>
            <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
              {packedGifts.length} gifts
            </span>
          </div>
          <div className="grid min-h-28 grid-cols-2 gap-3">
            {packedGifts.length === 0 ? (
              <p className="col-span-2 rounded-3xl border border-dashed border-rose-200 bg-white/70 p-5 text-center text-sm leading-6 text-stone-500">
                Your box is waiting for flowers, candy, coffee, and all the tiny things.
              </p>
            ) : (
              packedGifts.map((packedGift) => {
                const gift = getGiftOption(packedGift.giftId);

                return (
                  <article
                    className="rounded-3xl bg-white/85 p-3 shadow-inner"
                    key={packedGift.instanceId}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-3xl" aria-hidden="true">
                        {gift.emoji}
                      </span>
                      <button
                        className="rounded-full bg-rose-100 px-2 text-xs font-bold text-rose-700"
                        onClick={() => removeGift(packedGift.instanceId)}
                        type="button"
                      >
                        remove
                      </button>
                    </div>
                    <h3 className="mt-2 text-sm font-black text-rose-950">{gift.name}</h3>
                    <p className="mt-1 line-clamp-3 text-xs leading-5 text-stone-600">
                      {packedGift.note}
                    </p>
                  </article>
                );
              })
            )}
          </div>
        </div>

        <div
          className="relative rounded-t-[3rem] border-x border-t border-rose-200 bg-gradient-to-b from-rose-200 via-rose-100 to-orange-100 p-5 shadow-2xl shadow-rose-200"
          ref={boxRef}
        >
          <div className="absolute left-1/2 top-0 h-8 w-44 -translate-x-1/2 -translate-y-1/2 rounded-t-[2rem] bg-rose-300 shadow-lg" />
          <div className="min-h-32 rounded-[2rem] border border-white/80 bg-white/65 p-4 text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-500">
              open gift box
            </p>
            <p className="mt-3 text-4xl" aria-hidden="true">
              🎁
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-600">Drop a gift here.</p>
          </div>
        </div>

        <button
          className="rounded-full bg-rose-500 px-6 py-4 text-base font-black text-white shadow-xl shadow-rose-300 transition disabled:cursor-not-allowed disabled:bg-rose-200"
          disabled={packedGifts.length === 0}
          onClick={continueToLetter}
          type="button"
        >
          All packaged up!
        </button>
      </section>

      {dragging ? (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 px-5 py-4 text-5xl shadow-2xl shadow-rose-300"
          style={{ left: dragging.x, top: dragging.y }}
        >
          {getGiftOption(dragging.giftId).emoji}
        </div>
      ) : null}

      {pendingGift ? (
        <div className="fixed inset-0 z-50 flex items-end bg-rose-950/25 p-4 backdrop-blur-sm sm:items-center sm:justify-center">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-5 shadow-2xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-rose-500">
              tiny gift note
            </p>
            <h2 className="mt-3 text-2xl font-black text-rose-950">
              {pendingGift.emoji} {pendingGift.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{pendingGift.blurb}</p>
            <textarea
              className="mt-4 min-h-28 w-full resize-none rounded-3xl border border-rose-100 bg-rose-50/70 p-4 text-sm leading-6 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
              maxLength={160}
              onChange={(event) => setGiftNote(event.target.value)}
              value={giftNote}
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                className="rounded-full bg-stone-100 px-4 py-3 text-sm font-black text-stone-700"
                onClick={() => setPendingGiftId(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-rose-500 px-4 py-3 text-sm font-black text-white"
                onClick={addPendingGift}
                type="button"
              >
                Add to box
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
