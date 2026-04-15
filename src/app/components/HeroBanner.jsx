import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
      
      {/* Background Image */}
      <img
        src="/evan1.png"
        alt="Sports Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <div className="max-w-3xl text-white fade-up">
          
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Upgrade Your Game With
            <span className="text-blue-400"> Premium Sports Gear</span>
          </h1>

          <p className="mt-5 text-lg text-slate-200">
            Build your performance with high-quality football, cricket, volleyball,
            chess, carrom, and handball essentials from one trusted store.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            
            <Link
              href="/footballs"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Shop Now
            </Link>

            <Link
              href="/cricket-bats"
              className="rounded-lg border border-white px-6 py-3 transition hover:bg-white hover:text-black"
            >
              Explore Categories
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}