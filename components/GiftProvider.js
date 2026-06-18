"use client";

/*
  Remembers the gift you are building (the chosen gifts + your note)
  as you move between the pages. It also saves to the browser so a
  refresh won't lose your work. You normally won't need to edit this.
*/

import { createContext, useContext, useEffect, useState } from "react";

const GiftContext = createContext(null);

const STORAGE_KEY = "lovebox-gift";

export function GiftProvider({ children }) {
  const [gifts, setGifts] = useState([]); // list of gift ids, e.g. ["teddy"]
  const [note, setNote] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Load any saved progress when the app first opens
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setGifts(Array.isArray(data.gifts) ? data.gifts : []);
        setNote(typeof data.note === "string" ? data.note : "");
      }
    } catch {
      // ignore broken saved data
    }
    setLoaded(true);
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ gifts, note }));
    } catch {
      // ignore storage errors (e.g. private mode)
    }
  }, [gifts, note, loaded]);

  const addGift = (id) =>
    setGifts((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const removeGift = (id) => setGifts((prev) => prev.filter((g) => g !== id));
  const reset = () => {
    setGifts([]);
    setNote("");
  };

  return (
    <GiftContext.Provider
      value={{ gifts, setGifts, addGift, removeGift, note, setNote, reset, loaded }}
    >
      {children}
    </GiftContext.Provider>
  );
}

export function useGift() {
  const ctx = useContext(GiftContext);
  if (!ctx) throw new Error("useGift must be used inside <GiftProvider>");
  return ctx;
}
