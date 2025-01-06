import { ItemList } from "@/components/item-list";
import { useCustomers } from "@/lib/hooks/useCustomers";
import { Outlet, useLocation } from "react-router";
import Detail from "./detail";

export default function CustomersPage() {
  const location = useLocation();
  const id = location.search.split("id=")[1];
  const { data } = useCustomers();

  const items = data?.customers as { id: number; name: string }[];

  return (
    <div className="flex gap-4 h-full w-full items-stretch">
      <div className="flex flex-col">
        <ItemList
          items={items}
          selected={id}
          href="/customers"
          label="client"
        />
      </div>
      <Outlet />
      {id && <Detail />}
    </div>
  );
}
