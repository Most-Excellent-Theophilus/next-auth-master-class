import type { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        console.log("📧 Credentials received:", credentials);

        const validatedFields = LoginSchema.safeParse(credentials);
        console.log("✅ Validation success:", validatedFields.success);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          console.log("🔍 Looking for email:", email);

          const user = await getUserByEmail(email);
          console.log("👤 User found:", !!user);
          console.log("🔒 User has password:", !!user?.password);

          if (!user || !user.password) {
            console.log("❌ No user or no password");
            return null;
          }

          const passwordMatch = await bcryptjs.compare(password, user.password);
          console.log("🔑 Password match:", passwordMatch);

          if (passwordMatch) {
            console.log("✅ Auth successful, returning user");
            // Don't return the password field
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }

        console.log("❌ Auth failed");
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
