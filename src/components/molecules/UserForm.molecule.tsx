"use client";

import { useState } from "react";
import { User } from "@/types";
import { ButtonAtom, InputAtom } from "@/atoms";

interface UserFormProps {
  user?: User;
  onSubmit: (data: Omit<User, "id">) => void;
  onCancel: () => void;
}

const UserForm = ({ user, onSubmit, onCancel }: UserFormProps) => {
  const [formData, setFormData] = useState({
    email: user?.email || "",
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

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Rôle</span>
        </label>
      </div>

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
