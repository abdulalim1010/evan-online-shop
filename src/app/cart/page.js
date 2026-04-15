import Link from "next/link";

export const metadata = {
  title: "Cart - Evan Sports",
  description: "Your shopping cart",
};

export default function CartPage() {
  return (
    <section className="page-shell fade-up">
      <div className="glass-card p-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="mt-2 text-slate-600">Your selected products are shown here before checkout.</p>
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-slate-500">Your cart is empty right now.</p>
          <Link href="/footballs" className="mt-3 inline-block font-medium text-blue-600 hover:underline">
            Start shopping
          </Link>
        </div>
      </div>
    </section>
  );
}