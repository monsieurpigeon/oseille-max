import { Router } from "express";
import { createDatabase } from "../handlers/database";

const databaseRouter = Router();

databaseRouter.post("/database/create", createDatabase);

export default databaseRouter;
