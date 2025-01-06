import { Router } from "express";
import {
  addDelivery,
  deleteDelivery,
  getAllDeliveries,
  getDelivery,
  updateDelivery,
} from "../handlers/delivery";
import {
  validateIdParam,
  validateProductName,
} from "../lib/validator-functions";

const deliveriesRouter = Router();

deliveriesRouter.get("/delivery/:id", validateIdParam(), getDelivery);
deliveriesRouter.get("/delivery", getAllDeliveries);
deliveriesRouter.post("/delivery", addDelivery);
deliveriesRouter.put(
  "/delivery/:id",
  validateIdParam(),
  validateProductName(),
  updateDelivery
);
deliveriesRouter.delete("/delivery/:id", validateIdParam(), deleteDelivery);

export default deliveriesRouter;
