import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const Users = await db.collection("users");

    const {
        query: { handler },
    } = req;

    switch (handler) {
        case "create":
            const new_user = req.body;

            if (new_user.admin_password === process.env.ADMIN_SIGNUP_PASSWORD) {
                delete new_user.admin_password;

                const user_exists = await Users.find({
                    email: new_user.email,
                }).toArray();

                if (user_exists[0]) {
                    res.json({ status: 400, msg: "User already exists" });
                } else {
                    try {
                        new_user.password = await bcrypt.hash(
                            new_user.password,
                            10
                        );
                        const new_db_user = await Users.insertOne(new_user);
                        if (new_db_user) {
                            console.log(new_db_user);
                            res.json({
                                status: 200,
                                msg: "User Successfully Added",
                            });
                        }
                    } catch (error) {}
                }
            } else {
                res.json({
                    status: 400,
                    msg: "Incorrect Administrator Password",
                });
            }
            break;

        case "delete":
            console.log("hitting delete");
            break;

        default:
            console.log("hitting default");
    }
};
