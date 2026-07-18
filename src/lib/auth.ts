import { betterAuth } from "better-auth";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mysql", // MariaDB uses mysql provider in Prisma
    }),
    emailAndPassword: {
        enabled: true
    }
});
