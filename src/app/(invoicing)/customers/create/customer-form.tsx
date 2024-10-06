"use client";

import { createCustomer } from "@/actions/customer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const FormSchema = z.object({
  name: z.string().min(1),
});

export function CustomerForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    await createCustomer(values);
    router.push("/customers");
  }

  return (
    <div className="p-4 border rounded">
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
