"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { ButtonAtom } from "@/atoms";
import { ModalMolecule } from "@/molecules";
import { UserFormMolecule } from "@/molecules";
import { User } from "@/types";

interface UsersTableProps {
  users: User[];
  onAdd: (user: Omit<User, "id">) => void;
  onDelete: (id: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: Omit<User, "id">) => {
    if (editingUser) {
      onEdit(editingUser.id, data);
    } else {
      onAdd(data);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      onDelete(userToDelete.id);
    }
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
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
            <ButtonAtom variant="primary" onClick={handleAdd}>
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
          user={editingUser}
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
            <ButtonAtom variant="secondary" onClick={handleCancelDelete}>
              Annuler
            </ButtonAtom>
            <ButtonAtom variant="error" onClick={handleConfirmDelete}>
              Supprimer
            </ButtonAtom>
          </div>
        </div>
      </ModalMolecule>
    </>
  );
};

export default UsersTable;
