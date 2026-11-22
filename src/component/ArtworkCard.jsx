"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export default function ArtworkCard({ artwork }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl border border-purple-500/20 bg-[#100D20] overflow-hidden shadow-lg hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all flex flex-col justify-between"
    >
      <Link href={`/artworks/${artwork._id}`} className="block">
        {/* Image Thumbnail */}
        <div className="relative h-56 w-full overflow-hidden bg-[#080714]">
          <img
            src={artwork.image || artwork.imageUrl}
            alt={artwork.title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#080714]/80 backdrop-blur-md text-purple-300 border border-purple-500/30">
            {artwork.category || "Digital Art"}
          </span>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-base text-white truncate group-hover:text-purple-400 transition">
            {artwork.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1 truncate">
            by <span className="text-gray-300">{artwork.artistName || "Artist"}</span>
          </p>

          <div className="mt-4 pt-3 border-t border-purple-500/15 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-gray-400 block">Price</span>
              <span className="text-base font-extrabold text-cyan-400">
                ${artwork.price}
              </span>
            </div>
            <span className="h-8 w-8 rounded-full bg-purple-600/20 text-purple-400 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition">
              <FiArrowUpRight />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}