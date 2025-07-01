import { ApiResponse, Ressource } from "@/types";

const API_BASE = "/api/resources";

// Fonction utilitaire pour récupérer le token depuis les cookies
const getAuthToken = (): string | null => {
  if (typeof document === "undefined") return null;

  const tokenName =
    process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME || "FFS-QR-CODE-ADMIN-TOKEN";
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${tokenName}=`),
  );

  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

// Fonction utilitaire pour créer les headers avec autorisation
const createAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: token }),
  };
};

export const createRessource = async (
  ressourceData: Partial<Ressource>,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: createAuthHeaders(),
      body: JSON.stringify(ressourceData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Erreur lors de la création de la ressource",
      );
    }

    return result;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Erreur réseau");
  }
};

export const updateRessource = async (
  ressourceId: string,
  ressourceData: Partial<Ressource>,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE}/${ressourceId}`, {
      method: "PUT",
      headers: createAuthHeaders(),
      body: JSON.stringify(ressourceData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Erreur lors de la modification de la ressource",
      );
    }

    return result;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Erreur réseau");
  }
};

export const deleteRessource = async (
  ressourceId: string,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE}/${ressourceId}`, {
      method: "DELETE",
      headers: createAuthHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Erreur lors de la suppression de la ressource",
      );
    }

    return result;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Erreur réseau");
  }
};
