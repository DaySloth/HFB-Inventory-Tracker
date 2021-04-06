import db from "../../../../util/firebase.config";
import { Base64 } from "js-base64";

export default async (req, res) => {
  const {
    query: { handler },
  } = req;

  switch (handler) {
    case "create":
      req.body.password = Base64.encode(req.body.password);
      const username =
        req.body.first_name.toLowerCase() + req.body.last_name.toLowerCase();
      db.ref(`/users/${username}`)
        .once("value")
        .then((result) => {
          if (result.val()) {
            res.json({ status: 400, message: "User already exists" });
            res.end();
          } else {
            db.ref(`/users/${username}`)
              .set(req.body)
              .then((result) => {
                res.json({ status: 200, message: "Successfully created user" });
                res.end();
              });
          }
        });
      break;
    case "delete":
      console.log("hitting delete");
      break;

    default:
      console.log("hitting default");
  }
};
