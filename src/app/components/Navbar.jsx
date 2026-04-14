"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            Evan Sports
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-blue-500">Home</Link>
            <Link href="/products" className="hover:text-blue-500">Products</Link>
            <Link href="/about" className="hover:text-blue-500">About</Link>
            <Link href="/contact" className="hover:text-blue-500">Contact</Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              🛒
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
                2
              </span>
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-3">
          <Link href="/" onClick={() => setOpen(false)} className="block">
            Home
          </Link>
          <Link href="/products" onClick={() => setOpen(false)} className="block">
            Products
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} className="block">
            About
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="block">
            Contact
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)} className="block">
            Cart 🛒
          </Link>
        </div>
      )}
    </nav>
  );
}