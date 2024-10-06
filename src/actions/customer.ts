"use server";

import { customers } from "@/db/schema";
import { getDatabaseClient } from "@/lib/common-db";
import { revalidatePath } from "next/cache";

export async function createCustomer(customer: { name: string }) {
  const client = await getDatabaseClient();

  await client.insert(customers).values(customer);
  revalidatePath("/customers");
}
