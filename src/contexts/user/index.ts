import { db } from "@/db";
import { CreateUser } from "./types";
import { user } from "@/db/schema";

export const findUsers = async () => {
  return await db.select().from(user);
}

export const createUser = (params: CreateUser) => {
  return db.insert(user).values(params);
}
