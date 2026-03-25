import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          // fetch the user
          const res = await fetch(
            `${process?.env?.API}/users/email/${credentials?.email}`,
          );

          const user = await res.json();

          //if user not found
          if (!user) {
            throw new Error("user not found");
          }

          //checking password
          const isPasswordCorrect = bcrypt.compare(
            credentials?.password,
            user?.password,
          );

          //if password is not matched
          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }

          // return user info
          return {
            id: user?._id.toString(),
            name: user?.name,
            email: user?.email,
            role: user?.role,
          };
        } catch (error) {
          throw new Error(error?.message);
        }
      },
    }),
  ],
};
