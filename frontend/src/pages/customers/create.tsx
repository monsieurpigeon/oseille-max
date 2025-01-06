import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

export const FormSchema = z.object({
  name: z.string().min(1),
});

export default function CustomerForm() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      navigate("..");
    },
    mutationFn: async (newCustomer: { name: string }) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/customer`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newCustomer),
      });

      if (!res.ok) {
        throw new Error("Erreur réseau");
      }

      return res.json();
    },
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="p-4 border rounded shadow-md grow bg-card text-card-foreground">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-start items-start gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du client</FormLabel>
                  <FormControl>
                    <Input placeholder="Biocoop" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Ajouter</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
