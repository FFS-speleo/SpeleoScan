export type GithubResponse = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: "file" | "dir";
  content?: string | null; // Base64 encoded content for files
  encoding?: "base64" | null; // Encoding type
  _links: {
    self: string;
    git: string;
    html: string;
  };
};

export type Ressource = {
  id: string;
  title: string;
  description?: string;
  page?: number;
  url: string;
};
