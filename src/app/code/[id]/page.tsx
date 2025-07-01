"use client";

import { getQrCodeFromId } from "@/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
  const { id } = useParams();
  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      const path = getQrCodeFromId(id);
      setImagePath(path);
    }
  }, [id]);

  if (!imagePath) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center h-full">
      <Image src={imagePath} alt="QR code" />
    </div>
  );
}
