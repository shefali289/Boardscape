import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import { typeDefs, resolvers } from './graphql/schema.js';

dotenv.config();
const PORT = 4001;

const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const StartServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 4001);
    console.log(
      `Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`,
    );
  });
};

StartServer();
