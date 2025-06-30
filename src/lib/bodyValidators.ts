import { Ressource, User } from "@/types";

export const isResource = (body: unknown): body is Ressource => {
  return (
    typeof body === "object" &&
    body !== null &&
    "title" in body &&
    "url" in body
  );
};

export const isUser = (body: unknown): body is User => {
  return (
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    "password" in body
  );
};
