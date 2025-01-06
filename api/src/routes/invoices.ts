import { Router } from "express";
import {
  addInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoice,
  updateInvoice,
} from "../handlers/invoice";
import {
  validateIdParam,
  validateProductName,
} from "../lib/validator-functions";

const invoicesRouter = Router();

invoicesRouter.get("/invoice/:id", validateIdParam(), getInvoice);
invoicesRouter.get("/invoice", getAllInvoices);
invoicesRouter.post("/invoice", validateProductName(), addInvoice);
invoicesRouter.put(
  "/invoice/:id",
  validateIdParam(),
  validateProductName(),
  updateInvoice
);
invoicesRouter.delete("/invoice/:id", validateIdParam(), deleteInvoice);

export default invoicesRouter;
