"use client";

import { useState } from "react";
import { Edit, Trash2, Plus, ExternalLink } from "lucide-react";
import Toastify from "toastify-js";
import { ButtonAtom } from "@/atoms";
import { ModalMolecule } from "@/molecules";
import { RessourceFormMolecule } from "@/molecules";
import { Ressource } from "@/types";
import { createRessource, updateRessource, deleteRessource } from "@/api";

interface RessourcesTableProps {
  ressources: Ressource[];
}

const RessourcesTable: React.FC<RessourcesTableProps> = ({
  ressources: initialRessources,
}) => {
  const [ressources] = useState<Ressource[]>(initialRessources);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRessource, setEditingRessource] = useState<Ressource | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [ressourceToDelete, setRessourceToDelete] = useState<Ressource | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    setEditingRessource(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ressource: Ressource) => {
    setEditingRessource(ressource);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingRessource(null);
  };

  const handleSubmit = async (ressourceData: Omit<Ressource, "id">) => {
    setIsLoading(true);
    try {
      let response;
      if (editingRessource) {
        // Mode édition
        response = await updateRessource(editingRessource.id, ressourceData);
        Toastify({
          text: response.message || "Ressource modifiée avec succès",
          backgroundColor: "#10b981",
          close: true,
          gravity: "top",
          position: "right",
        }).showToast();
      } else {
        // Mode création
        response = await createRessource(ressourceData);
        Toastify({
          text: response.message || "Ressource créée avec succès",
          backgroundColor: "#10b981",
          close: true,
          gravity: "top",
          position: "right",
        }).showToast();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erreur lors de l'opération";
      Toastify({
        text: errorMessage,
        backgroundColor: "#ef4444",
        close: true,
        gravity: "top",
        position: "right",
      }).showToast();
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleDeleteClick = (ressource: Ressource) => {
    setRessourceToDelete(ressource);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!ressourceToDelete) return;

    setIsLoading(true);
    try {
      const response = await deleteRessource(ressourceToDelete.id);
      Toastify({
        text: response.message || "Ressource supprimée avec succès",
        backgroundColor: "#10b981",
        close: true,
        gravity: "top",
        position: "right",
      }).showToast();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression";
      Toastify({
        text: errorMessage,
        backgroundColor: "#ef4444",
        close: true,
        gravity: "top",
        position: "right",
      }).showToast();
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setRessourceToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setRessourceToDelete(null);
  };

  return (
    <>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Ressources QR</h2>
            <ButtonAtom
              variant="primary"
              onClick={handleAdd}
              disabled={isLoading}
            >
              <Plus size={16} className="mr-2" />
              Nouvelle ressource
            </ButtonAtom>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Description</th>
                  <th>Page</th>
                  <th>URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ressources.map((ressource) => (
                  <tr key={ressource.id}>
                    <td className="font-medium">{ressource.title}</td>
                    <td className="max-w-xs truncate">
                      {ressource.description}
                    </td>
                    <td>{ressource.page}</td>
                    <td>
                      <a
                        href={ressource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <ButtonAtom
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(ressource)}
                          disabled={isLoading}
                        >
                          <Edit size={14} />
                        </ButtonAtom>
                        <ButtonAtom
                          variant="error"
                          size="sm"
                          onClick={() => handleDeleteClick(ressource)}
                          disabled={isLoading}
                        >
                          <Trash2 size={14} />
                        </ButtonAtom>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalMolecule
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={
          editingRessource ? "Modifier la ressource" : "Nouvelle ressource"
        }
        size="md"
      >
        <RessourceFormMolecule
          ressource={editingRessource || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </ModalMolecule>

      <ModalMolecule
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        title="Confirmer la suppression"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-base-content">
            Êtes-vous sûr de vouloir supprimer la ressource{" "}
            <strong>{ressourceToDelete?.title}</strong> ?
          </p>
          <p className="text-sm text-base-content/70">
            Cette action est irréversible.
          </p>
          <div className="flex justify-end space-x-2 pt-4">
            <ButtonAtom
              variant="secondary"
              onClick={handleCancelDelete}
              disabled={isLoading}
            >
              Annuler
            </ButtonAtom>
            <ButtonAtom
              variant="error"
              onClick={handleConfirmDelete}
              disabled={isLoading}
            >
              {isLoading ? "Suppression..." : "Supprimer"}
            </ButtonAtom>
          </div>
        </div>
      </ModalMolecule>
    </>
  );
};

export default RessourcesTable;
