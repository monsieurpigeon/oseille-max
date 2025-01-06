import { getAuth } from "@clerk/express";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { db } from "../db/db";
import { priceTable } from "../db/schema";
import { getDatabaseClient } from "../lib/common-db";
import { CustomError } from "../lib/custom-error";

export async function addPrice(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }

  const auth = getAuth(req);
  if (!auth || !auth.orgId) {
    return next(new CustomError("Unauthorized", 401));
  }
  const client = await getDatabaseClient({ auth });

  try {
    const price = await client.insert(priceTable).values(req.body).returning();
    res.status(201).json({ price });
  } catch (error) {
    next(new CustomError("Failed to add price", 500));
  }
}

export async function getAllPrices(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = getAuth(req);
  if (!auth || !auth.orgId) {
    return next(new CustomError("Unauthorized", 401));
  }
  const client = await getDatabaseClient({ auth });
  try {
    const prices = await client.select().from(priceTable);
    res.status(200).json({ prices });
  } catch (error) {
    next(new CustomError("Failed to fetch prices", 500));
  }
}

export async function getPrice(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }

  const auth = getAuth(req);
  if (!auth || !auth.orgId) {
    return next(new CustomError("Unauthorized", 401));
  }
  const client = await getDatabaseClient({ auth });

  try {
    const price = await client
      .select()
      .from(priceTable)
      .where(eq(priceTable.productId, Number(req.params.productId)));
    res.status(200).json({ price });
  } catch (error) {
    next(new CustomError("Failed to fetch price", 500));
  }
}

export async function deletePrice(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const price = await db
      .delete(priceTable)
      .where(eq(priceTable.productId, Number(req.params.productId)))
      .returning({
        deletedPriceId: priceTable.productId,
      });
    res.status(200).json({ price });
  } catch (error) {
    next(new CustomError("Failed to delete price", 500));
  }
}

export async function updatePrice(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const price = await db
      .update(priceTable)
      .set(req.body)
      .where(eq(priceTable.productId, Number(req.params.productId)))
      .returning();

    res.status(201).json({ price });
  } catch (error) {
    next(new CustomError("Failed to update price", 500));
  }
}
