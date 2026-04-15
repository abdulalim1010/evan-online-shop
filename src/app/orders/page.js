export const metadata = {
  title: "My Orders - Evan Sports",
  description: "View your orders",
};

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No orders yet.</p>
      </div>
    </div>
  );
}