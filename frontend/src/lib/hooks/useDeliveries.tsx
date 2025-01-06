import { useAuth, useOrganization } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Delivery } from "../interfaces";

export function useDeliveries() {
  const { getToken } = useAuth();
  const { organization } = useOrganization();

  const query = useQuery({
    queryKey: ["deliveries", organization?.id],
    queryFn: async (): Promise<{ deliveries: Delivery[] }> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/delivery`, {
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

export function useDelivery({ id }: { id: string }) {
  const { getToken } = useAuth();
  const { organization } = useOrganization();

  const query = useQuery({
    queryKey: ["delivery", id, organization?.id],
    queryFn: async () => {
      if (!id) {
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/delivery/${id}`,
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (!res.ok) {
        throw new Error("Erreur réseau");
      }

      return res.json();
    },
  });

  return query;
}
