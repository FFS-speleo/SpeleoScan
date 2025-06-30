import { revalidateTag } from "next/cache";

export const POST = async (request: Request) => {
  const githubEvent = request.headers.get("x-github-event");

  if (githubEvent === "push") {
    revalidateTag("qr_code_resources");
    revalidateTag("users_list");
  }

  return Response.json("Accepted", { status: 202 });
};
