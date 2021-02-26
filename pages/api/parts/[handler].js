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
            try {
                const addedPart = await Parts.insert(req.body);
                if (addedPart) {
                    res.json({
                        status: 200,
                        msg: "Successfully added part to warehouse",
                    });
                } else {
                    res.json({
                        status: 400,
                        msg: "Error adding part",
                    });
                }
            } catch (error) {
                res.json({
                    status: 400,
                    msg: "Error adding part",
                });
            }
        }
        case "add": {
            //add part
        }
        case "subtract": {
            //subtract part
        }
        case "delete": {
            //delete part
        }
        default: {
            //do default option
        }
    }
};
