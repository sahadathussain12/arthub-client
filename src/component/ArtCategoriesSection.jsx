"use client";

import Link from "next/link";
import { FiCompass } from "react-icons/fi";

const categories = [
  {
    name: "Painting",
    description: "Classic and contemporary canvas masterpieces",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Digital",
    description: "Modern digital creations and vector art",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sculpture",
    description: "Handcrafted 3D forms and tactile designs",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Photography",
    description: "Captivating moments frozen in time",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
  },
];

export default function ArtCategoriesSection() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-3">
          <FiCompass className="text-base" /> Explore Styles
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
          Art Categories
        </h2>
        <p className="mt-2 text-gray-400 text-sm sm:text-base">
          Browse through our curated collection of diverse artistic mediums.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/browse?category=${encodeURIComponent(cat.name)}`}
            className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-[#100D20] p-4 shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-1 block"
          >
            {/* ক্যাটাগরি ইমেজ */}
            <div className="relative h-44 w-full mb-4 overflow-hidden rounded-xl">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100D20]/80 via-transparent to-transparent" />
            </div>

            {/* ক্যাটাগরি নাম ও বিবরণ */}
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition">
              {cat.name}
            </h3>
            <p className="mt-1 text-xs text-gray-400 line-clamp-2">
              {cat.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}