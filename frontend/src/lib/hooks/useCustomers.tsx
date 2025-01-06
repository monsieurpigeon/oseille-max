import { useAuth, useOrganization } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Customer } from "../interfaces";

export function useCustomers() {
  const { getToken } = useAuth();
  const { organization } = useOrganization();

  const query = useQuery({
    queryKey: ["customers", organization?.id],
    queryFn: async (): Promise<{ customers: Customer[] }> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/customer`, {
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

export function useCustomer({ id }: { id: string }) {
  const { getToken } = useAuth();
  const { organization } = useOrganization();

  const query = useQuery({
    queryKey: ["customer", id, organization?.id],
    queryFn: async () => {
      if (!id) {
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/customer/${id}`,
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
