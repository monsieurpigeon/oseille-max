"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Produits", href: "/products" },
  { label: "Clients", href: "/customers" },
];

export default function Navigation() {
  const pathName = usePathname();

  return (
    <nav className="w-44 h-full">
      <ul className="flex flex-col rounded border">
        {NAV_ITEMS.map((item, index) => {
          return (
            <Link key={index} href={item.href}>
              <li
                className={cn(
                  "px-4 py-2 hover:bg-slate-100",
                  pathName.startsWith(item.href) && "font-bold"
                )}
              >
                {item.label}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
