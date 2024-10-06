"use server";

import { products } from "@/db/schema";
import { getDatabaseClient } from "@/lib/common-db";
import { revalidatePath } from "next/cache";

export async function createProduct(product: { name: string }) {
  const client = await getDatabaseClient();

  await client.insert(products).values(product);
  revalidatePath("/products");
}
