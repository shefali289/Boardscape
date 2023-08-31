const { ApolloServer, gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");
import { typeDefs, resolvers } from '../graphql/schema.js';
const { setupTestServer, stopTestServer } = require("../testsetup/testserver");


const server = setupTestServer();

const { query, mutate } = createTestClient(server);

describe('boardgame tests', () => {
  afterAll(() => {
    try {
      stopTestServer();
    } catch (error) {
      console.log(error);
    }
   
    console.log("MongoDB Connection Closed");
  });

  /**
   * @description - get all boardgames from the database
   * @returns {array} - The array of boardgames
   */
  test("fetch all boardgames from database", async () => {
    const FETCH_BOARDGAMES = gql`
      query {
        getBoardGames {
          title
          publisher
        }
      }
    `;

    const {
      data: { getBoardGames }
    } = await query({ query: FETCH_BOARDGAMES });

    expect(getBoardGames).toEqual([{
      "title": "Gloomhaven",
      "publisher": "Cephalofair Games"
    },
    {
      "title": "Brass: Birmingham",
      "publisher": "Roxley"
    }]);
  });

   /**
    * Query a single BoardGame with boardgame ID
    * @param {String} boardGameId - The boardgame ID
    * @returns {BoardGame} - The boardgame object
    */
  test("fetch boardgame by id", async () => {
    const FETCH_BOARDGAME = gql`
      query {
        getBoardGame (boardGameId: "6278b88a3a6249b37add9ab7") {
          title
          publisher
        }
      }
    `;

    const {
      data: { getBoardGame }
    } = await query({ query: FETCH_BOARDGAME });

    expect(getBoardGame).toEqual({
      "title": "Gloomhaven",
      "publisher": "Cephalofair Games"
    }
    );
  });


   /**
    * Query a non-existing BoardGame with boardgame ID
    * @param {String} boardGameId - The boardgame ID
    * @returns {BoardGame} - null
    */
   test("fetch boardgame by id", async () => {
    const FETCH_BOARDGAME = gql`
      query {
        getBoardGame (boardGameId: "6278b88a3a6249b37add9ab9") {
          title
          publisher
        }
      }
    `;

    const {
      data: { getBoardGame }
    } = await query({ query: FETCH_BOARDGAME });

    expect(getBoardGame).toEqual(null);
  });


});