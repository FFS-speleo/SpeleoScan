import { jwtVerify } from "jose";

export const JWTVerify = async (jwt: string) => {
  const token = jwt.replace(/^Bearer\s+/i, "");
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return jwtVerify(token, secret);
};
