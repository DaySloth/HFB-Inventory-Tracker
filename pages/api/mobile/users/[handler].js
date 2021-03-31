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
            //error
          } else {
            db.ref(`/users/${username}`)
              .create(req.body)
              .then((result) => {
                console.log(result);
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
