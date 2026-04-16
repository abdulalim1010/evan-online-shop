"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function ContactForm() {
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
  );
}