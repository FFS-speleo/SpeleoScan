import { fetchRessources, fetchUsers } from "@/api";
import { generateQrCode } from "@/api/qrCode";
import { GithubClient, isResource, protectAPIRoute, validateBody } from "@/lib";
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

  const { GITHUB_RESOURCES_PATH: resourcesPath } = process.env;

  const { users } = await fetchUsers();
  const userJWT = request.headers.get("Authorization");

  const user = (await protectAPIRoute(userJWT ?? "", users)) ?? null;

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  generateQrCode(body);

  // eslint-disable-next-line prefer-const
  let { resources, sha } = await fetchRessources();

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  Array.isArray(resources) ? resources.push(body) : (resources = [body]);

  const client = new GithubClient();
  try {
    const data = await client.applyChange(
      resourcesPath,
      resources,
      `${user.email} added a new resource`,
      sha,
    );

    return NextResponse.json(
      {
        data,
        message: `Ressource créé avec succès`,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { message: error?.message ?? "Une erreur est survenue" },
      { status: 500 },
    );
  }
};

export default POST;
