import { getAuth } from "@clerk/express";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { db } from "../db/db";
import { productTable } from "../db/schema";
import { getDatabaseClient } from "../lib/common-db";
import { CustomError } from "../lib/custom-error";

export async function addProduct(
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
    const product = await client
      .insert(productTable)
      .values(req.body)
      .returning();
    res.status(201).json({ product });
  } catch (error) {
    next(new CustomError("Failed to add product", 500));
  }
}

export async function getAllProducts(
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
    const products = await client
      .select()
      .from(productTable)
      .orderBy(productTable.name);
    res.status(200).json({ products });
  } catch (error) {
    next(new CustomError("Failed to fetch products", 500));
  }
}

export async function getProduct(
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
    const product = await client
      .select()
      .from(productTable)
      .where(eq(productTable.id, Number(req.params.id)));
    res.status(200).json({ product });
  } catch (error) {
    next(new CustomError("Failed to fetch product", 500));
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const product = await db
      .delete(productTable)
      .where(eq(productTable.id, Number(req.params.id)))
      .returning({
        deletedProductId: productTable.id,
      });
    res.status(200).json({ product });
  } catch (error) {
    next(new CustomError("Failed to delete product", 500));
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const product = await db
      .update(productTable)
      .set(req.body)
      .where(eq(productTable.id, Number(req.params.id)))
      .returning();

    res.status(201).json({ product });
  } catch (error) {
    next(new CustomError("Failed to update product", 500));
  }
}
