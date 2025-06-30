"use client";

import { ExternalLink } from "lucide-react";
import { Ressource } from "@/types";

interface RessourceCardProps {
  ressource: Ressource;
}

const RessourceCard: React.FC<RessourceCardProps> = ({ ressource }) => (
  <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="card-body p-4">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0 mr-8">
          <div className="w-24 h-24 bg-base-300 border-2 border-dashed border-base-content/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-base-content/60 font-medium">
                QR Code
              </div>
              <div className="text-xs text-base-content/40 mt-1">Bientôt</div>
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
          </div>{" "}
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
        </div>
      </div>
    </div>
  </div>
);

export default RessourceCard;
