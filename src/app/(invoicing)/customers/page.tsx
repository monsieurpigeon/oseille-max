import { ItemList } from "@/components/item-list";
import { customers } from "@/db/schema";
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
  const items = await client.query.customers.findMany({
    orderBy: customers.name,
  });
  return (
    <div className="flex gap-4 h-full w-full items-stretch">
      <div className="flex flex-col">
        <ItemList
          items={items}
          selected={searchParams?.id}
          href="/customers"
          label="client"
        />
      </div>
      {searchParams?.id && <Detail id={searchParams.id} />}
    </div>
  );
}
