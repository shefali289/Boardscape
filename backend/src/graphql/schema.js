import GMR from 'graphql-merge-resolvers';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { gql } from 'apollo-server';
import UserResolver from './resolvers/user.js';
import EventResolver from './resolvers/event.js';
import BoardGameResolver from './resolvers/boardgame.js';

const typeDefs = gql(
  readFileSync(resolve('./src/graphql/schema.graphql'), { encoding: 'utf8' }),
);

const resolvers = GMR.merge([
  EventResolver,
  UserResolver,
  BoardGameResolver,
]);

export { typeDefs, resolvers };
