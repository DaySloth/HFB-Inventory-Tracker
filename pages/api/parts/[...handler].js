import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const Parts = await db.collection("parts");

  const {
    query: { handler },
  } = req;

  switch (handler[0]) {
    case "create": {
      //create part
      try {
        const addedPart = await Parts.insertOne(req.body);
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
      break;
    }
    case "add": {
      try {
        //add part
        const { quantity } = await Parts.findOne({ _id: ObjectId(handler[1]) });
        console.log(quantity);
        const newQuantity = parseInt(quantity) + parseInt(req.body.amount);
        console.log(newQuantity);
        Parts.findOneAndUpdate(
          {
            _id: ObjectId(handler[1]),
          },
          {
            $set: { quantity: newQuantity },
          },
          (err, result) => {
            if (result) {
              res.json({
                status: 200,
                msg: "Successfull add",
              });
            } else {
              res.json({
                status: 400,
                msg: "Error adding part",
              });
            }
          }
        );
      } catch (error) {
        res.json({
          status: 400,
          msg: "Error adding part",
        });
      }
      break;
    }
    case "subtract": {
      //subtract part

      try {
        //add part
        const { quantity } = await Parts.findOne({ _id: ObjectId(handler[1]) });
        const newQuantity = parseInt(quantity) - parseInt(req.body.amount);

        if (newQuantity < 0) {
          res.json({
            status: 400,
            msg: "Cannot subtract more than is in inventory",
          });
        } else if (newQuantity >= 0) {
          Parts.findOneAndUpdate(
            {
              _id: ObjectId(handler[1]),
            },
            {
              $set: { quantity: newQuantity },
            },
            (err, result) => {
              if (result) {
                res.json({
                  status: 200,
                  msg: "Successfull add",
                });
              }
            }
          );
        }
      } catch (error) {
        res.json({
          status: 400,
          msg: "Error adding part",
        });
      }
      break;
    }
    case "delete": {
      //delete part
      console.log("delete");
      break;
    }
    default: {
      //do default option
      res.send(500);
    }
  }
};
