import { products } from "@/db/schema";
import { getDatabaseClient } from "@/lib/common-db";
import { eq } from "drizzle-orm";

export default async function Detail({ id }: { id: string }) {
  const client = await getDatabaseClient();
  const item = await client.query.products.findFirst({
    where: eq(products.id, id),
  });

  return (
    <div className="p-4 border rounded shadow-lg grow bg-card text-card-foreground">
      {item?.name}
    </div>
  );
}
