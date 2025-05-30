import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import type { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

export const { handlers, auth, signIn, signOut } = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    /**
     *session call back
     *
     * @param {*} { token, session }
     * @return {*}
     */
    async session({ token, session }) {
      console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },

    async signIn({user, account}){

      if (account?.provider !== "credentials") return true
      const existingUser = await getUserById(user.id)

      // Prevent sign in without email verification 
      if (!existingUser?.emailVerified) return false

      
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

      console.log({
        twoFactorConfirmation
      })
        if (!twoFactorConfirmation ) {
          return false
        }
        //Delete two factor confirmation for next sign in 
        await db.twoFactorConfirmation.delete({
          where : {id: twoFactorConfirmation.id}
        })
      }
      return true
    },

    /**
     *
     *
     * @param {*} { token }
     * @return {*}
     */
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
