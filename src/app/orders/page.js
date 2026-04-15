export const metadata = {
  title: "My Orders - Evan Sports",
  description: "View your orders",
};

export default function OrdersPage() {
  return (
    <section className="page-shell fade-up">
      <div className="glass-card p-8">
        <h1 className="text-3xl font-bold mb-3">My Orders</h1>
        <p className="text-slate-600">Track your purchased items, delivery status, and invoices.</p>
        <div className="mt-8 text-center py-12 rounded-xl border border-dashed border-slate-300 bg-white">
          <p className="text-slate-500 text-lg">No orders yet.</p>
        </div>
      </div>
    </section>
  );
}