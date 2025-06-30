"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href + "/"));

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200",
          isActive ? "bg-primary text-primary-content" : "text-base-content hover:bg-base-300 hover:text-base-content"
        )}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
