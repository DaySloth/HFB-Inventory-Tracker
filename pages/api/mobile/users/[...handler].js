import db from "../../../../util/firebase.config";
import { Base64 } from "js-base64";

export default async (req, res) => {
  const {
    query: { handler },
  } = req;

  switch (handler[0]) {
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
    case "update":
      const updateUsername =
        req.body.first_name.toLowerCase() + req.body.last_name.toLowerCase();
      if (req.body.password) {
        req.body.password = Base64.encode(req.body.password);
      }
      if (req.body.oldUsername) {
        let oldUsername = req.body.oldUsername;
        delete req.body.oldUsername;

        db.ref(`/users/${oldUsername}`)
          .remove()
          .then((result) => {
            db.ref(`/users/${updateUsername}`)
              .set(req.body)
              .then((result) => {
                res.json({ status: 200, message: "Successfully updated user" });
                res.end();
              });
          });
      } else {
        db.ref(`/users/${updateUsername}`)
          .update(req.body)
          .then((result) => {
            res.json({ status: 200, message: "Successfully updated user" });
            res.end();
          });
      }
      break;
    case "delete":
      db.ref(`/users/${handler[1]}`)
        .remove()
        .then((result) => {
          res.json({ status: 200, message: "Successfully deleted user" });
          res.end();
        });
      break;

    default:
      console.log("hitting default");
  }
};
