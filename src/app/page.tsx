import { checkDatabaseExists } from "@/lib/common-db";
import Link from "next/link";

export default async function Home() {
  const databaseExists = await checkDatabaseExists();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Oseille max
      {databaseExists ? (
        <div>Ma Ferme</div>
      ) : (
        <Link href="/create-organization">Créer une ferme</Link>
      )}
    </div>
  );
}
