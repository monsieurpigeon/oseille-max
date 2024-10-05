import { WebhookEvent } from "@clerk/nextjs/server";
import { createClient } from "@tursodatabase/api";
import md5 from "md5";
import { headers } from "next/headers";
import { Webhook } from "svix";

const turso = createClient({
  token: process.env.TURSO_USER_API_TOKEN!,
  org: process.env.TURSO_ORG_NAME!,
});

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  const wh = new Webhook(WEBHOOK_SECRET!);
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id!,
      "svix-timestamp": svix_timestamp!,
      "svix-signature": svix_signature!,
    }) as WebhookEvent;
  } catch (err) {
    console.error(err);
    return new Response("Webhook verification failed", { status: 400 });
  }

  if (evt.type === "organization.created") {
    const databaseName = md5(evt.data.id);

    try {
      console.log("CREATE USER", databaseName);

      await turso.databases.create(databaseName, {
        schema: process.env.TURSO_SCHEMA_DATABASE_NAME!,
      });
    } catch (err) {
      console.error(err);
      return new Response("Database creation failed", { status: 500 });
    }
  }
}
