import { auth } from "@clerk/nextjs/server";
import { createClient as createLibsqlClient } from "@libsql/client";
import { createClient as createTursoClient } from "@tursodatabase/api";
import md5 from "md5";

export async function getDatabaseClient() {
  const dbName = getDatabaseName();
  console.log(dbName);
  const client = createLibsqlClient({
    url: `libsql://${dbName}.turso.io`,
    authToken: process.env.TURSO_DATABASE_GROUP_AUTH_TOKEN || "",
  });
  return client;
}

const turso = createTursoClient({
  token: process.env.TURSO_USER_API_TOKEN!,
  org: process.env.TURSO_ORG_NAME!,
});

export function getDatabaseName() {
  const orgId = auth().orgId;
  if (!orgId) return null;
  return md5(orgId);
}

export async function checkDatabaseExists() {
  const dbName = getDatabaseName();
  if (!dbName) return false;

  try {
    await turso.databases.get(dbName);
    return true;
  } catch {
    return false;
  }
}
