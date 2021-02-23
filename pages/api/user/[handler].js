import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dbUser from "../../../models/user.js";

mongoose.connect(
    "mongodb+srv://arampenthal:Batmanisc00l@database.1cd32.mongodb.net/InventoryTracker?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

export default async (req, res) => {
    const {
        query: { handler },
    } = req;
    const { username, password } = req.body;

    switch (handler) {
        case "login":
            const user = await dbUser.findOne({ email: username });
            console.log("user_:", user);
            if (user) {
                console.log("found the user");
            } else {
                console.log("couldn't find user");
            }
            mongoose.connection.close();
            break;
        case "create":
            console.log("hitting create");
            mongoose.connection.close();
            break;
        case "delete":
            console.log("hitting delete");
            mongoose.connection.close();
            break;
        default:
            console.log("hitting default");
            mongoose.connection.close();
    }
};
