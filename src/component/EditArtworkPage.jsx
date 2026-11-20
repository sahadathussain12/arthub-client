"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiUploadCloud, FiSave, FiArrowLeft, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import Link from "next/link";
import { GetSingleArtwork, UpdateArtwork } from "@/utils/artworks";

// ১. মূল ফর্ম কন্টেন্ট কম্পোনেন্ট (যেখানে useParams ব্যবহার করা হয়েছে)
function EditArtworkContent() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [preview, setPreview] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    price: "",
    stock: "1",
  });

  // আগের আর্টওয়ার্ক ডাটা লোড করা
  useEffect(() => {
    if (!id) return;

    const loadArtwork = async () => {
      try {
        const result = await GetSingleArtwork(id);
        if (result.success && result.data) {
          const art = result.data;
          setFormData({
            title: art.title || "",
            category: art.category || "",
            description: art.description || "",
            image: art.image || "",
            price: art.price || "",
            stock: art.stock || "1",
          });
          setPreview(art.image || "");
        }
      } catch (error) {
        toast.error(error.message || "Failed to load artwork data");
      } finally {
        setLoading(false);
      }
    };

    loadArtwork();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let finalImageUrl = formData.image;

      // যদি ইউজার নতুন কোনো ছবি সিলেক্ট করে থাকে তবে ImgBB-তে আপলোড হবে
      if (newImageFile) {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        const imageData = new FormData();
        imageData.append("image", newImageFile);

        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          { method: "POST", body: imageData }
        );
        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success) {
          throw new Error("New image upload failed!");
        }
        finalImageUrl = uploadData.data.url;
      }

      const result = await UpdateArtwork(id, {
        ...formData,
        image: finalImageUrl,
      });

      if (result.success) {
        toast.success("Artwork updated successfully!");
        router.push("/dashboard/artist");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.message || "Failed to update artwork");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080714]">
        <FiLoader className="text-4xl text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 text-white p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Edit Artwork</h1>
          <p className="mt-1 text-sm text-gray-400">
            Update your artwork details and pricing.
          </p>
        </div>

        <Link
          href="/dashboard/artist"
          className="flex items-center gap-2 rounded-xl border border-purple-500/30 px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/10 transition"
        >
          <FiArrowLeft /> Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-purple-500/20 bg-[#100D20] p-6"
      >
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Artwork Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-purple-500/20 bg-[#080714] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-purple-500/20 bg-[#080714] px-4 py-3 text-sm text-gray-300 outline-none focus:border-purple-500"
          >
            <option value="">Select Category</option>
            <option value="Painting">Painting</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Photography">Photography</option>
            <option value="Sculpture">Sculpture</option>
            <option value="Illustration">Illustration</option>
            <option value="Abstract Art">Abstract Art</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full resize-none rounded-xl border border-purple-500/20 bg-[#080714] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
              className="w-full rounded-xl border border-purple-500/20 bg-[#080714] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Stock Quantity *
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="1"
              required
              className="w-full rounded-xl border border-purple-500/20 bg-[#080714] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Image Update */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Artwork Image (Leave unchanged to keep current image)
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="h-24 w-24 rounded-xl object-cover border border-purple-500/30"
              />
            )}

            <label
              htmlFor="editArtworkImage"
              className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-purple-500/30 bg-[#080714] p-4 transition hover:border-purple-500 w-full"
            >
              <FiUploadCloud className="mb-1 text-2xl text-purple-400" />
              <span className="text-xs text-gray-400">
                Click to upload a new image
              </span>
              <input
                id="editArtworkImage"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setNewImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={updating}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50"
          >
            <FiSave />
            {updating ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ২. মেইন পেজ কম্পোনেন্ট যেখানে Suspense দিয়ে মোড়ানো আছে
export default function EditArtworkPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#080714]">
          <FiLoader className="text-4xl text-purple-500 animate-spin" />
        </div>
      }
    >
      <EditArtworkContent />
    </Suspense>
  );
}