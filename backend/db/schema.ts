import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const planetsTable = pgTable("planets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
});
