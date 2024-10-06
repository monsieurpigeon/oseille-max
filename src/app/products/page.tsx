import { getDatabaseClient } from "@/lib/common-db";
import Link from "next/link";

export default async function Page() {
  const client = await getDatabaseClient();
  console.log("client", client);
  const products = await client.execute(`SELECT * FROM products`);
  console.log(products);
  return (
    <div>
      <h1>Produits</h1>
      <Link href="/products/create">Créer un produit</Link>
      <pre>{JSON.stringify(products, null, 2)}</pre>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
