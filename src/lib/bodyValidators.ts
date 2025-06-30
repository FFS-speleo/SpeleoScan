import { Ressource } from "@/types";

export const isResource = (body: unknown): body is Ressource => {
  return (
    typeof body === "object" &&
    body !== null &&
    "title" in body &&
    "url" in body
  );
};
