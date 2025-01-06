import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout";
import CustomersPage from "./pages/customers";
import CustomerForm from "./pages/customers/create";
import DeliveriesPage from "./pages/deliveries";
import DeliveryForm from "./pages/deliveries/create";
import InvoicesPage from "./pages/invoices";
import OrdersPage from "./pages/orders";
import PricesPage from "./pages/prices";
import ProductsPage from "./pages/products";
import ProductForm from "./pages/products/create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/products",
        element: <ProductsPage />,
        children: [
          {
            path: "create",
            element: <ProductForm />,
          },
        ],
      },
      {
        path: "/customers",
        element: <CustomersPage />,
        children: [
          {
            path: "create",
            element: <CustomerForm />,
          },
        ],
      },
      {
        path: "/prices",
        element: <PricesPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/deliveries",
        element: <DeliveriesPage />,
        children: [
          {
            path: "create",
            element: <DeliveryForm />,
          },
        ],
      },
      {
        path: "/invoices",
        element: <InvoicesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
