import { cn } from "@/lib/utils";
import { SquarePlus } from "lucide-react";
import { Link } from "react-router";

interface Item {
  id: number;
  name: string;
}

export function ItemList({
  items,
  selected,
  href,
  label,
}: {
  items: Item[];
  href: string;
  label: string;
  selected?: string;
}) {
  if (!items) {
    return null;
  }
  return (
    <ul className="px-4 py-2 border rounded shadow-md flex flex-col gap-2 grow bg-card text-card-foreground w-72">
      <li className="text-center">
        <Link to={`${href}/create`} className="hover:underline">
          <div className="flex gap-2">
            <SquarePlus />
            <div>Ajouter un {label}</div>
          </div>
        </Link>
      </li>
      {items.map((item) => {
        return (
          <li key={item.id} className="relative">
            <Link
              className={cn(
                "block border rounded hover:bg-primary/5 active:shadow-inner active:bg-yellow-100 px-4 py-2 transition-all",
                item.id === Number(selected) && "font-bold shadow-inner"
              )}
              to={{
                pathname: href,
                search: `?id=${item.id}`,
              }}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
