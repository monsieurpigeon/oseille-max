import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const productTable = sqliteTable("product", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const customerTable = sqliteTable("customer", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const priceTable = sqliteTable(
  "price",
  {
    customerId: integer("customer_id")
      .notNull()
      .references(() => customerTable.id),
    productId: integer("product_id")
      .notNull()
      .references(() => productTable.id),
    value: integer("value").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.customerId, t.productId] }),
  })
);

export const invoiceTable = sqliteTable("invoice", {
  id: integer("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customerTable.id),
  name: text("name").notNull(),
  invoicedAt: text("invoiced_at").notNull(),
  notes: text("notes"),
});

export const deliveryTable = sqliteTable("delivery", {
  id: integer("id").primaryKey(),
  isOrder: integer("is_order").notNull(),
  name: text("name").notNull(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customerTable.id),
  deliveredAt: text("delivered_at").notNull(),
  notes: text("notes"),
});

export const deliveryLineTable = sqliteTable("delivery_line", {
  deliveryId: integer("delivery_id")
    .notNull()
    .references(() => deliveryTable.id),
  productId: integer("product_id")
    .notNull()
    .references(() => productTable.id),
  productName: text("product_name").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
});

export const settingsTable = sqliteTable("settings", {
  year: integer("year"),
  nextDelivery: integer("next_delivery"),
  nextInvoice: integer("next_invoice"),
});
