import bcrypt from "bcrypt";

export default async (req, res) => {
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
            console.log("create", req.body);
            //const newUser = await Users.insert(req.body);
            break;

        case "delete":
            console.log("hitting delete");
            break;

        default:
            console.log("hitting default");
    }
};
