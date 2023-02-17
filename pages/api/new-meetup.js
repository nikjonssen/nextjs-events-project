// api/new-meetup/
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    // can use try/catch block for the whole configuration
    const data = req.body;
    const client = await MongoClient.connect(process.env.DB_URI);
    const db = client.db();
    const eventsColletion = db.collection("meetups");
    const result = await eventsColletion.insertOne(data);
    client.close();
    res.status(201).json({ message: "Meetup Added!" });
  }
}

export default handler;
