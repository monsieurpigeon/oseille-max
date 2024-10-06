import { getDatabaseClient } from "@/lib/common-db";
import { SquarePlus } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const client = await getDatabaseClient();
  const customers = await client.query.customers.findMany({});
  return (
    <div className="flex flex-col h-full">
      <ul className="px-4 py-2 border rounded flex flex-col gap-2 grow">
        <li className="text-center">
          <Link href="/customers/create" className="hover:underline">
            <div className="flex gap-2">
              <SquarePlus />
              <div>Créer un client</div>
            </div>
          </Link>
        </li>
        {customers.map((item) => {
          return (
            <li key={item.id} className="px-4 py-2 border rounded">
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
