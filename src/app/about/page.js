export const metadata = {
  title: "About - Evan Sports",
  description: "Learn about Evan Sports and our values.",
};

export default function AboutPage() {
  return (
    <section className="page-shell fade-up">
      <div className="glass-card p-8 md:p-12">
        <h1 className="text-3xl font-bold md:text-4xl">About Evan Sports</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Evan Sports is built to bring professional quality sports equipment to athletes, students, clubs,
          and passionate players. Our focus is quality products, honest pricing, and fast support.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold">Quality First</h2>
            <p className="mt-2 text-sm text-slate-600">We curate durable gear tested for real play conditions.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold">Customer Focus</h2>
            <p className="mt-2 text-sm text-slate-600">Quick communication and transparent service at every step.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold">Growth Partner</h2>
            <p className="mt-2 text-sm text-slate-600">Supporting schools, academies, and clubs with smart bundles.</p>
          </div>
        </div>
      </div>
    </section>
  );
}