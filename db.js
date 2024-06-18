const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

let db;

async function connectDB() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db(dbName);
}

function getDB() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

module.exports = { connectDB, getDB };
