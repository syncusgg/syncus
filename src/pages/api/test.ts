import type { NextApiRequest, NextApiResponse } from "next";
import testModel from "../../lib/models/test.model";
import connectDB from "../../lib/connectDB";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { connection } = await connectDB();

  try {
    console.log("GOT HERE");
    const testObject = new testModel({
      first_name: "Tom",
      last_name: "Jerry",
    });
    // The intellisense will detect the fullName Method
    const name = testObject.fullName();
    await testObject.save();

    res.status(201).json({
      name,
    });

    // Erase test data after use
    connection.db.dropCollection(testModel.collection.collectionName);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
