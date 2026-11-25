import { getClientToken } from "./client-token";

const BaseURL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = async () => {
  const token = await getClientToken();

  console.log("Token:", token);

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ================= PUBLIC ROUTES =================

export const GetHomePageData = async () => {
  const res = await fetch(`${BaseURL}/api/home-data`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export const GetArtworkData = async (search = "", category = "All") => {
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category && category !== "All") params.append("category", category);

    const res = await fetch(
      `${BaseURL}/api/all/artworks?${params.toString()}`,
      {
        cache: "no-store",
      },
    );
    const data = await res.json();

    if (data.success) {
      return data.artworks || data.data || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch artworks:", error);
    return [];
  }
};

export const GetSingleArtworkDetels = async (id) => {
  try {
    const res = await fetch(`${BaseURL}/api/all/artworks/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();

    if (data.success) {
      return data.artwork;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch artwork details:", error);
    return null;
  }
};

// ================= PROTECTED ROUTES =================

export const CreateArtwork = async (data) => {
  try {
    if (!BaseURL) {
      throw new Error("Backend API URL not found!");
    }

    const authHeaders = await getAuthHeaders();

    const res = await fetch(`${BaseURL}/api/artworks`, {
      method: "POST",
      headers: authHeaders, // ডুপ্লিকেট headers রিমুভ করে সঠিক authHeaders দেওয়া হলো
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Artwork creation failed");
    }

    return result;
  } catch (error) {
    console.error("CreateArtwork Error:", error);
    throw error;
  }
};

export const GetMyArtworks = async (artistId) => {
  try {
    if (!BaseURL) {
      throw new Error("Backend API URL not found!");
    }
    const authHeaders = await getAuthHeaders();

    const res = await fetch(
      `${BaseURL}/api/artworks?artistId=${encodeURIComponent(artistId)}`,
      {
        headers: authHeaders,
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch artworks");
    }

    return result;
  } catch (error) {
    console.error("GetMyArtworks Error:", error);
    throw error;
  }
};

export const GetSingleArtwork = async (id) => {
  try {
    if (!BaseURL) {
      throw new Error("Backend API URL not found!");
    }
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${BaseURL}/api/artworks/${id}`, {
      headers: authHeaders,
    });

    
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch artwork");
    }
    const result = await res.json();
    
    return result;
  } catch (error) {
    console.error("GetSingleArtwork Error:", error);
    throw error;
  }
};

// Update Artwork
export const UpdateArtwork = async (id, artworkData) => {
  try {
    if (!BaseURL) {
      throw new Error("Backend API URL not found!");
    }
    const authHeaders = await getAuthHeaders();

    const res = await fetch(`${BaseURL}/api/artworks/${id}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        ...artworkData,
        price: Number(artworkData.price),
        stock: Number(artworkData.stock),
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to update artwork");
    }

    return result;
  } catch (error) {
    console.error("UpdateArtwork Error:", error);
    throw error;
  }
};

// Delete Artwork
export const DeleteArtwork = async (id) => {
  try {
    if (!BaseURL) {
      throw new Error("Backend API URL not found!");
    }
    const authHeaders = await getAuthHeaders();

    const res = await fetch(`${BaseURL}/api/artworks/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to delete artwork");
    }

    return result;
  } catch (error) {
    console.error("DeleteArtwork Error:", error);
    throw error;
  }
};