import { getAuth } from "@clerk/express";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { db } from "../db/db";
import { deliveryTable, settingsTable } from "../db/schema";
import { getDatabaseClient } from "../lib/common-db";
import { CustomError } from "../lib/custom-error";
import { documentIdFormatter, DocumentType } from "../lib/formatter";

export async function addDelivery(
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
    const result = await client.transaction(async (tx) => {
      const settings = await tx.select().from(settingsTable).limit(1);
      const nextDeliveryNumber = settings[0].nextDelivery || 1;
      const year = settings[0].year || new Date().getFullYear();
      await tx
        .update(settingsTable)
        .set({ nextDelivery: nextDeliveryNumber + 1 });

      await tx
        .insert(deliveryTable)
        .values({
          ...req.body,
          isOrder: 0,
          name: documentIdFormatter(
            DocumentType.delivery,
            nextDeliveryNumber,
            year
          ),
        })
        .returning();
    });

    res.status(201).json({ delivery: result });
  } catch (error) {
    next(new CustomError("Failed to add delivery", 500));
  }
}

export async function getAllDeliveries(
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
    const deliveries = await client
      .select()
      .from(deliveryTable)
      .where(eq(deliveryTable.isOrder, 0))
      .orderBy(deliveryTable.id);
    res.status(200).json({ deliveries });
  } catch (error) {
    next(new CustomError("Failed to fetch deliveries", 500));
  }
}

export async function getDelivery(
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
    const delivery = await client
      .select()
      .from(deliveryTable)
      .where(eq(deliveryTable.id, Number(req.params.id)));
    res.status(200).json({ delivery });
  } catch (error) {
    next(new CustomError("Failed to fetch delivery", 500));
  }
}

export async function deleteDelivery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const delivery = await db
      .delete(deliveryTable)
      .where(eq(deliveryTable.id, Number(req.params.id)))
      .returning({
        deletedDeliveryId: deliveryTable.id,
      });
    res.status(200).json({ delivery });
  } catch (error) {
    next(new CustomError("Failed to delete delivery", 500));
  }
}

export async function updateDelivery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const delivery = await db
      .update(deliveryTable)
      .set(req.body)
      .where(eq(deliveryTable.id, Number(req.params.id)))
      .returning();

    res.status(201).json({ delivery });
  } catch (error) {
    next(new CustomError("Failed to update delivery", 500));
  }
}
