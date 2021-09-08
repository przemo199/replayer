import {Handler} from "@netlify/functions";
import {MongoClient} from "mongodb";

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.k6gbu.mongodb.net/test_database?retryWrites=true&w=majority`;
const dbName = "replayerDB";
const collectionName = "media";

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {statusCode: 405, body: "Method Not Allowed"};
  }

  if (!event.body) {
    return {statusCode: 400, body: "Bad Request"};
  }

  const date = (new Date()).toISOString().replace(/\.|:|-|T|Z/g, "");
  let dateRadix36 = parseInt(date).toString(36);
  // @ts-ignore
  const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  await client.connect();
  const collection = client.db(dbName).collection(collectionName);
  const body = JSON.parse(event.body);
  while (await collection.find({"resourceId": dateRadix36}).limit(1).hasNext()) {
    dateRadix36 = (parseInt(dateRadix36, 36) + 1).toString(36);
  }
  // const newDocument = {"resourceId": dateRadix36};
  // const keys = Object.keys(body);
  // for (const key of keys) {
  //   // @ts-ignore
  //   newDocument[key] = body[key];
  // }
  await collection.insertOne({"resourceId": dateRadix36, ...body});
  await client.close();

  return {
    statusCode: 200,
    body: JSON.stringify({resourceId: dateRadix36})
  };
};

export {handler};
