"use client";

import { getQrCodeFromId } from "@/api";
import { Ressource } from "@/types";
import { ExternalLink, FileText } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface RessourceCardProps {
  ressource: Ressource;
}

const RessourceCard: React.FC<RessourceCardProps> = ({ ressource }) => {
  const [qrSrc, setQrSrc] = useState<string>("");
  const pathname = usePathname();
  const url = typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";
  
  useEffect(() => {
    async function fetchQr() {
      const src = await getQrCodeFromId(ressource.id, url);
      setQrSrc(src);
    }

    fetchQr();
  }, [ressource.id]);
  
  return (
    <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
      <div className="card-body p-5">
        <div className="flex items-center justify-between">
          <div className="mr-4 flex-shrink-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 mr-8">
            <div className="w-24 h-24 bg-base-300 border-2 border-dashed border-base-content/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                {qrSrc && (
                  <Image src={qrSrc} alt="QR code" width="300" height="300" />
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="card-title text-lg mb-2">{ressource.title}</h3>
            {ressource.description && (
              <p className="text-base-content/70 text-sm mb-2 line-clamp-2">
                {ressource.description}
              </p>
            )}
            <div className="flex gap-2 mt-1">
              {ressource.page && (
                <div className="badge badge-secondary badge-sm">
                  Page {ressource.page}
                </div>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <a
              href={ressource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm btn-outline"
            >
              Consulter
              <ExternalLink size={14} className="ml-1" />
            </a>
            <button
                className="btn btn-ghost btn-sm p-2 ml-2 bg-primary/10"
                disabled={!qrSrc}
                title="Télécharger le QR code"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = qrSrc;
                  link.download = `qr-${ressource.id}.png`;
                  link.click();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="oklch(0.829 0.183 111.516)"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                  />
                </svg>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RessourceCard;
