import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const Users = await db.collection("users");

    const {
        query: { handler },
    } = req;

    const { username, password } = req.body;

    switch (handler) {
        case "login":
            const { documents: user } = await Users.find({});
            if (user) {
                console.log("found the user");
            } else {
                res.status(400).send("Can't find user");
            }
            break;

        case "create":
            console.log("create");
            //const newUser = await Users.insert(req.body);
            break;

        case "delete":
            console.log("hitting delete");
            break;

        default:
            console.log("hitting default");
    }
};
