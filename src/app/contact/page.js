"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export const metadata = {
  title: "Contact - Evan Sports",
  description: "Contact Evan Sports",
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Swal.fire({
      icon: "success",
      title: "Message sent",
      text: "Thanks for contacting Evan Sports. We will reply shortly.",
      confirmButtonColor: "#2563eb",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="page-shell fade-up">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-3 text-slate-600">
            Need bulk pricing, product details, or support? Send us a message.
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-700">
            <p>Email: support@evansports.com</p>
            <p>Phone: +880 1700-000000</p>
            <p>Address: Mirpur, Dhaka, Bangladesh</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card space-y-4 p-8">
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
          <input
            type="email"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
          <textarea
            rows={5}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Write your message..."
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            required
          />
          <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}