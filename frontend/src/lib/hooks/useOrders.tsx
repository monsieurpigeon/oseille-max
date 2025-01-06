import { useAuth, useOrganization } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Order } from "../interfaces";

export function useOrders() {
  const { getToken } = useAuth();
  const { organization } = useOrganization();

  const query = useQuery({
    queryKey: ["orders", organization?.id],
    queryFn: async (): Promise<{ orders: Order[] }> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
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
