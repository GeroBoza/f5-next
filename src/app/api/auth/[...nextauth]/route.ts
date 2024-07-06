// imports
import { ApiService } from "@/lib/apiService";
import { JWT } from "next-auth/jwt";

import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "./authOptions";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials, req) {
//         const data: Record<string, any> = {
//           username: credentials?.username,
//           password: credentials?.password,
//         };

//         const res = await ApiService.login(data);

//         if (res.data.auth === true) {
//           return res.data;
//         } else {
//           throw new Error("Invalid credentials");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: any }) {
//       return { ...token, ...user };
//     },
//     async session({ session, token }: { session: any; token: JWT }) {
//       session.user = token as any;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
