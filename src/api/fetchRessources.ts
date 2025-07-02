import { base64ToUtf8 } from "@/lib";
import { GithubResponse, Ressource } from "@/types";

export const fetchRessources = async (): Promise<
  Partial<GithubResponse> & { resources: Ressource[] }
> => {
  const {
    GITHUB_API_URL: baseUrl,
    GITHUB_REPO_OWNER: owner,
    GITHUB_REPO_DATABASE_NAME: repoName,
    GITHUB_RESOURCES_PATH: resourcesPath,
    GITHUB_API_TOKEN: token,
  } = process.env;

  const res = await fetch(
    `${baseUrl}/repos/${owner}/${repoName}/contents/${resourcesPath}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["qr_code_resources"],
      },
    },
  );

  const data: GithubResponse = await res.json();

  if (!data.content) {
    throw new Error("No content");
  }

  return {
    ...data,
    resources: JSON.parse(base64ToUtf8(data.content)) as Ressource[],
  } as Partial<GithubResponse> & { resources: Ressource[] };
};
