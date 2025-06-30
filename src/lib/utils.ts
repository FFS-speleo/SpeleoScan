import { JWTVerify } from "@/lib";
import { User } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const protectAPIRoute = async (userJWT: string, users: User[]) => {
  try {
    const jwt = await JWTVerify(userJWT);
    if (jwt.payload.userId) {
      const id = jwt.payload.userId;
      return users.find((u: User) => u.id === id);
    }
    return null;
  } catch {
    return null;
  }
};

export const validateBody = <T>(body: unknown, validator: (body: unknown) => body is T): body is T => {
  return validator(body);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
