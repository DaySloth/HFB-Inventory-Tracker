import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const Parts = await db.collection("parts");

    const {
        query: { handler },
    } = req;

    switch (handler) {
        case "create": {
            //create part
        }
        case "delete": {
            //delete part
        }
        default: {
            //do default option
        }
    }
};
