"use client";

import { useState } from "react";
import { Edit, Trash2, Plus, ExternalLink } from "lucide-react";
import { ButtonAtom } from "@/atoms";
import { ModalMolecule } from "@/molecules";
import { RessourceFormMolecule } from "@/molecules";
import { Ressource } from "@/types";

interface RessourcesTableProps {
  ressources: Ressource[];
  onAdd: (ressource: Omit<Ressource, "id">) => void;
  onEdit: (id: string, ressource: Omit<Ressource, "id">) => void;
  onDelete: (id: string) => void;
}

const RessourcesTable: React.FC<RessourcesTableProps> = ({
  ressources,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRessource, setEditingRessource] = useState<Ressource | null>(
    null,
  );

  const handleAdd = () => {
    setEditingRessource(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ressource: Ressource) => {
    setEditingRessource(ressource);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: Omit<Ressource, "id">) => {
    if (editingRessource) {
      onEdit(editingRessource.id, data);
    } else {
      onAdd(data);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingRessource(null);
  };

  return (
    <>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Ressources QR</h2>
            <ButtonAtom variant="primary" onClick={handleAdd}>
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
                        >
                          <Edit size={14} />
                        </ButtonAtom>
                        <ButtonAtom
                          variant="error"
                          size="sm"
                          onClick={() => onDelete(ressource.id)}
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
          ressource={editingRessource}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </ModalMolecule>
    </>
  );
};

export default RessourcesTable;
