"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

const products = [
  { name: "Footballs", href: "/footballs" },
  { name: "Cricket", href: "/cricket-bats" },
  { name: "Chess", href: "/chess" },
  { name: "Carrom", href: "/carrom" },
  { name: "Volleyball", href: "/volleyball" },
  { name: "Handball", href: "/handball" },
];

const cloths = [
  { name: "Jersey", href: "/cloths/jersey" },
  { name: "T-shirt", href: "/cloths/t-shirt" },
  { name: "Half pant", href: "/cloths/half-pant" },
  { name: "Trousers pant", href: "/cloths/trousers-pant" },
  { name: "Short", href: "/cloths/short" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [clothsOpen, setClothsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const productsRef = useRef(null);
  const clothsRef = useRef(null);
  const userMenuRef = useRef(null);
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false);
      }
      if (clothsRef.current && !clothsRef.current.contains(event.target)) {
        setClothsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Sign out?",
      text: "You can sign in again anytime.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out",
    });

    if (result.isConfirmed) {
      await logout();
      await Swal.fire({
        icon: "success",
        title: "Signed out",
        timer: 1200,
        showConfirmButton: false,
      });
      router.push("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          
          <Link href="/" className="shrink-0 text-xl font-bold text-slate-900 transition-transform hover:scale-105">
            Evan Sports
          </Link>

          <form onSubmit={handleSearch} className="hidden w-[260px] items-center rounded-full border border-slate-300 bg-white px-3 py-1.5 md:flex">
            <FaSearch className="mr-2 text-slate-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </form>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-slate-700 transition-colors hover:text-blue-600">Home</Link>

            <div className="relative" ref={productsRef}>
              <button 
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex items-center gap-1 text-slate-700 transition-colors hover:text-blue-600"
              >
                Products 
                <svg className={`w-3 h-3 transition-transform ${productsOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className={`absolute left-0 top-full min-w-[160px] rounded-lg border border-slate-200 bg-white py-2 shadow-xl transition-all duration-200 ${productsOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
                {products.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => setProductsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative" ref={clothsRef}>
              <button 
                onClick={() => setClothsOpen(!clothsOpen)}
                className="flex items-center gap-1 text-slate-700 transition-colors hover:text-blue-600"
              >
                Cloths 
                <svg className={`w-3 h-3 transition-transform ${clothsOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className={`absolute left-0 top-full min-w-[160px] rounded-lg border border-slate-200 bg-white py-2 shadow-xl transition-all duration-200 ${clothsOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
                {cloths.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => setClothsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about" className="text-slate-700 transition-colors hover:text-blue-600">About</Link>
            <Link href="/contact" className="text-slate-700 transition-colors hover:text-blue-600">Contact</Link>
          </div>

          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <Link href="/cart" className="relative text-lg text-slate-700 transition-colors hover:text-blue-600">
              <FaShoppingCart />
              <span className="absolute -right-3 -top-2 rounded-full bg-red-500 px-1.5 text-xs text-white">
                2
              </span>
            </Link>

            {!loading && (
              user ? (
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 text-slate-700 transition-colors hover:text-blue-600"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                      <FaUser className="text-sm" />
                    </div>
                    <span className="text-sm">{user.name}</span>
                  </button>

                  <div className={`absolute right-0 top-full min-w-[150px] rounded-lg border border-slate-200 bg-white py-2 shadow-xl transition-all duration-200 ${userMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
                    {user.role === "admin" && (
                      <Link href="/admin" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-50 font-medium" onClick={() => setUserMenuOpen(false)}>
                        Admin Dashboard
                      </Link>
                    )}
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50" onClick={() => setUserMenuOpen(false)}>
                      Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-blue-50" onClick={() => setUserMenuOpen(false)}>
                      My Orders
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/login">
                  <button className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                    Sign In
                  </button>
                </Link>
              )
            )}
          </div>

          <button
            className="text-2xl text-slate-700 md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div className={`bg-white px-4 pb-4 shadow-inner transition-all duration-300 md:hidden ${open ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
        <form onSubmit={handleSearch} className="mb-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </form>
        <div className="space-y-2">
          <Link href="/" className="block text-slate-700">Home</Link>
           <div>
            <button onClick={() => setProductsOpen(!productsOpen)} className="block w-full text-left text-slate-700">
              Products ▼
            </button>
            <div className={`ml-4 mt-2 space-y-2 transition-all ${productsOpen ? "max-h-48" : "max-h-0 overflow-hidden"}`}>
              {products.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="block text-blue-600">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <button onClick={() => setClothsOpen(!clothsOpen)} className="block w-full text-left text-slate-700">
              Cloths ▼
            </button>
            <div className={`ml-4 mt-2 space-y-2 transition-all ${clothsOpen ? "max-h-48" : "max-h-0 overflow-hidden"}`}>
              {cloths.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="block text-blue-600">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/about" className="block text-slate-700">About</Link>
          <Link href="/contact" className="block text-slate-700">Contact</Link>
          <Link href="/cart" className="block text-slate-700">Cart</Link>
          {!loading && (
            user ? (
              <button onClick={handleLogout} className="block text-slate-700">Logout</button>
            ) : (
              <Link href="/login" className="block text-slate-700">Sign In</Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}