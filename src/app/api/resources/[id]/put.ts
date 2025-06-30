import { NextRequest, NextResponse } from "next/server";
import { isResource, protectAPIRoute, utf8ToBase64, validateBody } from "@/lib";
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

  const {
    GITHUB_API_URL: baseUrl,
    GITHUB_REPO_OWNER: owner,
    GITHUB_REPO_DATABASE_NAME: repoName,
    GITHUB_RESOURCES_PATH: resourcesPath,
    GITHUB_API_TOKEN: token,
  } = process.env;

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

  const res = await fetch(
    `${baseUrl}/repos/${owner}/${repoName}/contents/${resourcesPath}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: utf8ToBase64(JSON.stringify(resources)),
        message: `${user.email} edited resource id: ${resourceId}`,
        sha: sha,
      }),
    },
  );

  const data = await res.json();

  return NextResponse.json(data);
};

export default PUT;
