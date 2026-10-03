import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export const client = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "postgresql://localhost:5432/" }),
});

export async function testdb() {
  const user = await client.user.findMany();
  console.log(user);
}

export default client;
