"use client";

import { useState } from "react";
import { Home, FileText, Users, Menu, X } from "lucide-react";
import { ButtonAtom } from "@/atoms";
import { SidebarItemMolecule } from "@/molecules";

const menuItems = [
  {
    href: "/admin/dashboard",
    icon: <Home size={20} />,
    label: "Tableau de bord",
  },
  {
    href: "/admin/dashboard/ressources",
    icon: <FileText size={20} />,
    label: "Ressources",
  },
  {
    href: "/admin/dashboard/utilisateurs",
    icon: <Users size={20} />,
    label: "Utilisateurs",
  },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <ButtonAtom
          variant="secondary"
          size="sm"
          onClick={toggleSidebar}
          className="btn-square"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </ButtonAtom>
      </div>

      {/* Sidebar */}
      <aside
        className={`
                    fixed left-0 top-0 h-full w-64 bg-base-200 shadow-lg z-40
                    transform transition-transform duration-300 ease-in-out
                    md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold text-base-content mb-8">
            Admin Dashboard
          </h1>

          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <SidebarItemMolecule
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
