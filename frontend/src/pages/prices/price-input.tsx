import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const FormSchema = z.object({
  value: z.number().min(0),
});

export function PriceInput({
  productId,
  customerId,
}: {
  productId: number;
  customerId: number;
}) {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      setOpen(false);
    },
    mutationFn: async (newPrice: {
      value: number;
      productId: number;
      customerId: number;
    }) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/price`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newPrice),
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
      value: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    mutation.mutate({ ...values, productId, customerId });
  }

  return (
    <>
      {!open && <Button onClick={() => setOpen(true)}>+</Button>}

      {open && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-start items-start gap-4">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        onBlur={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Ajouter</Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
