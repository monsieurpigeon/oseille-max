import { getAuth } from "@clerk/express";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { db } from "../db/db";
import { invoiceTable } from "../db/schema";
import { getDatabaseClient } from "../lib/common-db";
import { CustomError } from "../lib/custom-error";

export async function addInvoice(
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
    const invoice = await client
      .insert(invoiceTable)
      .values(req.body)
      .returning();
    res.status(201).json({ invoice });
  } catch (error) {
    next(new CustomError("Failed to add invoice", 500));
  }
}

export async function getAllInvoices(
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
    const invoices = await client
      .select()
      .from(invoiceTable)
      .orderBy(invoiceTable.id);
    res.status(200).json({ invoices });
  } catch (error) {
    next(new CustomError("Failed to fetch invoices", 500));
  }
}

export async function getInvoice(
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
    const invoice = await client
      .select()
      .from(invoiceTable)
      .where(eq(invoiceTable.id, Number(req.params.id)));
    res.status(200).json({ invoice });
  } catch (error) {
    next(new CustomError("Failed to fetch invoice", 500));
  }
}

export async function deleteInvoice(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const invoice = await db
      .delete(invoiceTable)
      .where(eq(invoiceTable.id, Number(req.params.id)))
      .returning({
        deletedInvoiceId: invoiceTable.id,
      });
    res.status(200).json({ invoice });
  } catch (error) {
    next(new CustomError("Failed to delete invoice", 500));
  }
}

export async function updateInvoice(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const invoice = await db
      .update(invoiceTable)
      .set(req.body)
      .where(eq(invoiceTable.id, Number(req.params.id)))
      .returning();

    res.status(201).json({ invoice });
  } catch (error) {
    next(new CustomError("Failed to update invoice", 500));
  }
}
