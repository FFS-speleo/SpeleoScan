"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import Toastify from "toastify-js";
import { ButtonAtom } from "@/atoms";
import { ModalMolecule } from "@/molecules";
import { UserFormMolecule } from "@/molecules";
import { User } from "@/types";
import { createUser, deleteUser } from "@/api";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users: initialUsers }) => {
  const [users] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (userData: Omit<User, "id">) => {
    setIsLoading(true);
    try {
      const response = await createUser(userData);
      Toastify({
        text: response.message || "Utilisateur créé avec succès",
        backgroundColor: "#10b981",
        close: true,
        gravity: "top",
        position: "right",
      }).showToast();

      // Rafraîchir la page pour obtenir les données mises à jour
      window.location.reload();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erreur lors de la création";
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

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsLoading(true);
    try {
      const response = await deleteUser(userToDelete.id);
      Toastify({
        text: response.message || "Utilisateur supprimé avec succès",
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
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Utilisateurs</h2>
            <ButtonAtom
              variant="primary"
              onClick={handleAdd}
              disabled={isLoading}
            >
              <Plus size={16} className="mr-2" />
              Nouvel utilisateur
            </ButtonAtom>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>
                      <div className="flex space-x-2">
                        <ButtonAtom
                          variant="error"
                          size="sm"
                          onClick={() => handleDeleteClick(user)}
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
        title={"Nouvel utilisateur"}
        size="md"
      >
        <UserFormMolecule
          user={editingUser || undefined}
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
            Êtes-vous sûr de vouloir supprimer l&apos;utilisateur{" "}
            <strong>{userToDelete?.email}</strong> ?
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

export default UsersTable;
