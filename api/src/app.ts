import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express from "express";
import customersRouter from "./routes/customers";
import databaseRouter from "./routes/database";
import deliveriesRouter from "./routes/deliveries";
import invoicesRouter from "./routes/invoices";
import ordersRouter from "./routes/orders";
import pricesRouter from "./routes/prices";
import productsRouter from "./routes/products";

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(clerkMiddleware());
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use("/api", productsRouter);
    this.server.use("/api", customersRouter);
    this.server.use("/api", pricesRouter);
    this.server.use("/api", ordersRouter);
    this.server.use("/api", deliveriesRouter);
    this.server.use("/api", invoicesRouter);
    this.server.use("/webhook", databaseRouter);
  }
}

export default new App().server;
