import { utf8ToBase64 } from "@/lib/base64ToUTF8";

class GithubClient {
  private readonly token: string | undefined;
  private readonly owner: string | undefined;
  private readonly baseUrl: string | undefined;
  private readonly repoName: string | undefined;

  constructor() {
    this.owner = process.env.GITHUB_REPO_OWNER;
    this.baseUrl = process.env.GITHUB_API_URL;
    this.repoName = process.env.GITHUB_REPO_DATABASE_NAME;
    this.token = process.env.GITHUB_API_TOKEN;
  }

  async applyChange(
    filePath: string | undefined,
    dataToSend: object,
    commitMessage: string,
    sha: string | undefined,
  ) {
    const res = await fetch(
      `${this.baseUrl}/repos/${this.owner}/${this.repoName}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: utf8ToBase64(JSON.stringify(dataToSend)),
          message: commitMessage,
          sha: sha,
        }),
      },
    );

    return res.json();
  }
}

export default GithubClient;
