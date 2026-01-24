"use server";
import db from "@/db";
import { user } from "@/db/schema";
import { redirect } from "next/navigation";

export const createUser = async (formData: FormData) => {
  const name = formData.get('name') as string
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  db.insert(user).values({ name, username, password }).run()
  redirect('/')
}