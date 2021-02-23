import mongoose from "mongoose";
import bcrypt from "bcrypt";
import db from "../../../models";

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

    switch (handler) {
        case "login":
            console.log("hitting the login");
            break;
        case "create":
            console.log("hitting create");
            break;
        case "delete":
            console.log("hitting delete");
            break;
        default:
            console.log("hitting default");
    }
};
