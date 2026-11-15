"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  FiShoppingBag, 
  FiSend, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin 
} from "react-icons/fi";

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t border-white/10 bg-[#080714] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-800 shadow-lg shadow-purple-500/25 transition duration-300 group-hover:rotate-6 group-hover:scale-105">
                <FiShoppingBag className="text-xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Art<span className="text-purple-400">Hub</span>
                  <span className="text-purple-400">.</span>
                </h2>
                <p className="text-[9px] font-medium uppercase tracking-[3px] text-gray-400">
                  Discover Original Art
                </p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              The premier digital marketplace connecting passionate art collectors with brilliant global artists. Discover originality without boundaries[cite: 1, 3].
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition hover:border-purple-500/40 hover:bg-purple-500/15 hover:text-purple-400">
                <FiFacebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition hover:border-purple-500/40 hover:bg-purple-500/15 hover:text-purple-400">
                <FiTwitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition hover:border-purple-500/40 hover:bg-purple-500/15 hover:text-purple-400">
                <FiInstagram size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition hover:border-purple-500/40 hover:bg-purple-500/15 hover:text-purple-400">
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 transition hover:text-purple-400">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 transition hover:text-purple-400">Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 transition hover:text-purple-400">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/artworks" className="text-gray-400 transition hover:text-purple-400">Explore Artworks</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-5">Categories</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/artworks?category=painting" className="text-gray-400 transition hover:text-purple-400">Paintings</Link></li>
              <li><Link href="/artworks?category=digital" className="text-gray-400 transition hover:text-purple-400">Digital Art</Link></li>
              <li><Link href="/artworks?category=sculpture" className="text-gray-400 transition hover:text-purple-400">Sculptures</Link></li>
              <li><Link href="/artworks?category=photography" className="text-gray-400 transition hover:text-purple-400">Photography</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-5">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:from-purple-500 hover:to-violet-500"
              >
                <span>Subscribe</span>
                <FiSend size={15} />
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {year || "2026"} ArtHub – Online Art Marketplace. All rights reserved[cite: 1, 3].</p>
        </div>
      </div>
    </footer>
  );
}