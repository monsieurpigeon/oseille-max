import { useProduct } from "@/lib/hooks/useProducts";

export default function Detail() {
  const id = location.search.split("id=")[1];
  const { data } = useProduct({ id: id || "" });

  const item = data?.product[0] as { id: number; name: string };

  return (
    <div className="p-4 border rounded shadow-md grow bg-card text-card-foreground">
      {item?.name}
    </div>
  );
}
