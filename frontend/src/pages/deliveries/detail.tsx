import { useDelivery } from "@/lib/hooks/useDeliveries";
import { Delivery } from "@/lib/interfaces";

export default function Detail() {
  const id = location.search.split("id=")[1];
  const { data } = useDelivery({ id: id || "" });

  const item = data?.delivery[0] as Delivery;

  return (
    <div className="p-4 border rounded shadow-md grow bg-card text-card-foreground">
      {item?.name}
    </div>
  );
}
