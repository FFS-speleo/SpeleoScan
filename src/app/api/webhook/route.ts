import { revalidateTag } from "next/cache";

export const POST = async (request: Request) => {
  const githubEvent = request.headers.get("x-github-event");

  if (githubEvent === "push") {
    revalidateTag("qr_code_ressources");
  }

  return Response.json("Accepted", { status: 202 });
};
