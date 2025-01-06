import { ItemList } from "@/components/item-list";
import { useDeliveries } from "@/lib/hooks/useDeliveries";
import { Delivery } from "@/lib/interfaces";
import { Outlet, useLocation } from "react-router";
import Detail from "./detail";

export default function DeliveriesPage() {
  const location = useLocation();
  const id = location.search.split("id=")[1];
  const { data } = useDeliveries();

  const items = data?.deliveries as Delivery[];

  return (
    <div className="flex gap-4 h-full w-full items-stretch">
      <div className="flex flex-col">
        <ItemList
          items={items}
          selected={id}
          href="/deliveries"
          label="livraison"
        />
      </div>
      <Outlet />
      {id && <Detail />}
    </div>
  );
}
