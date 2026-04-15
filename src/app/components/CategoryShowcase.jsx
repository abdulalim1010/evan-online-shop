import Link from "next/link";

export default function CategoryShowcase({ title, subtitle, icon, points, ctaHref, ctaText }) {
  return (
    <section className="page-shell fade-up">
      <div className="glass-card overflow-hidden">
        <div className="hero-gradient p-8 md:p-12">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow">
            {icon}
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-slate-600">{subtitle}</p>
        </div>

        <div className="grid gap-4 p-8 md:grid-cols-2">
          {points.map((point) => (
            <div key={point} className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700">
              {point}
            </div>
          ))}
        </div>

        <div className="px-8 pb-8">
          <Link
            href={ctaHref}
            className="inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
