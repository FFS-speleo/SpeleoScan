import { base64ToUtf8 } from "@/lib";
import { GithubResponse, User } from "@/types";

export const fetchUsers = async (): Promise<
  Partial<GithubResponse> & { users: User[] }
> => {
  const {
    GITHUB_API_URL: baseUrl,
    GITHUB_REPO_OWNER: owner,
    GITHUB_REPO_DATABASE_NAME: repoName,
    GITHUB_USERS_PATH: usersPath,
    GITHUB_API_TOKEN: token,
  } = process.env;

  const res = await fetch(
    `${baseUrl}/repos/${owner}/${repoName}/contents/${usersPath}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["qr_code_users"],
      },
    },
  );

  const data: GithubResponse = await res.json();

  if (!data.content) {
    throw new Error("No content");
  }

  return {
    ...data,
    users: JSON.parse(base64ToUtf8(data.content)) as User[],
  } as Partial<GithubResponse> & { users: User[] };
};
