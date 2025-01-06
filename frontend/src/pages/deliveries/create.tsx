import { Button } from "@/components/ui/button";
import { CustomerSelect } from "@/components/ui/customer-select";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

export const FormSchema = z.object({
  customerId: z.number(),
  deliveredAt: z.string().min(1),
  notes: z.string(),
});

export default function DeliveryForm() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      navigate("..");
    },
    mutationFn: async (newDelivery: z.infer<typeof FormSchema>) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/delivery`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newDelivery),
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
      customerId: 0,
      deliveredAt: new Date().toISOString(),
      notes: "",
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
              name="deliveredAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de livraison</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={new Date(field.value)}
                      onChange={(date) => {
                        field.onChange(date?.toISOString());
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <CustomerSelect
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ristourne sur les aubergines"
                      {...field}
                    />
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
