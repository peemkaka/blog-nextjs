import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { getServerSession } from "next-auth/next";
import { AUTH_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        })
    ],
    callbacks: {

        async signIn({ user: { name, email, image }, profile }) {
            if (!profile) {
                return false;
            }
            const { id, login, bio } = profile as { id: string; login: string; bio?: string };
            const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTH_BY_GITHUB_ID_QUERY, {
                id,
            });
            if (!existingUser) {
                await writeClient.create({
                    _type: 'author',
                    id,
                    userName: login,
                    name,
                    email,
                    image,
                    bio: bio || '',
                });
            }
            return true;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const { id } = profile as { id: string; };
                const user = await client.withConfig({ useCdn: false }).fetch(AUTH_BY_GITHUB_ID_QUERY, {
                    id
                });
                token.id = user?.id;
            }
            return token;
        },
        async session({ session, token }) {
            Object.assign(session, {
                id: token.id,
            })
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);

export const auth = () => getServerSession(authOptions);

// Re-export for compatibility
export { signIn, signOut } from "next-auth/react";