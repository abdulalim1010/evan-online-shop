import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const categoryLinks = [
  { name: "Footballs", href: "/footballs" },
  { name: "Cricket Bats", href: "/cricket-bats" },
  { name: "Carrom", href: "/carrom" },
  { name: "Volleyball", href: "/volleyball" },
  { name: "Chess", href: "/chess" },
  { name: "Handball", href: "/handball" },
];

const quickLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Cart", href: "/cart" },
  { name: "Orders", href: "/orders" },
  { name: "Profile", href: "/profile" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold text-white">Evan Sports</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Trusted sports store for performance-focused equipment and fast delivery.
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <a className="rounded-full bg-slate-800 p-2 hover:bg-blue-600" href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a className="rounded-full bg-slate-800 p-2 hover:bg-pink-600" href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a className="rounded-full bg-slate-800 p-2 hover:bg-blue-500" href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a className="rounded-full bg-slate-800 p-2 hover:bg-red-600" href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Categories</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {categoryLinks.map((item) => (
              <li key={item.name}>
                <Link className="text-slate-300 transition hover:text-white" href={item.href}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link className="text-slate-300 transition hover:text-white" href={item.href}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h4>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>Dhaka, Bangladesh</p>
            <p>support@evansports.com</p>
            <p>+880 1700-000000</p>
            <p className="pt-2 text-xs text-slate-400">Mon - Sat: 9:00 AM - 9:00 PM</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4">
        <p className="text-center text-xs text-slate-400">
          {new Date().getFullYear()} Evan Sports. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
