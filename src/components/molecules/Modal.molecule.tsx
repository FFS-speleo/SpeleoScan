"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { ButtonAtom } from "@/atoms";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "modal-box w-11/12 max-w-md",
    md: "modal-box w-11/12 max-w-2xl",
    lg: "modal-box w-11/12 max-w-4xl",
    xl: "modal-box w-11/12 max-w-6xl",
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className={sizeClasses[size]}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <ButtonAtom
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="btn-square btn-sm"
          >
            <X size={16} />
          </ButtonAtom>
        </div>
        {children}
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default Modal;
