import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

export default NextAuth({
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            authorize: async (credentials) => {
                //console.log("credentials_:", credentials);

                try {
                    const data = {
                        username: credentials.username,
                        password: credentials.password,
                    };
                    // API call associated with authentification
                    // look up the user from the credentials supplied
                    const user = await login(data);
                    if (user) {
                        // Any object returned will be saved in `user` property of the JWT
                        return Promise.resolve(user);
                    }
                } catch (error) {
                    if (error.response) {
                        //console.log(error.response);
                        Promise.reject(
                            new Error(
                                "Invalid Username  and Password combination"
                            )
                        );
                    }
                }
            },
        }),
    ],
    pages: {
        signIn: "/authorize/signin",
        signOut: "/auth/signout",
        error: "/authorize/signin", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
        newUser: null, // If set, new users will be directed here on first sign in
    },
});

const login = async (data) => {
    const url = `${process.env.API_DEFAULT_URL}/api/user/login`;
    const result = await axios.post(url, data);
    return result.data;
};
