"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";
import ArtworkForm from "@/component/artist/ArtworkForm";

export default function AddArtworkPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleAdd = async (data) => {
    await api.post("/artworks", {
      ...data,
      artistName: session?.user?.name,
      artistEmail: session?.user?.email,
      artistImage: session?.user?.image ?? "",
    });
    toast.success("Artwork added");
    router.push("/dashboard/artist");
  };

  return (
    <section>
      <h1 className="text-2xl font-bold text-white">Add Artwork</h1>
      <p className="mb-6 text-sm text-gray-400">Upload a new piece to the marketplace.</p>
      <ArtworkForm onSubmit={handleAdd} submitLabel="Publish artwork" />
    </section>
  );
}