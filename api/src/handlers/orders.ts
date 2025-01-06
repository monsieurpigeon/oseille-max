import { getAuth } from "@clerk/express";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { db } from "../db/db";
import { deliveryTable } from "../db/schema";
import { getDatabaseClient } from "../lib/common-db";
import { CustomError } from "../lib/custom-error";

export async function addOder(req: Request, res: Response, next: NextFunction) {
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
    const order = await client
      .insert(deliveryTable)
      .values(req.body)
      .returning();
    res.status(201).json({ order });
  } catch (error) {
    next(new CustomError("Failed to add order", 500));
  }
}

export async function getAllOrders(
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
    const orders = await client
      .select()
      .from(deliveryTable)
      .where(eq(deliveryTable.isOrder, 1))
      .orderBy(deliveryTable.id);
    res.status(200).json({ orders });
  } catch (error) {
    next(new CustomError("Failed to fetch orders", 500));
  }
}

export async function getOrder(
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
    const order = await client
      .select()
      .from(deliveryTable)
      .where(eq(deliveryTable.id, Number(req.params.id)));
    res.status(200).json({ order });
  } catch (error) {
    next(new CustomError("Failed to fetch order", 500));
  }
}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const order = await db
      .delete(deliveryTable)
      .where(eq(deliveryTable.id, Number(req.params.id)))
      .returning({
        deletedOrderId: deliveryTable.id,
      });
    res.status(200).json({ order });
  } catch (error) {
    next(new CustomError("Failed to delete order", 500));
  }
}

export async function updateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const order = await db
      .update(deliveryTable)
      .set(req.body)
      .where(eq(deliveryTable.id, Number(req.params.id)))
      .returning();

    res.status(201).json({ order });
  } catch (error) {
    next(new CustomError("Failed to update order", 500));
  }
}
