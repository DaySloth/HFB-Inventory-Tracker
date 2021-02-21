import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            async authorize(credentials) {
                const user = {
                    id: 1,
                    name: "Thee Paige Kerr",
                    email: "jsmith@example.com",
                };

                if (user) {
                    // Any user object returned here will be saved in the JSON Web Token
                    console.log(user);
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
        newUser: null, // If set, new users will be directed here on first sign in
    },
});
