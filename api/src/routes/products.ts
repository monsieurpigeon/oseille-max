import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../handlers/products";
import {
  validateIdParam,
  validateProductName,
} from "../lib/validator-functions";

const productsRouter = Router();

productsRouter.get("/product/:id", validateIdParam(), getProduct);
productsRouter.get("/product", getAllProducts);
productsRouter.post("/product", validateProductName(), addProduct);
productsRouter.put(
  "/product/:id",
  validateIdParam(),
  validateProductName(),
  updateProduct
);
productsRouter.delete("/product/:id", validateIdParam(), deleteProduct);

export default productsRouter;
