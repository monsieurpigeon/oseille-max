import { useAuth, useOrganization } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Price } from "../interfaces";

export function usePrices() {
  const { getToken } = useAuth();
  const { organization } = useOrganization();

  const query = useQuery({
    queryKey: ["prices", organization?.id],
    queryFn: async (): Promise<{ prices: Price[] }> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/price`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (!res.ok) {
        throw new Error("Erreur réseau");
      }

      return res.json();
    },
  });

  return query;
}
