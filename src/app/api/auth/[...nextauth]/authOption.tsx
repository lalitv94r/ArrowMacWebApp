import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getBaseURL } from "@/network/appConfig";
import api_urls from "@/network/apiUrls";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
}


export const authoption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        phone: { label: "Phone", type: "number" },
        code: { label: "OTP", type: "text" },
      },
      async authorize(credentials: any) {
        let url: string = getBaseURL() + api_urls?.verifyOtp;
        let body: any = {
          code: credentials?.code,
        };
        if (credentials?.email) {
          body.email = credentials?.email;
        } else if (credentials?.phone) {
          body.phone = credentials?.phone;
        }
        try {
          const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.message || "Authentication failed");
          }

          return {
            id: result.data.details.id.toString(),
            email: result.data.details.email,
            phone: result.data.details.phone,
            name: `${result.data.details.first_name}`,
            refresh_token: result.data.refresh_token,
            access_token: result.data.access_token,
          };

        } catch (err) {
          console.error("Authorize error:", err);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).access_token;
        token.refreshToken = (user as any).refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  debug: true

};
