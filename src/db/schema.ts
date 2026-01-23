import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  password: text().notNull(),
  username: text().notNull().unique(),
});

export const post = sqliteTable("post", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull().references(() => user.id),
  content: text().notNull(),
});
