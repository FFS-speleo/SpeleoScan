"use client";

import { getQrCodeFromId } from "@/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [url] = useState(window.location.href);

  useEffect(() => {
    async function fetchImage() {
      if (typeof id === "string") {
        const path = await getQrCodeFromId(id, url);
        setImagePath(path);
      }
    }
    fetchImage();
  }, [id]);

  if (!imagePath) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center h-full">
      <Image src={imagePath} alt="QR code" width="300" height="300" />
    </div>
  );
}
