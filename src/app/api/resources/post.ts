import { fetchRessources, fetchUsers } from "@/api";
import { utf8ToBase64, protectAPIRoute, validateBody, isResource } from "@/lib";
import { NextResponse } from "next/server";

const POST = async (request: Request) => {
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

  body.id = crypto.randomUUID();

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

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  Array.isArray(resources) ? resources.push(body) : (resources = [body]);

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
        message: `${user.email} added a new ressource`,
        sha: sha,
      }),
    },
  );

  const data = await res.json();

  return NextResponse.json(data);
};

export default POST;
