import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCustomers } from "@/lib/hooks/useCustomers";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

export function CustomerSelect({
  onChange,
  value,
}: {
  onChange: (id: number | undefined) => void;
  value: number | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  const { data } = useCustomers();
  const customers = data?.customers || [];

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [onChange, selected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selected
            ? customers.find((customer) => customer.id === selected)?.name
            : "Choisir un client..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Chercher un client..." />
          <CommandList>
            <CommandEmpty>Aucun client trouvé</CommandEmpty>
            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.name}
                  onSelect={() => {
                    setSelected(selected === customer.id ? 0 : customer.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected === customer.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {customer.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
