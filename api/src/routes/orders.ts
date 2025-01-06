import { Router } from "express";
import {
  addOder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from "../handlers/orders";
import {
  validateIdParam,
  validateProductName,
} from "../lib/validator-functions";

const ordersRouter = Router();

ordersRouter.get("/order/:id", validateIdParam(), getOrder);
ordersRouter.get("/order", getAllOrders);
ordersRouter.post("/order", validateProductName(), addOder);
ordersRouter.put(
  "/order/:id",
  validateIdParam(),
  validateProductName(),
  updateOrder
);
ordersRouter.delete("/order/:id", validateIdParam(), deleteOrder);

export default ordersRouter;
