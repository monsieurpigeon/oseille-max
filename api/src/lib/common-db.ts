import { AuthObject } from "@clerk/express";
import { createClient as createLibsqlClient } from "@libsql/client";
import { createClient as createTursoClient } from "@tursodatabase/api";
import { drizzle } from "drizzle-orm/libsql";
import md5 from "md5";
import * as schema from "../db/schema";

export async function getDatabaseClient({ auth }: { auth: AuthObject }) {
  const dbName = getDatabaseName({ auth });
  const orgName = process.env.TURSO_ORG_NAME!;
  const client = createLibsqlClient({
    url: `libsql://${dbName}-${orgName}.turso.io`,
    authToken: process.env.TURSO_DATABASE_GROUP_AUTH_TOKEN || "",
  });
  return drizzle(client, { schema });
}

const turso = createTursoClient({
  token: process.env.TURSO_USER_API_TOKEN!,
  org: process.env.TURSO_ORG_NAME!,
});

export function getDatabaseName({ auth }: { auth: AuthObject }) {
  const orgId = auth.orgId;
  if (!orgId) return null;
  return md5(orgId);
}

export async function checkDatabaseExists({ auth }: { auth: AuthObject }) {
  const dbName = getDatabaseName({ auth });
  if (!dbName) return false;

  try {
    await turso.databases.get(dbName);
    return true;
  } catch {
    return false;
  }
}
