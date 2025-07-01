"use client";

import React, { useState, useMemo } from "react";
import { SearchInputAtom } from "@/atoms";
import { RessourceCardMolecule } from "@/molecules";
import { RessourceListMolecule } from "@/molecules";
import { Ressource } from "@/types";
import { Search, BookOpen, Filter, Grid3X3, List } from "lucide-react";

interface RessourcesListProps {
  ressources: Ressource[];
}

type SearchField = "titre" | "page" | "description" | "id";
type ViewFormat = "grid" | "list";

const searchFieldLabels: Record<SearchField, string> = {
  titre: "Titre",
  page: "Page",
  description: "Description",
  id: "ID",
};

const RessourcesList: React.FC<RessourcesListProps> = ({ ressources }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewFormat, setViewFormat] = useState<ViewFormat>("grid");
  const [selectedFields, setSelectedFields] = useState<SearchField[]>([
    "titre",
    "page",
    "description",
    "id",
  ]);

  const filteredRessources = useMemo(() => {
    if (!searchTerm.trim()) return ressources;

    const term = searchTerm.toLowerCase();
    return ressources.filter((ressource) => {
      const searchResults = [];

      if (selectedFields.includes("titre")) {
        searchResults.push(ressource.title.toLowerCase().includes(term));
      }

      if (selectedFields.includes("page")) {
        searchResults.push(ressource.page?.toString().includes(term) || false);
      }

      if (selectedFields.includes("description")) {
        searchResults.push(
          ressource.description?.toLowerCase().includes(term) || false,
        );
      }

      if (selectedFields.includes("id")) {
        searchResults.push(
          ressource.id.toLowerCase() === term ||
            ressource.id.toLowerCase().includes(term),
        );
      }

      return searchResults.some(Boolean);
    });
  }, [ressources, searchTerm, selectedFields]);

  const handleFieldToggle = (field: SearchField) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field],
    );
  };

  const getPlaceholderText = () => {
    if (selectedFields.length === 0)
      return "Sélectionnez au moins un champ de recherche";
    const fields = selectedFields
      .map((field) => searchFieldLabels[field])
      .join(", ");
    return `Rechercher dans : ${fields}`;
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedFields(["titre", "page", "description", "id"]);
  };

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

        <div className="max-w-4xl mx-auto space-y-4">
          {/* Sélecteur de champs */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <span className="font-medium text-base-content">
                    Champs de recherche :
                  </span>
                </div>
                <span className="text-sm text-base-content/60">
                  {selectedFields.length}/$
                  {Object.keys(searchFieldLabels).length} sélectionnés
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(Object.keys(searchFieldLabels) as SearchField[]).map(
                  (field) => (
                    <label key={field} className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm mr-2"
                        checked={selectedFields.includes(field)}
                        onChange={() => handleFieldToggle(field)}
                      />
                      <span className="text-sm">
                        {searchFieldLabels[field]}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="flex items-center justify-between flex-col md:flex-row">
            <SearchInputAtom
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={getPlaceholderText()}
              className="input-lg"
            />
            {/* Boutons de format d'affichage */}
            <div className="flex w-80  items-center justify-center space-x-2 md:justify-end mt-2 md:mt-0">
              <button
                className={`btn ${viewFormat === "grid" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setViewFormat("grid")}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Cartes
              </button>
              <button
                className={`btn ${viewFormat === "list" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setViewFormat("list")}
              >
                <List className="h-4 w-4 mr-2" />
                Liste
              </button>
            </div>
          </div>
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
        viewFormat === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRessources.map((ressource) => (
              <RessourceCardMolecule key={ressource.id} ressource={ressource} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRessources.map((ressource) => (
              <RessourceListMolecule key={ressource.id} ressource={ressource} />
            ))}
          </div>
        )
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
              onClick={handleClearSearch}
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
