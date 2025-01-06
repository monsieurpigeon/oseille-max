import { ItemList } from "@/components/item-list";
import { useProducts } from "@/lib/hooks/useProducts";
import { Outlet, useLocation } from "react-router";
import Detail from "./detail";

export default function ProductsPage() {
  const location = useLocation();
  const id = location.search.split("id=")[1];
  const { data } = useProducts();

  const items = data?.products as { id: number; name: string }[];

  return (
    <div className="flex gap-4 h-full w-full items-stretch">
      <div className="flex flex-col">
        <ItemList
          items={items}
          selected={id}
          href="/products"
          label="produit"
        />
      </div>
      <Outlet />
      {id && <Detail />}
    </div>
  );
}
