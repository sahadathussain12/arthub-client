"use client";

import { useState, useEffect } from "react";
import { FiUploadCloud, FiPlusCircle, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import { CreateArtwork } from "@/utils/artworks";
import { authClient } from "@/lib/auth-client";

// ছবি দ্রুত আপলোডের জন্য ক্লায়েন্ট সাইড কম্প্রেশন ফাংশন
const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          },
          "image/jpeg",
          quality
        );
      };
    };
  });
};

export default function AddArtworkPage() {
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    price: "",
    stock: "1",
  });

  const [artistId, setArtistId] = useState("");
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false); // লোডিং স্টেট

  useEffect(() => {
    if (session?.user?.id) {
      setArtistId(session.user.id);
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // ডাবল ক্লিক প্রতিরোধ

    try {
      if (!artistId) {
        return toast.error("User not authenticated! Please login again.");
      }

      if (!formData.image) {
        return toast.error("Please upload artwork image");
      }

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("ImgBB API Key not found!");
      }

      setSubmitting(true); // সাবমিট শুরু হওয়ার সাথে সাথে লোডিং চালু

      // ছবি কম্প্রেস করে ছোট সাইজে রূপান্তর (খুব দ্রুত আপলোড হবে)
      const compressedFile = await compressImage(formData.image);

      const imageData = new FormData();
      imageData.append("image", compressedFile);

      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.error?.message || "Image upload failed");
      }

      const imageUrl = uploadData.data.url;

      const result = await CreateArtwork({
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
        stock: Number(formData.stock),
        artistId: artistId,
      });

      if (result.success) {
        toast.success("Artwork added successfully!");

        setFormData({
          title: "",
          category: "",
          description: "",
          image: "",
          price: "",
          stock: "1",
        });
        setPreview("");
      } else {
        throw new Error(result.message || "Failed to add artwork");
      }
    } catch (error) {
      console.error("Artwork Upload Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setSubmitting(false); // কাজ শেষ হলে লোডিং বন্ধ
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Add New Artwork
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Share your creativity with the world. Add a new artwork to your
          collection.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-5 sm:p-6">
              <h2 className="mb-6 text-lg font-semibold text-white">
                Artwork Information
              </h2>

              <div className="space-y-5">
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
                    placeholder="Enter artwork title"
                    required
                    disabled={submitting}
                    className="w-full rounded-xl border border-purple-500/20 bg-[#080714] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 disabled:opacity-50"
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
                    disabled={submitting}
                    className="w-full rounded-xl border border-purple-500/20 bg-[#080714] px-4 py-3 text-sm text-gray-300 outline-none focus:border-purple-500 disabled:opacity-50"
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
                    placeholder="Describe your artwork..."
                    rows={5}
                    required
                    disabled={submitting}
                    className="w-full resize-none rounded-xl border border-purple-500/20 bg-[#080714] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-5 sm:p-6">
              <h2 className="mb-6 text-lg font-semibold text-white">
                Pricing & Inventory
              </h2>

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
                    placeholder="Enter price"
                    min="0.01"
                    step="0.01"
                    required
                    disabled={submitting}
                    className="w-full rounded-xl border border-purple-500/20 bg-[#080714] px-4 py-3 text-sm text-white outline-none focus:border-purple-500 disabled:opacity-50"
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
                    disabled={submitting}
                    className="w-full rounded-xl border border-purple-500/20 bg-[#080714] px-4 py-3 text-sm text-white outline-none focus:border-purple-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Upload Artwork Image *
              </label>

              <label
                htmlFor="artworkImage"
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-purple-500/30 bg-[#080714] p-6 transition hover:border-purple-500 ${
                  submitting ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <FiUploadCloud className="mb-3 text-4xl text-purple-400" />
                <p className="text-sm font-medium text-white">
                  Click to upload artwork
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, JPEG, WEBP
                </p>

                <input
                  id="artworkImage"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  disabled={submitting}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setFormData((prev) => ({
                      ...prev,
                      image: file,
                    }));

                    setPreview(URL.createObjectURL(file));
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {/* Submit */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="reset"
                disabled={submitting}
                onClick={() => {
                  setFormData({
                    title: "",
                    category: "",
                    description: "",
                    image: "",
                    price: "",
                    stock: "1",
                  });
                  setPreview("");
                }}
                className="rounded-xl border border-purple-500/30 px-6 py-3 text-sm font-medium text-gray-300 transition hover:bg-purple-500/10 disabled:opacity-50"
              >
                Reset Form
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <FiLoader className="animate-spin text-lg" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <FiPlusCircle />
                    Publish Artwork
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-purple-500/20 bg-[#100D20] p-5">
              <h2 className="mb-5 text-lg font-semibold text-white">
                Artwork Preview
              </h2>

              <div className="overflow-hidden rounded-xl border border-purple-500/20 bg-[#080714]">
                <div className="relative flex aspect-square items-center justify-center bg-[#171127]">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Artwork Preview"
                      className="h-full w-full object-cover"
                      onError={() => setPreview("")}
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <FiUploadCloud className="mx-auto mb-3 text-4xl" />
                      <p className="text-sm">Artwork image preview</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 p-4">
                  <span className="inline-block rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                    {formData.category || "Category"}
                  </span>

                  <h3 className="break-words font-semibold text-white">
                    {formData.title || "Artwork Title"}
                  </h3>

                  <p className="line-clamp-3 text-sm text-gray-400">
                    {formData.description ||
                      "Your artwork description will appear here."}
                  </p>

                  <div className="flex items-center justify-between border-t border-purple-500/20 pt-3">
                    <span className="font-bold text-purple-400">
                      ${formData.price || "0.00"}
                    </span>

                    <span className="text-xs text-gray-500">
                      Stock: {formData.stock || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}