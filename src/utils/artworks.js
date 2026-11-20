// const BaseURL = process.env.NEXT_PUBLIC_API_URL;

// export const CreateArtwork = async (data) => {
//     // console.log(data,"creat artwork");
//     const res = await fetch(`${BaseURL}/api/artworks`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });


//     const result = await res.json();

//     return result;
// };



const BaseURL = process.env.NEXT_PUBLIC_API_URL;

export const CreateArtwork = async (data) => {
  try {
    if (!BaseURL) {
      throw new Error("Backend API URL not found!");
    }

    const res = await fetch(`${BaseURL}/api/artworks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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


// get

export const GetMyArtworks = async (artistId) => {
  try {
    if (!BaseURL) {
      throw new Error("Backend API URL not found!");
    }

    const res = await fetch(
      `${BaseURL}/api/artworks?artistId=${encodeURIComponent(artistId)}`
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
