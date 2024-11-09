// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";

// Extend the Session type to include accessToken
declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
}


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    prompt: "select_account", // Always show the account selection screen
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // If it's the first sign-in, add the access token
            if (account && account.access_token) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Attach the access token to the session object
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    pages: {
        signIn: "/google-login",
    },
});