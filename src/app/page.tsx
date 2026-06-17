import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-6 sm:px-6">
      <section className="relative overflow-hidden rounded-[2.4rem] border border-white/80 bg-white/70 p-6 shadow-2xl shadow-rose-200/50 backdrop-blur sm:p-10">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-rose-200/50 blur-2xl" />
        <div className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-orange-200/50 blur-2xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7">
            <p className="w-fit rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700 shadow-inner">
              Lovebox
            </p>
            <div className="space-y-4">
              <h1 className="text-5xl font-black tracking-tight text-rose-950 sm:text-7xl">
                Pack a little love for him.
              </h1>
              <p className="text-lg leading-8 text-stone-700">
                1,000 miles away, but this package still made it to you.
              </p>
              <p className="max-w-xl text-base leading-7 text-stone-600">
                Drag tiny gifts into a soft digital box, seal it with a letter, and send
                him a sweet package he can open on his phone.
              </p>
            </div>
            <Link
              className="inline-flex rounded-full bg-rose-500 px-7 py-4 text-base font-black text-white shadow-xl shadow-rose-300 transition hover:-translate-y-0.5 hover:bg-rose-600"
              href="/pack"
            >
              Send a digital gift!
            </Link>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-rose-200 via-orange-100 to-pink-100 p-4">
            <div className="rounded-[1.65rem] border border-white/80 bg-white/75 p-6 text-center shadow-xl">
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-[2rem] bg-white text-7xl shadow-inner [animation:float-soft_3.5s_ease-in-out_infinite]">
                💝
              </div>
              <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-rose-500">
                special delivery
              </p>
              <h2 className="mt-3 text-3xl font-black text-rose-950">You have 1 package</h2>
              <p className="mt-4 text-stone-700">
                Cream paper, blush hearts, and a tiny box full of him-things.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
