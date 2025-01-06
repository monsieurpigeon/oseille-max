import { WebhookEvent } from "@clerk/clerk-sdk-node";
import { createClient } from "@tursodatabase/api";
import { Request, Response } from "express";
import md5 from "md5";
import { Webhook } from "svix";

export async function createDatabase(req: Request, res: Response) {
  const turso = createClient({
    token: process.env.TURSO_USER_API_TOKEN!,
    org: process.env.TURSO_ORG_NAME!,
  });

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  const headerPayload = req.headers;
  const svix_id = (headerPayload["svix-id"] as string) || "";
  const svix_timestamp = (headerPayload["svix-timestamp"] as string) || "";
  const svix_signature = (headerPayload["svix-signature"] as string) || "";
  const wh = new Webhook(WEBHOOK_SECRET!);
  const payload = req.body;
  const body = JSON.stringify(payload);

  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Webhook verification failed", { status: 400 });
  }

  if (evt.type === "organization.created") {
    const databaseName = md5(evt.data.id);

    try {
      await turso.databases.create(databaseName, {
        schema: process.env.TURSO_SCHEMA_DATABASE_NAME!,
        group: process.env.TURSO_GROUP_NAME!,
      });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      return new Response("Database creation failed", { status: 500 });
    }
  }
}
