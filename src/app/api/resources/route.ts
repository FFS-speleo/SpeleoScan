import { Ressource } from "@/types";
import { fetchRessources } from "@/api";
import { utf8ToBase64 } from "@/lib";
import { NextResponse } from "next/server";

//TODO: Protect this route for admin only

export const PUT = async (request: Request) => {
  const body = (await request?.json()) as Ressource;
  if (!body || !body.title || !body.url) {
    return NextResponse.json("Invalid body", { status: 400 });
  }

  body.id = crypto.randomUUID();

  const {
    GITHUB_API_URL: baseUrl,
    GITHUB_REPO_OWNER: owner,
    GITHUB_REPO_DATABASE_NAME: repoName,
    GITHUB_RESOURCES_PATH: resourcesPath,
    GITHUB_API_TOKEN: token,
  } = process.env;

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
        //TODO(Noshy): add user mail in commit message + author field
        message: "<user mail> added a new ressource",
        sha: sha,
      }),
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
};
