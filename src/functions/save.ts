import {Handler} from "@netlify/functions";
import {MongoClient} from "mongodb";

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.k6gbu.mongodb.net/test_database?retryWrites=true&w=majority`;

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!event.body) {
    return { statusCode: 400, body: "Bad Request" };
  }

  const date = (new Date()).toISOString().replace(/\.|:|-|T|Z/g, "");
  let dateHex = parseInt(date).toString(36);
  // @ts-ignore
  const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  await client.connect();
  const collection = client.db("replayerDB").collection("media");
  const body = JSON.parse(event.body);
  while (collection.find({"resourceId": dateHex}).limit(1)) {
    dateHex = (parseInt(dateHex, 36) + 1).toString(36);
  }
  await collection.insertOne({"resourceId": dateHex, "privateUrl": body.privateUrl});
  await client.close();

  return {
    statusCode: 200,
    body: JSON.stringify({resourceId: dateHex})
  };
};

export {handler};
