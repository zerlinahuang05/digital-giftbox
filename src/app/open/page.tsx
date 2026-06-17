import { Suspense } from "react";
import { OpenGift } from "./OpenGift";

export default function OpenPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center px-4">
          <p className="rounded-full bg-white/75 px-5 py-3 text-sm font-bold text-rose-700">
            Loading your gift...
          </p>
        </main>
      }
    >
      <OpenGift />
    </Suspense>
  );
}
