const BaseURL = process.env.NEXT_PUBLIC_API_URL

export const GetAdminDashboardData = async () => {
  const res = await fetch(`${BaseURL}/api/admin/dashboard`, {
    cache: "no-store",
  });
  const result = await res.json()
  return result
};

// update

export const UpdateUserRole = async (userId, role) => {
  const res = await fetch(`${BaseURL}/api/admin/users/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, role }),
  });
  const result = await res.json()
  return result
};

// delete

export const DeleteArtworkByAdmin = async (artworkId) => {
  const res = await fetch(`${BaseURL}/api/admin/artworks/${artworkId}`, {
    method: "DELETE",
  });

  const result = await res.json()

  return result;
};