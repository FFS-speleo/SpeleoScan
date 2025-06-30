"use client";

import { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { ButtonAtom } from "@/atoms";
import { ModalMolecule } from "@/molecules";
import { UserFormMolecule } from "@/molecules";
import { User } from "@/types";

interface UsersTableProps {
  users: User[];
  onAdd: (user: Omit<User, "id">) => void;
  onEdit: (id: string, user: Omit<User, "id">) => void;
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

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
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
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="font-medium">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="flex space-x-2">
                        <ButtonAtom
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit size={14} />
                        </ButtonAtom>
                        <ButtonAtom
                          variant="error"
                          size="sm"
                          onClick={() => onDelete(user.id)}
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
        title={editingUser ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
        size="md"
      >
        <UserFormMolecule
          user={editingUser}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </ModalMolecule>
    </>
  );
};

export default UsersTable;
