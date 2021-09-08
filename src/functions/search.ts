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

  // @ts-ignore
  const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  await client.connect();
  const collection = client.db(dbName).collection(collectionName);
  const body = JSON.parse(event.body);
  const query = collection.find({name: new RegExp(`${body.query}`)})
    .sort({_id: -1}).skip(body.startIndex);

  let hasMore = true;
  if (await query.count() <= body.endIndex) hasMore = false;

  const documents = await query.limit(body.startIndex - body.endIndex).toArray();
  await client.close();

  return {
    statusCode: 200,
    body: JSON.stringify({documents: documents.length > 0 ? documents : null, hasMore})
  };
};

export {handler};
