import {Handler} from "@netlify/functions";
import {MongoClient} from "mongodb";

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.k6gbu.mongodb.net/test_database?retryWrites=true&w=majority`;

const pageSize = 50;

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
  const collection = client.db("replayerDB").collection("media");
  const body = JSON.parse(event.body);
  const query = collection.find({name: body.query})
    .sort({_id: -1}).skip(pageSize * (body.page - 1));

  let hasMore = true;
  if (await query.count() <= pageSize) {
    hasMore = false;
  }

  const documents = await query.limit(pageSize).toArray();
  await client.close();

  return {
    statusCode: 200,
    body: JSON.stringify({documents: documents || null, hasMore})
  };
};

export {handler};
