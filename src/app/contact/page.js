export const metadata = {
  title: "Contact - Evan Sports",
  description: "Contact Evan Sports",
};

import ContactForm from "../components/ContactForm";

export default function ContactPage() {
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

        <ContactForm />
      </div>
    </section>
  );
}