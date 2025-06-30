"use client";

import { ExternalLink, FileText } from "lucide-react";
import { Ressource } from "@/types";

interface RessourceCardProps {
  ressource: Ressource;
}

const RessourceCard: React.FC<RessourceCardProps> = ({ ressource }) => (
  <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
    <div className="card-body">
      <div className="flex items-start justify-between gap-4">
        {/* Contenu principal à gauche */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="card-title text-lg font-bold text-base-content">{ressource.title}</h3>
              <div className="flex gap-2 mt-1">{ressource.page && <div className="badge badge-secondary badge-sm">Page {ressource.page}</div>}</div>
            </div>
          </div>

          <p className="text-base-content/80 mb-4 leading-relaxed">{ressource.description}</p>

          <div className="card-actions justify-start">
            <a href={ressource.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm btn-outline">
              Consulter
              <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        </div>

        {/* Emplacement QR code à droite */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-base-300 border-2 border-dashed border-base-content/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-base-content/60 font-medium">QR Code</div>
              <div className="text-xs text-base-content/40 mt-1">Bientôt</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RessourceCard;
