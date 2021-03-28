import db from "../../../../util/firebase.config";
import { Base64 } from "js-base64";

export default async (req, res) => {
  const {
    query: { handler },
  } = req;

  switch (handler) {
    case "create":
      break;
    case "delete":
      console.log("hitting delete");
      break;

    default:
      console.log("hitting default");
  }
};
