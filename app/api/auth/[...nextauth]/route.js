import NextAuth from 'next-auth';
import { authOptions } from '@/app/lib/auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import NextAuth from 'next-auth/next';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import GithubProvider from 'next-auth/providers/github';
// import clientPromise from '../../../../utils/mongoDBAdapter.js';
// export const authOptions = NextAuth({
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//       profile(profile) {
//         return {
//           id: profile.id,
//           email: profile.email,
//           name: profile.name,
//           userName: profile.login,
//           githubId: profile.id,
//           image: profile.avatar_url,
//           admin: false,
//         };
//       },
//     }),
//     // ...add more providers here
//   ],
//   callbacks: {
//     async session({ session, user, token }) {
//       if (session?.user) {
//         session.user.id = user.id;
//         session.user.githubId = user.githubId;
//         session.user.email = user.email;
//         session.user.admin = user.admin;
//       }
//       return session;
//     },
//   },
//   adapter: MongoDBAdapter(clientPromise),
// });

// // export default NextAuth(authOptions);
// export { authOptions as GET, authOptions as POST };
