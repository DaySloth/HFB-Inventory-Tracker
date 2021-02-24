import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const Users = await db.collection("users");

    const {
        query: { handler },
    } = req;

    switch (handler) {
        case "login":
            const { username, password } = req.body;
            const { documents: user } = await Users.find({});
            if (user) {
                console.log("found the user");
            } else {
                res.status(400).send("Can't find user");
            }
            break;

        case "create":
            const new_user = req.body;

            if (new_user.admin_password === process.env.ADMIN_SIGNUP_PASSWORD) {
                delete new_user.admin_password;

                const user_exists = await Users.find({
                    email: new_user.email,
                }).toArray();

                // try {
                //     new_user.password = await bcrypt.hash(
                //         new_user.password,
                //         10
                //     );
                //     const new_db_user = await Users.insertOne(new_user);
                //     if (new_db_user) {
                //         console.log(new_db_user);
                //         res.status(200).send("User Successfully Added");
                //     }
                // } catch (error) {}
            } else {
                res.status(400).send("Incorrect Admin Password");
            }
            //const newUser = await Users.insert(req.body);
            break;

        case "delete":
            console.log("hitting delete");
            break;

        default:
            console.log("hitting default");
    }
};
