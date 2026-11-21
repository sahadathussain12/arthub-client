"use client";

import { FiTrash2 } from "react-icons/fi";

export default function ManageArtworksTable({ artworks, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-purple-500/20 text-xs uppercase text-gray-400">
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Artist Name</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-500/10 text-sm">
          {artworks.map((art) => (
            <tr key={art._id} className="hover:bg-white/[0.02]">
              <td className="py-3.5 px-4 font-medium">{art.title}</td>
              <td className="py-3.5 px-4 text-gray-400">
                {art.artistName || art.artist?.name || "Unknown"}
              </td>
              <td className="py-3.5 px-4 font-semibold text-cyan-400">${art.price}</td>
              <td className="py-3.5 px-4 text-right">
                <button
                  onClick={() => onDelete(art._id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition"
                >
                  <FiTrash2 /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}