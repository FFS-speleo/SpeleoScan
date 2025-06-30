import { NextRequest, NextResponse } from "next/server";
import { isResource, protectAPIRoute, validateBody, GithubClient } from "@/lib";
import { fetchRessources, fetchUsers } from "@/api";

const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid or missing JSON body" },
      { status: 400 },
    );
  }

  if (!validateBody(body, isResource)) {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }
  const { id: resourceId } = await params;

  const { GITHUB_RESOURCES_PATH: resourcesPath } = process.env;

  const { users } = await fetchUsers();
  const userJWT = request.headers.get("Authorization");

  const user = (await protectAPIRoute(userJWT ?? "", users)) ?? null;

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // eslint-disable-next-line prefer-const
  let { resources, sha } = await fetchRessources();
  const resourceToChangeIndex = resources.findIndex(
    (resource) => resource.id === resourceId,
  );
  if (resourceToChangeIndex === -1) {
    return NextResponse.json(
      { message: "Ressource introuvable" },
      { status: 404 },
    );
  }

  resources[resourceToChangeIndex] = {
    ...body,
  };

  const client = new GithubClient();
  try {
    const data = await client.applyChange(
      resourcesPath,
      resources,
      `${user.email} edited resource id: ${resourceId}`,
      sha,
    );
    return NextResponse.json(
      {
        data,
        message: `Ressource ${resourceId} modifié avec succès`,
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

export default PUT;
