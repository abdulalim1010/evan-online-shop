"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const products = [
  { name: "Footballs", href: "/footballs" },
  { name: "Cricket", href: "/cricket-bats" },
  { name: "Chess", href: "/chess" },
  { name: "Carrom", href: "/carrom" },
  { name: "Volleyball", href: "/volleyball" },
  { name: "Handball", href: "/handball" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const productsRef = useRef(null);
  const userMenuRef = useRef(null);
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false);
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
    await logout();
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          
          <Link href="/" className="text-xl font-bold text-white flex items-center gap-2 shrink-0 hover:scale-105 transition-transform">
            🏀 Evan Sports
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 w-[220px] border border-white/30">
            <FaSearch className="text-white mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none text-sm w-full bg-transparent text-white placeholder-white/70"
            />
          </form>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-yellow-300 transition-colors">Home</Link>

            <div className="relative" ref={productsRef}>
              <button 
                onClick={() => setProductsOpen(!productsOpen)}
                className="text-white hover:text-yellow-300 transition-colors flex items-center gap-1"
              >
                Products 
                <svg className={`w-3 h-3 transition-transform ${productsOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className={`absolute top-full left-0 bg-white/90 backdrop-blur-md shadow-xl rounded-lg py-2 min-w-[160px] transition-all duration-200 ${productsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                {products.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
                    onClick={() => setProductsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about" className="text-white hover:text-yellow-300 transition-colors">About</Link>
            <Link href="/contact" className="text-white hover:text-yellow-300 transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0">
            <Link href="/cart" className="relative text-white text-lg hover:text-yellow-300 transition-colors">
              <FaShoppingCart />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
                2
              </span>
            </Link>

            {!loading && (
              user ? (
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <FaUser className="text-sm" />
                    </div>
                    <span className="text-sm">{user.name}</span>
                  </button>

                  <div className={`absolute top-full right-0 bg-white/90 backdrop-blur-md shadow-xl rounded-lg py-2 min-w-[150px] transition-all duration-200 ${userMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
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
                  <button className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-yellow-300 hover:text-blue-700 transition-colors">
                    Sign In
                  </button>
                </Link>
              )
            )}
          </div>

          <button
            className="md:hidden text-2xl text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div className={`md:hidden bg-blue-600/95 backdrop-blur-md px-4 pb-4 transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <form onSubmit={handleSearch} className="mb-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full text-sm outline-none bg-white/20 text-white placeholder-white/70 border border-white/30"
          />
        </form>
        <div className="space-y-2">
          <Link href="/" className="block text-white">Home</Link>
          <div>
            <button onClick={() => setProductsOpen(!productsOpen)} className="block w-full text-left text-white">
              Products ▼
            </button>
            <div className={`ml-4 mt-2 space-y-2 transition-all ${productsOpen ? 'max-h-48' : 'max-h-0 overflow-hidden'}`}>
              {products.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="block text-blue-200">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/about" className="block text-white">About</Link>
          <Link href="/contact" className="block text-white">Contact</Link>
          <Link href="/cart" className="block text-white">Cart</Link>
          {!loading && (
            user ? (
              <button onClick={handleLogout} className="block text-white">Logout</button>
            ) : (
              <Link href="/login" className="block text-white">Sign In</Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}