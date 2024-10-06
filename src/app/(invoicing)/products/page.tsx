import { ItemList } from "@/components/item-list";
import { products } from "@/db/schema";
import { getDatabaseClient } from "@/lib/common-db";
import Detail from "./detail";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const client = await getDatabaseClient();
  const items = await client.query.products.findMany({
    orderBy: products.name,
  });

  return (
    <div className="flex gap-4 h-full w-full items-stretch">
      <div className="flex flex-col">
        <ItemList
          items={items}
          selected={searchParams?.id}
          href="/products"
          label="produit"
        />
      </div>
      {searchParams?.id && <Detail id={searchParams.id} />}
    </div>
  );
}
