import { Suspense } from "react";

import { OpenGift } from "./OpenGift";

export default function OpenPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0]">
          <span
            className="text-5xl block mb-4 [animation:bounce-soft_1.1s_ease-in-out_infinite]"
            aria-hidden="true"
          >
            📦
          </span>
          <p className="text-rose-500 font-bold">Loading your package…</p>
        </div>
      }
    >
      <OpenGift />
    </Suspense>
  );
}
