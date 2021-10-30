// api/new-meetup/
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    // can use try/catch block for the whole configuration
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://jason:jasonbase@nodeexpressapi.5xkbz.mongodb.net/events?retryWrites=true&w=majority"
    );
    const db = client.db();
    const eventsColletion = db.collection("meetups");
    const result = await eventsColletion.insertOne(data);
    client.close();
    res.status(201).json({ message: "Meetup Added!" });
  }
}

export default handler;
