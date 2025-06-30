"use client";

import { useState, useMemo } from "react";
import { SearchInputAtom } from "@/atoms";
import { RessourceCardMolecule } from "@/molecules";
import { Ressource } from "@/types";
import { Search, BookOpen } from "lucide-react";

interface RessourcesListProps {
  ressources: Ressource[];
}

const RessourcesList: React.FC<RessourcesListProps> = ({ ressources }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRessources = useMemo(() => {
    if (!searchTerm.trim()) return ressources;

    const term = searchTerm.toLowerCase();
    return ressources.filter(
      (ressource) =>
        ressource.title.toLowerCase().includes(term) ||
        ressource.page.toString().includes(term) ||
        ressource.description.toLowerCase().includes(term),
    );
  }, [ressources, searchTerm]);

  return (
    <div className="space-y-8">
      {/* Header avec recherche */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-base-content">
              Sommaire des Ressources
            </h1>
            <p className="text-base-content/70 text-lg mt-2">
              Explorez notre collection de documents spéléologiques
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <SearchInputAtom
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher par titre, page ou description..."
            className="input-lg"
          />
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats shadow-lg bg-base-200 w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <BookOpen size={32} />
          </div>
          <div className="stat-title">Total des ressources</div>
          <div className="stat-value text-primary">{ressources.length}</div>
          <div className="stat-desc">Documents disponibles</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <Search size={32} />
          </div>
          <div className="stat-title">Résultats trouvés</div>
          <div className="stat-value text-secondary">
            {filteredRessources.length}
          </div>
          <div className="stat-desc">
            {searchTerm ? `Pour "${searchTerm}"` : "Tous les documents"}
          </div>
        </div>
      </div>

      {/* Liste des ressources */}
      {filteredRessources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRessources.map((ressource) => (
            <RessourceCardMolecule key={ressource.id} ressource={ressource} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="p-4 bg-base-200 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Search className="h-10 w-10 text-base-content/50" />
          </div>
          <h3 className="text-xl font-semibold text-base-content mb-2">
            Aucune ressource trouvée
          </h3>
          <p className="text-base-content/70">
            {searchTerm
              ? `Aucun résultat pour "${searchTerm}". Essayez avec d'autres mots-clés.`
              : "Aucune ressource disponible pour le moment."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="btn btn-primary btn-sm mt-4"
            >
              Effacer la recherche
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RessourcesList;
