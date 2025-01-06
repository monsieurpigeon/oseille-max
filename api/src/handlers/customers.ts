import { getAuth } from "@clerk/express";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { db } from "../db/db";
import { customerTable } from "../db/schema";
import { getDatabaseClient } from "../lib/common-db";
import { CustomError } from "../lib/custom-error";

export async function addCustomer(
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
    const customer = await client
      .insert(customerTable)
      .values(req.body)
      .returning();
    res.status(201).json({ customer });
  } catch (error) {
    next(new CustomError("Failed to add customer", 500));
  }
}

export async function getAllCustomers(
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
    const customers = await client
      .select()
      .from(customerTable)
      .orderBy(customerTable.name);
    res.status(200).json({ customers });
  } catch (error) {
    next(new CustomError("Failed to fetch customers", 500));
  }
}

export async function getCustomer(
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
    const customer = await client
      .select()
      .from(customerTable)
      .where(eq(customerTable.id, Number(req.params.id)));
    res.status(200).json({ customer });
  } catch (error) {
    next(new CustomError("Failed to fetch customer", 500));
  }
}

export async function deleteCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const customer = await db
      .delete(customerTable)
      .where(eq(customerTable.id, Number(req.params.id)))
      .returning({
        deletedCustomerId: customerTable.id,
      });
    res.status(200).json({ customer });
  } catch (error) {
    next(new CustomError("Failed to delete customer", 500));
  }
}

export async function updateCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const customer = await db
      .update(customerTable)
      .set(req.body)
      .where(eq(customerTable.id, Number(req.params.id)))
      .returning();

    res.status(201).json({ customer });
  } catch (error) {
    next(new CustomError("Failed to update customer", 500));
  }
}
