import { NextRequest, NextResponse } from "next/server";
import { GithubClient, isUser, protectAPIRoute, validateBody } from "@/lib";
import { fetchUsers } from "@/api";
import * as bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid or missing JSON body" },
      { status: 400 },
    );
  }

  if (!validateBody(body, isUser)) {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }

  body.id = crypto.randomUUID();
  const { GITHUB_USERS_PATH: usersPath } = process.env;

  // eslint-disable-next-line prefer-const
  let { users, sha } = await fetchUsers();

  const userJWT = request.headers.get("Authorization");

  const user = (await protectAPIRoute(userJWT ?? "", users)) ?? null;

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  body.password = await bcrypt.hash(body.password, 10);
  if (users.findIndex(({ email }) => email === body.email) !== -1) {
    return NextResponse.json(
      { message: "L'utilisateur existe déjà" },
      { status: 400 },
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  Array.isArray(users) ? users.push(body) : (users = [body]);

  const client = new GithubClient();
  try {
    const data = await client.applyChange(
      usersPath,
      users,
      `${user.email} added a new user`,
      sha,
    );

    return NextResponse.json(
      {
        data,
        message: `Utilisateur créé avec succès`,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { message: error?.message ?? "Une erreur est survenue" },
      { status: 500 },
    );
  }
};
