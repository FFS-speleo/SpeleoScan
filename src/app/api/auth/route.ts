import { fetchUsers } from "@/api";
import * as bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new NextResponse(
      JSON.stringify({ message: "L'email et le mot de passe sont requis" }),
      {
        status: 400,
      },
    );
  }

  const { users: allUsers } = await fetchUsers();

  const user = allUsers.find(
    (user) =>
      user.email === email && bcrypt.compareSync(password, user.password),
  );

  if (user === undefined) {
    return new NextResponse(
      JSON.stringify({ message: "Email ou mot de passe incorrect" }),
      { status: 401 },
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(secret);

  return NextResponse.json({ token });
};
