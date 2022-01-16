import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  pages: {
    signIn: '/dashboard/login',
    signOut: '/dashboard/logout',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if (user.access_token) {
          token = {
            ...user,
            sub: user.id,
            accessToken: user.access_token as string,
          };
        }
      }
      return token;
    },

    // That token store in session
    async session({ session, token }) {
      // this token return above jwt()
      session.user.accessToken = token.accessToken;
      //if you want to add user details info
      session.user = {
        username: token.name,
        accessToken: session.user.accessToken,
        email: token.email,
        id: token.sub,
      }; //this user info get via API call or decode token. Anything you want you can add
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          console.log(user.access_token);
          return {
            access_token: user.access_token,
            id: user.id,
            name: user.username,
            email: user.email,
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
});
