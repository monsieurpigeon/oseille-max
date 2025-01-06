import { Router } from "express";
import {
  addCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
} from "../handlers/customers";
import {
  validateIdParam,
  validateProductName,
} from "../lib/validator-functions";

const customersRouter = Router();

customersRouter.get("/customer/:id", validateIdParam(), getCustomer);
customersRouter.get("/customer", getAllCustomers);
customersRouter.post("/customer", validateProductName(), addCustomer);
customersRouter.put(
  "/customer/:id",
  validateIdParam(),
  validateProductName(),
  updateCustomer
);
customersRouter.delete("/customer/:id", validateIdParam(), deleteCustomer);

export default customersRouter;
