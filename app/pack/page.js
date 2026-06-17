"use client";

/*
  PAGE 2 — GIFT PACKING PAGE
  Drag gifts from the top into the open box at the bottom.
  Drag them back up to take them out again. Works on mobile too!

  Edit the words on this page in: data/config.js  (the "pack" section)
  Edit which gifts appear in: data/gifts.js
*/

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Background from "@/components/Background";
import Draggable from "@/components/Draggable";
import Droppable from "@/components/Droppable";
import GiftImage from "@/components/GiftImage";
import { GIFTS, getGiftById } from "@/data/gifts";
import { CONFIG } from "@/data/config";
import { useGift } from "@/components/GiftProvider";

// Scatter positions for the gifts in the tray, so they don't sit in a line.
const SCATTER = [
  { left: "8%", top: "8%", rot: -8 },
  { left: "58%", top: "2%", rot: 7 },
  { left: "33%", top: "34%", rot: -4 },
  { left: "72%", top: "40%", rot: 9 },
  { left: "4%", top: "52%", rot: 6 },
  { left: "46%", top: "62%", rot: -9 },
  { left: "80%", top: "8%", rot: 4 },
  { left: "20%", top: "74%", rot: -6 },
];

export default function PackPage() {
  const router = useRouter();
  const { gifts: savedGifts, setGifts, loaded } = useGift();

  // placement maps a gift id -> "tray" (top) or "box" (bottom)
  const [placement, setPlacement] = useState({});
  const [activeId, setActiveId] = useState(null);

  // Set up dragging for both mouse (Pointer) and touch (Touch) devices.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 8 },
    })
  );

  // When the app loads, restore which gifts were already in the box.
  useEffect(() => {
    if (!loaded) return;
    const start = {};
    GIFTS.forEach((g) => {
      start[g.id] = savedGifts.includes(g.id) ? "box" : "tray";
    });
    setPlacement(start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const trayGifts = GIFTS.filter((g) => placement[g.id] !== "box");
  const boxGifts = GIFTS.filter((g) => placement[g.id] === "box");

  // Keep our saved gift list in sync with what's in the box.
  useEffect(() => {
    if (!loaded) return;
    setGifts(boxGifts.map((g) => g.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement]);

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    const target = over.id === "box-zone" ? "box" : "tray";
    setPlacement((prev) => ({ ...prev, [active.id]: target }));
  }

  const activeGift = activeId ? getGiftById(activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <main className="relative flex min-h-dvh flex-col px-4 py-5">
        <Background />

        {/* Title + hint */}
        <header className="text-center">
          <h1 className="font-pixel text-base text-plum sm:text-xl">
            {CONFIG.pack.title}
          </h1>
          <p className="mt-2 text-sm font-semibold text-plum/60">
            {CONFIG.pack.hint}
          </p>
        </header>

        {/* TOP: the scattered gifts (drop zone "tray") */}
        <Droppable id="tray-zone" className="relative mx-auto mt-3 h-56 w-full max-w-md">
          {trayGifts.map((gift, i) => {
            const slot = SCATTER[i % SCATTER.length];
            return (
              <Draggable
                key={gift.id}
                id={gift.id}
                className="absolute"
                style={{ left: slot.left, top: slot.top }}
              >
                <GiftCard gift={gift} rotate={slot.rot} />
              </Draggable>
            );
          })}

          {trayGifts.length === 0 && (
            <p className="absolute inset-0 flex items-center justify-center text-center text-sm font-semibold text-plum/40">
              Everything is packed! 🎉
              <br />
              Drag a gift back up to take it out.
            </p>
          )}
        </Droppable>

        {/* BOTTOM: the big open box (drop zone "box") */}
        <div className="mt-auto flex w-full flex-col items-center pb-4">
          <Droppable id="box-zone" className="relative w-full max-w-md">
            {(isOver) => (
              <div
                className={`relative mx-auto flex h-72 w-full items-end justify-center transition-transform ${
                  isOver ? "scale-105" : ""
                }`}
              >
                {/* The lid sitting next to the box */}
                <img
                  src="/assets/box-lid.png"
                  alt="Box lid"
                  className="absolute bottom-2 right-0 h-24 w-28 rotate-6 object-contain opacity-95 sm:h-28 sm:w-32"
                  draggable={false}
                />

                {/* The open box itself */}
                <div className="relative h-64 w-64 sm:h-72 sm:w-72">
                  <img
                    src="/assets/box-open.png"
                    alt="Open gift box"
                    className={`h-full w-full object-contain transition-[filter] ${
                      isOver ? "drop-shadow-[0_0_22px_rgba(255,122,162,0.7)]" : ""
                    }`}
                    draggable={false}
                  />

                  {/* Packed gifts peeking out of the top of the box */}
                  <div className="pointer-events-none absolute inset-x-0 top-[14%] flex h-1/2 items-start justify-center">
                    {boxGifts.map((gift, i) => {
                      const spread = (i - (boxGifts.length - 1) / 2) * 38;
                      return (
                        <Draggable
                          key={gift.id}
                          id={gift.id}
                          className="pointer-events-auto absolute"
                          style={{
                            transform: `translateX(${spread}px)`,
                            zIndex: 10 + i,
                          }}
                        >
                          <GiftImage
                            gift={gift}
                            className="h-20 w-20 object-contain drop-shadow-md sm:h-24 sm:w-24"
                          />
                        </Draggable>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </Droppable>

          {/* "All packaged up!" button */}
          <button
            className="btn-cute mt-2"
            disabled={boxGifts.length === 0}
            onClick={() => router.push("/note")}
          >
            {CONFIG.pack.button}
          </button>
        </div>
      </main>

      {/* The floating copy of the gift that follows your finger while dragging */}
      <DragOverlay dropAnimation={null}>
        {activeGift ? (
          <GiftImage
            gift={activeGift}
            className="h-24 w-24 rotate-3 object-contain drop-shadow-xl"
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

// One gift in the tray: the picture + a little floating label underneath.
function GiftCard({ gift, rotate = 0 }) {
  return (
    <div
      className="flex w-24 select-none flex-col items-center"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <GiftImage
        gift={gift}
        className="h-20 w-20 object-contain drop-shadow-md transition-transform hover:scale-110 sm:h-24 sm:w-24"
      />
      <span className="mt-1 rounded-full bg-white/80 px-3 py-0.5 text-xs font-bold text-plum shadow-sm">
        {gift.name}
      </span>
    </div>
  );
}
