import { CustomerForm } from "./customer-form";

export default function Page() {
  return (
    <div className="p-4 rounded border shadow-lg bg-card text-card-foreground h-full">
      <div>Ajouter un client</div>
      <CustomerForm />
    </div>
  );
}
