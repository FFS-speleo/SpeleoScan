import { fetchRessources, fetchUsers } from "@/api";
import { protectAPIRoute } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id: resourceId } = await params;

  const { users } = await fetchUsers();
  const userJWT = request.headers.get("Authorization");

  const user = (await protectAPIRoute(userJWT ?? "", users)) ?? null;

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // eslint-disable-next-line prefer-const
  let { resources } = await fetchRessources();
  const resourceToRedirect = resources.find(
    (resource) => resource.id === resourceId,
  );
  if (resourceToRedirect === undefined) {
    return NextResponse.json(
      { message: "Ressource introuvable" },
      { status: 404 },
    );
  }

  return NextResponse.redirect(new URL(resourceToRedirect.url, request.url));
};

export default GET;
