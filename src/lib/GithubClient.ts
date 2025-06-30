import { utf8ToBase64 } from "@/lib";

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

    if (!this.owner || !this.baseUrl || !this.repoName || !this.token) {
      throw new Error("Missing required GitHub environment variables.");
    }
  }

  async applyChange(
    filePath: string,
    dataToSend: object,
    commitMessage: string,
    sha: string,
  ) {
    if (!filePath || typeof filePath !== "string") {
      throw new Error("Invalid or missing 'filePath'. It must be a non-empty string.");
    }
    if (!sha || typeof sha !== "string") {
      throw new Error("Invalid or missing 'sha'. It must be a non-empty string.");
    }
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

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    return res.json();
  }
}

export default GithubClient;
