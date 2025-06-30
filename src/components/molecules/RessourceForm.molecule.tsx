"use client";

import { useState } from "react";
import { Ressource } from "@/types";
import { InputAtom, TextareaAtom, ButtonAtom } from "@/atoms";

interface RessourceFormProps {
  ressource?: Ressource;
  onSubmit: (data: Omit<Ressource, "id">) => void;
  onCancel: () => void;
}

const RessourceForm: React.FC<RessourceFormProps> = ({
  ressource,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: ressource?.title || "",
    description: ressource?.description || "",
    page: ressource?.page || 0,
    url: ressource?.url || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "page" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputAtom
        label="Titre"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Titre de la ressource"
      />

      <TextareaAtom
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        placeholder="Description de la ressource"
        rows={3}
      />

      <InputAtom
        label="Page"
        name="page"
        type="number"
        value={formData.page}
        onChange={handleChange}
        required
        min="1"
        placeholder="Numéro de page"
      />

      <InputAtom
        label="URL"
        name="url"
        type="url"
        value={formData.url}
        onChange={handleChange}
        required
        placeholder="https://exemple.com/document.pdf"
      />

      <div className="flex justify-end space-x-2 pt-4">
        <ButtonAtom variant="secondary" onClick={onCancel}>
          Annuler
        </ButtonAtom>
        <ButtonAtom type="submit" variant="primary">
          {ressource ? "Modifier" : "Créer"}
        </ButtonAtom>
      </div>
    </form>
  );
};

export default RessourceForm;
