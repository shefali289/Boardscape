const { ApolloServer } = require("apollo-server");
import { typeDefs, resolvers } from '../graphql/schema.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from "../models/User.js";


dotenv.config();

const setupTestServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const connection =  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('MongoDB Connected');
  })

  return server;
}

const stopTestServer = async() => {

  await mongoose.connection.close();
  
}

// const removeTestUser = async() => {
  
//   User.deleteMany({}, function (err) {
//     console.log(err);
//     // deleted at most one tank document
//   });
  
// }

module.exports.setupTestServer = setupTestServer;
module.exports.stopTestServer = stopTestServer;
//module.exports.removeTestUser = removeTestUser;
