import { MongoClient } from "mongodb";
import 'dotenv/config';

const connectionString = process.env.MONGO || "";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.db("sample_training");
export default db;