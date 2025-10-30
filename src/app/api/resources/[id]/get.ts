import { fetchRessources } from "@/api";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id: resourceId } = await params;

  const { resources } = await fetchRessources();
  const resourceToRedirect = resources.find(
    (resource) => resource.id === resourceId,
  );
  if (resourceToRedirect === undefined) {
    return NextResponse.json(
      { message: "Ressource introuvable" },
      { status: 404 },
    );
  }

  return NextResponse.json({ url: resourceToRedirect.url }, { status: 200 });
};

export default GET;
