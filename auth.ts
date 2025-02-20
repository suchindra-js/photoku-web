import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const user = await res.json();

          if (!res.ok || !user.id || !user.email) {
            throw new Error("Invalid credentials.");
          }

          // ✅ Return the user object (including the token)
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            token: user.token, // Save the token
          };
        } catch (error) {
          console.error("Authentication Error:", error.message);
          throw new Error("Authentication failed.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.token; // ✅ Store the JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.accessToken = token.accessToken; // ✅ Pass token to session
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
