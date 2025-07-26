import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getBaseURL } from "@/network/appConfig";
import api_urls from "@/network/apiUrls";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    groups?: string[];
    permissions?: string[];
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pin_code?: string;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean;
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
            id: result.data.user.id.toString(),
            title: result.data.user.title,
            name: `${result.data.user.first_name} ${result.data.user.last_name}`,
            email: result.data.user.email,
            phone: result.data.user.phone,
            address: result.data.user.address,
            city: result.data.user.city,
            state: result.data.user.state,
            pin_code: result.data.user.pin_code,
            is_active: result.data.user.is_active,
            is_staff: result.data.user.is_staff,
            is_superuser: result.data.user.is_superuser,
            refresh_token: result.data.refresh_token,
            access_token: result.data.access_token,
            groups: result.data.user.groups,
            permissions: result.data.user.permissions,
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
        token.groups = (user as any).groups;
        token.permissions = (user as any).permissions;
        token.id = (user as any).id;
        token.name = (user as any).name;
        token.email = (user as any).email;
        token.phone = (user as any).phone;
        token.address = (user as any).address;
        token.city = (user as any).city;
        token.state = (user as any).state;
        token.pin_code = (user as any).pin_code;
        token.is_active = (user as any).is_active;
        token.is_staff = (user as any).is_staff;
        token.is_superuser = (user as any).is_superuser;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;
      session.groups = token.groups as string[] | undefined;
      session.permissions = token.permissions as string[] | undefined;
      session.id = token.id as string | undefined;
      session.name = token.name as string | undefined;
      session.email = token.email as string | undefined;
      session.phone = token.phone as string | undefined;
      session.address = token.address as string | undefined;
      session.city = token.city as string | undefined;
      session.state = token.state as string | undefined;
      session.pin_code = token.pin_code as string | undefined;
      session.is_active = token.is_active as boolean | undefined;
      session.is_staff = token.is_staff as boolean | undefined;
      session.is_superuser = token.is_superuser as boolean | undefined;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  debug: true

};
