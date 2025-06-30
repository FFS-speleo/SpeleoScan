"use client";

import { useState } from "react";
import { User } from "@/types";
import { ButtonAtom, InputAtom } from "@/atoms";

interface UserFormProps {
  user?: User;
  onSubmit: (data: Omit<User, "id">) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    email: user?.email || "",
    password: user?.password || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputAtom
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="email@exemple.com"
      />

      <InputAtom
        label="Mot de passe"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Mot de passe"
      />

      <div className="flex justify-end space-x-2 pt-4">
        <ButtonAtom variant="secondary" onClick={onCancel}>
          Annuler
        </ButtonAtom>
        <ButtonAtom type="submit" variant="primary">
          {user ? "Modifier" : "Créer"}
        </ButtonAtom>
      </div>
    </form>
  );
};

export default UserForm;
