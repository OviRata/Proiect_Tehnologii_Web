const bcrypt = require('bcryptjs');
const { getDB } = require('./db');

async function createUser(username, email, password) {
  const db = getDB();
  const hashedPassword = await bcrypt.hash(password, 10);
  return await db.collection('allUsers').insertOne({
    username,
    email,
    password: hashedPassword,
  });
}

async function findUserByUsername(username) {

  try {
    const db = getDB();
    const usersCollection = db.collection('allUsers');
    return await usersCollection.findOne({username});
  } catch (error) {
    console.error('Error finding user by username', error);
    throw error;
  }
}

async function findUserByEmail(email) {
  const db = getDB();
  return await db.collection('allUsers').findOne({email});
}

module.exports = { createUser, findUserByUsername, findUserByEmail };
