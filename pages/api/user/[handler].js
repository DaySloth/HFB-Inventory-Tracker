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
            console.log("user_:", user);
            if (user) {
                console.log("found the user");
            } else {
                console.log("couldn't find user");
            }
            break;

        case "create":
            console.log("hitting create");
            break;

        case "delete":
            console.log("hitting delete");
            break;

        default:
            console.log("hitting default");
            mongoose.connection.close();
    }
};
