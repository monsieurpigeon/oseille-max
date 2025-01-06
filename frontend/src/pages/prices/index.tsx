import { priceFormatter } from "@/lib/formatter";
import { useCustomers } from "@/lib/hooks/useCustomers";
import { usePrices } from "@/lib/hooks/usePrices";
import { useProducts } from "@/lib/hooks/useProducts";
import { PriceInput } from "./price-input";

export default function PricesPage() {
  const { data: customerData } = useCustomers();
  const customers = customerData?.customers || [];

  const { data: productData } = useProducts();
  const products = productData?.products || [];

  const { data: priceData } = usePrices();
  const prices = priceData?.prices || [];

  return (
    <div className="flex gap-4 h-full w-full items-stretch">
      <div className="flex flex-col w-full">
        <div className="px-4 py-2 border rounded shadow-md grow bg-card text-card-foreground w-full">
          <table>
            <thead>
              <tr>
                <th></th>
                {customers.map((customer) => {
                  return <th key={customer.id}>{customer.name}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    {customers.map((customer) => {
                      return (
                        <td key={customer.id}>
                          {priceFormatter(
                            prices.find((price) => {
                              return (
                                price.customerId === customer.id &&
                                price.productId === product.id
                              );
                            })?.value
                          ) ?? (
                            <PriceInput
                              customerId={customer.id}
                              productId={product.id}
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
