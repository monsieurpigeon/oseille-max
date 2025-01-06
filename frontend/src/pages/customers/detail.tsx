import { useCustomer } from "@/lib/hooks/useCustomers";

export default function Detail() {
  const id = location.search.split("id=")[1];
  const { data } = useCustomer({ id: id || "" });

  const item = data?.customer[0] as { id: number; name: string };

  return (
    <div className="p-4 border rounded shadow-md grow bg-card text-card-foreground">
      {item?.name}
    </div>
  );
}
