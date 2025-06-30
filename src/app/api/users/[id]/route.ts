import { NextRequest, NextResponse } from "next/server";
import { fetchUsers } from "@/api";
import { GithubClient, protectAPIRoute } from "@/lib";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id: userId } = await params;
  const { GITHUB_USERS_PATH: usersPath } = process.env;

  // eslint-disable-next-line prefer-const
  let { users, sha } = await fetchUsers();

  const userJWT = request.headers.get("Authorization");

  const user = (await protectAPIRoute(userJWT ?? "", users)) ?? null;

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return NextResponse.json(
      { message: "Utilisateur introuvable" },
      { status: 404 },
    );
  }

  users.splice(userIndex, 1);
  const client = new GithubClient();
  try {
    const data = await client.applyChange(
      usersPath,
      users,
      `${user.email} deleted resource id: ${userId}`,
      sha,
    );
    return NextResponse.json(
      {
        data,
        message: `Utilisateur ${userId} supprimée avec succès`,
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
