import { prismaClient } from "@/packages/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers : [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  // pages: {
  //   signIn: '/auth/signin',
  // },
  secret: process.env.NEXTAUTH_SECRET ?? "next-secret",
  callbacks: {
    async signIn(params) {

      if (!params.user.email) {
        return false;
      }

      try {
           const existingUser = await prismaClient.user.findUnique({
        where: { email: params.user.email },
      });

      if (!existingUser) {
        await prismaClient.user.create({
          data: {
            email: params.user.email,
            name: params.user.name ?? "",
            image: params.user.image ?? "",
            provider: "Google",
          },
        });
      } else {
       await prismaClient.user.update({
          where: { email: params.user.email },
          data: {
            name: params.user.name ?? existingUser.name,
            image: params.user.image ?? existingUser.image,
          },
        });
      }
    } catch (e) {
      console.error("Error handling user sign-in:", e);
      return false;
    }

      return true
    }
}
})

export {handler as GET, handler as POST}