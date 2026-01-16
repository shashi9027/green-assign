import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "DummyJSON",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            "https://dummyjson.com/auth/login",
            {
              username: credentials?.username,
              password: credentials?.password,
              expiresInMins: 30,
            },
            { withCredentials: true }
          );
         

          if (res.data && res.data.accessToken) {
            return {
              id: res.data.id,
              name: res.data.firstName + " " + res.data.lastName,
              email: res.data.email,
              token: res.data.accessToken,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],


  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
