import { migrate } from "drizzle-orm/libsql/migrator";
import path from "path";

import { db } from ".";

(async () => {
  console.log("Running migrations ...");
  await migrate(db, {
    migrationsFolder: path.join(__dirname, "./migrations"),
  });
  console.log("Migrations ran successfully.");
})();
