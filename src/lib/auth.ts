import { betterAuth } from "better-auth";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

import bcrypt from "bcryptjs";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mysql", // MariaDB uses mysql provider in Prisma
    }),
    emailAndPassword: {
        enabled: true,
        password: {
            hash: async (password) => {
                return bcrypt.hash(password, 10);
            },
            verify: async ({ hash, password }) => {
                return bcrypt.compare(password, hash);
            }
        }
    }
});
