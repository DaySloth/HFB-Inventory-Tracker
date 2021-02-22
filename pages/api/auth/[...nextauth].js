import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

export default NextAuth({
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            authorize: async (credentials) => {
                console.log("credentials_:", credentials);
                Promise.reject(
                    new Error("Invalid Username and Password combination")
                );
                // try {
                //     const data = {
                //         username: credentials.username,
                //         password: credentials.password,
                //     };
                //     // API call associated with authentification
                //     // look up the user from the credentials supplied
                //     const user = null;
                //     if (user) {
                //         // Any object returned will be saved in `user` property of the JWT
                //         return Promise.resolve(user);
                //     }
                // } catch (error) {
                //     if (error.response) {
                //         console.log(error.response);
                //         Promise.reject(
                //             new Error(
                //                 "Invalid Username  and Password combination"
                //             )
                //         );
                //     }
                // }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/signin", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
        newUser: null, // If set, new users will be directed here on first sign in
    },
});
