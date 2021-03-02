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
        req.body.date_updated = Date.now();
        if (req.body.serial) {
          req.body.serial = [req.body.serial];
        } else {
          req.body.serial = [];
        }

        const foundPart = await Parts.findOne({
          part_num: req.body.part_num,
        });

        if (foundPart) {
          foundPart.serial.push(req.body.serial[0]);
          foundPart.quantity =
            parseInt(foundPart.quantity) + parseInt(req.body.quantity);

          const updatedPart = await Parts.findOneAndUpdate(
            { _id: ObjectId(foundPart._id) },
            { $set: { quantity: foundPart.quantity, serial: foundPart.serial } }
          );
          if (updatedPart.ok === 1) {
            res.json({
              status: 200,
              msg: "Successfully updated part",
            });
          } else {
            res.json({
              status: 400,
              msg: "Error updating part",
            });
          }
        } else {
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
        const newQuantity = parseInt(quantity) + parseInt(req.body.amount);

        Parts.findOneAndUpdate(
          {
            _id: ObjectId(handler[1]),
          },
          {
            $set: { quantity: newQuantity, date_updated: Date.now() },
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
              $set: { quantity: newQuantity, date_updated: Date.now() },
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
    case "search": {
      try {
        const foundParts = await Parts.find({
          $text: { $search: `${handler[1]}` },
        }).toArray();

        if (foundParts[0]) {
          res.json({
            status: 200,
            msg: "found parts",
            parts: foundParts,
          });
        } else {
          res.json({
            status: 400,
            msg: "Error Finding Parts",
          });
        }
      } catch (error) {
        res.json({
          status: 400,
          msg: "Error Finding Parts",
        });
      }

      break;
    }
    case "update": {
      req.body.date_updated = Date.now();
      try {
        const updatedPart = await Parts.findOneAndUpdate(
          { _id: ObjectId(handler[1]) },
          { $set: req.body }
        );
        if (updatedPart.ok === 1) {
          res.json({
            status: 200,
            msg: "Successfully updated part",
          });
        } else {
          res.json({
            status: 400,
            msg: "Error updating part",
          });
        }
      } catch (error) {
        res.json({
          status: 400,
          msg: "Error updating part",
        });
      }
      break;
    }

    case "serial": {
      if (handler[1] === "delete") {
        const id = handler[2];
        const foundPart = await Parts.findOne({ _id: ObjectId(id) });
        if (foundPart) {
          foundPart.serial.splice(foundPart.serial.indexOf(req.body.serial), 1);
          foundPart.quantity = parseInt(foundPart.quantity) - 1;
          const updatedPart = await Parts.findOneAndUpdate(
            {
              _id: ObjectId(id),
            },
            { $set: { serial: foundPart.serial, quantity: foundPart.quantity } }
          );

          if (updatedPart.ok === 1) {
            res.json({
              status: 200,
              msg: "Successfully updated part",
            });
          } else {
            res.send(400);
          }
        } else {
          res.send(400);
        }
      }

      break;
    }
    default: {
      //do default option
      res.send(500);
    }
  }
};
