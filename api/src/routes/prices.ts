import { Router } from "express";
import {
  addPrice,
  deletePrice,
  getAllPrices,
  getPrice,
  updatePrice,
} from "../handlers/prices";
import {
  validateIdParam,
  validatePriceValue,
  validateProductName,
} from "../lib/validator-functions";

const pricesRouter = Router();

pricesRouter.get("/price/:id", validateIdParam(), getPrice);
pricesRouter.get("/price", getAllPrices);
pricesRouter.post("/price", validatePriceValue(), addPrice);
pricesRouter.put(
  "/price/:id",
  validateIdParam(),
  validateProductName(),
  updatePrice
);
pricesRouter.delete("/price/:id", validateIdParam(), deletePrice);

export default pricesRouter;
