const { ApolloServer, gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");
import { typeDefs, resolvers } from '../graphql/schema.js';
const { setupTestServer, stopTestServer } = require("../testsetup/testserver");


const server = setupTestServer();

const { query, mutate } = createTestClient(server);

describe('event tests', () => {
  afterAll(() => {
    try {
      stopTestServer();
    } catch (error) {
      console.log(error);
    } 
    console.log("MongoDB Connection Closed");
  });

    /**
     * @description - get all events from the database
     * @returns {array} - The array of events
     */
    test("fetch events", async () => {
    const FETCH_EVENTS = gql`
        query {
        getEvents {
            title
        }
        }
    `;

    const {
        data: { getEvents }
    } = await query({ query: FETCH_EVENTS });

    expect(getEvents).toEqual([
        {
        "title": "happy event"
        },
        {
        "title": "welcome event"
        }
    ]);
    });

    /**
     * Query a single Event with event ID
     * @param {String} eventId - The event ID
     * @returns {Event} - The event object
     */
    test("fetch event by id", async () => {
        const FETCH_EVENT = gql`
            query {
            getEvent (eventId: "627db5585d9be9703a385e32") {
                title
            }
            }
        `;

        const {
            data: { getEvent }
        } = await query({ query: FETCH_EVENT });

        expect(getEvent).toEqual({
            "title": "happy event",
        }
        );
    });

    /**
     * Query a non-existing Event with event ID
     * @param {String} eventId - The event ID
     * @returns {Event} - null
     */
    test("fetch non-existing event", async () => {
        const FETCH_EVENT = gql`
            query {
            getEvent (eventId: "627db5585d9be9703a385e39") {
                title
            }
            }
        `;

        const {
            data: { getEvent }
        } = await query({ query: FETCH_EVENT });

        expect(getEvent).toEqual(null);
    });


});