"use client";

import { getQrCodeFromId } from "@/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      if (typeof id === "string") {
        const path = await getQrCodeFromId(id);
        setImagePath(path);
      }
    }
    fetchImage();
  }, [id]);

  if (!imagePath) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center h-full">
      <img src={imagePath} alt="QR code" />
    </div>
  );
}
