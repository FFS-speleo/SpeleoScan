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

  async applyChange(filePath: string | undefined, dataToSend: object, commitMessage: string, sha: string | undefined) {
    let currentSha = sha;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        const res = await fetch(`${this.baseUrl}/repos/${this.owner}/${this.repoName}/contents/${filePath}`, {
          method: "PUT",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: utf8ToBase64(JSON.stringify(dataToSend)),
            message: commitMessage,
            sha: currentSha,
          }),
        });

        if (res.ok) {
          return res.json();
        }

        // Si conflit 409, récupérer le nouveau SHA et réessayer
        if (res.status === 409 && retryCount < maxRetries - 1) {
          console.log(`Conflit détecté (409), tentative ${retryCount + 1}/${maxRetries}`);

          // Récupérer le SHA actuel du fichier
          const getCurrentFile = await fetch(`${this.baseUrl}/repos/${this.owner}/${this.repoName}/contents/${filePath}`, {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${this.token}`,
            },
          });

          if (getCurrentFile.ok) {
            const currentFileData = await getCurrentFile.json();
            currentSha = currentFileData.sha;
            retryCount++;

            // Attendre un peu avant de réessayer
            await new Promise((resolve) => setTimeout(resolve, 100 * retryCount));
            continue;
          }
        }

        throw new Error(`${res.status} ${res.statusText}`);
      } catch (error) {
        if (retryCount === maxRetries - 1) {
          throw error;
        }
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 100 * retryCount));
      }
    }

    throw new Error("Échec après plusieurs tentatives");
  }
}

export default GithubClient;
