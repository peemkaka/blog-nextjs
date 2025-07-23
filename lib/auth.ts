import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { getServerSession } from "next-auth/next";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        })
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.id = (profile as any).id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session as any).id = token.id as string;
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);

export const auth = () => getServerSession(authOptions);

// Re-export for compatibility
export { signIn, signOut } from "next-auth/react";