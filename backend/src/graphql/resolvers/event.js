import { AuthenticationError } from 'apollo-server-express';
import Event from '../../models/Event.js';
import { CheckAuth } from '../../util/auth.js';
import User from '../../models/User.js';
import BoardGame from '../../models/BoardGame.js';

const saveAllRelatedEventsInBoardGames = async (boardGames, relatedEventId) => {
  boardGames.forEach(async (boardGame) => {
    boardGame.relatedEvents.push(relatedEventId);
    // mongoose does not allow you to save in bulk??
    await boardGame.save();
  });
};

const EventResolver = {

  Query: {
    /**
     * @description - get all events from the database
     * @returns {array} - The array of events
     * @throws {Error} - Throws an error if the database is not connected
     */
    async getEvents() {
      try {
        const events = await Event.find().sort({ createdAt: -1 });
        return events;
      } catch (err) {
        throw new Error(err);
      }
    },

    /**
     * Query a single Event with event ID
     * @param {*} _ - The root object
     * @param {String} eventId - The event ID
     * @returns {Event} - The event object
     * @throws {Error} - Throws an error if the database is not connected or the event is not found
     */
    async getEvent(_, { eventId }) {
      try {
        const event = await Event.findById(eventId);
        if (event) {
          return event;
        }
        throw new Error('Event not found');
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    /**
     * @description - Create a new event
     * @param {*} _ - The root object
     * @param {String} title - The event title
     * @param {String} description - The event description
     * @param {*} context - The context from the request, including the headers
     * @returns {Event} - The event object
     */
    async createEvent(_, {
      title, description, startDateTime, boardGamesToBePlayed,
    }, context) {
      const user = CheckAuth(context);
      const newEvent = new Event({
        title,
        description,
        userId: user.id,
        createdAt: new Date().toISOString(),
        startDateTime,
        attendees: [],
        comments: [],
        boardGamesToBePlayed,
        // likes: [],
      });

      // get unique element
      const uniqueBoardGamesIds = [...new Set(boardGamesToBePlayed)];

      // get all boardGamesToBePlayed from the database
      try {
        const boardGames = await BoardGame.find({ _id: { $in: uniqueBoardGamesIds } });
        if (boardGames.length !== uniqueBoardGamesIds.length) {
          throw new Error('BoardGames not found');
        } else {
          newEvent.boardGamesToBePlayed = uniqueBoardGamesIds;
        }
        saveAllRelatedEventsInBoardGames(boardGames, newEvent._id);
        const event = await newEvent.save();
        return event;
      } catch (err) {
        console.log(err);
        throw new Error('Invalid boardGame ID');
      }
    },

    async updateEvent(_, {
      eventId, title, description, location, startDateTime, endDateTime, boardGamesToBePlayed,
    }, context) {
      const user = CheckAuth(context);
      try {
        const event = await Event.findById(eventId);
        if (event.userId === user.id) {
          if (title) {
            event.title = title;
          }
          if (description) {
            event.description = description;
          }
          if (location) {
            event.location = location;
          }
          if (startDateTime) {
            event.startDateTime = startDateTime;
          }
          if (boardGamesToBePlayed) {
            // get unique element
            const uniqueBoardGamesIds = [...new Set(boardGamesToBePlayed)];

            // get all boardGamesToBePlayed from the database
            const boardGames = await BoardGame.find({ _id: { $in: uniqueBoardGamesIds } });

            if (boardGames.length !== uniqueBoardGamesIds.length) {
              throw new Error('BoardGames not found');
            } else {
              event.boardGamesToBePlayed = uniqueBoardGamesIds;
            }
            saveAllRelatedEventsInBoardGames(boardGames, event._id);
          }
          const newEvent = await event.save();
          return newEvent;
        }
        throw new Error('You are not authorized to update this event');
      } catch (err) {
        throw new Error(err);
      }
    },

    /**
     * @description - delete an event
     * @param {*} _ - The root object
     * @param {*} eventId - The event ID
     * @param {*} context - The context from the request, including the headers
     * @returns {Event} - The event object
     */
    async deleteEvent(_, { eventId }, context) {
      const user = CheckAuth(context);
      try {
        const event = await Event.findById(eventId);
        if (user.id === event.userId) {
          await event.delete();
          return 'Event deleted successfully';
        }
        throw new AuthenticationError('Forbidden');
      } catch (err) {
        throw new Error(err);
      }
    },
    async joinEvent(_, { eventId }, context) {
      const { id } = CheckAuth(context);
      try {
        const event = await Event.findById(eventId);
        const user = await User.findById(id.toString());

        if (!event) {
          throw new Error('Event not found');
        }
        if (!user) {
          throw new Error('User not found');
        }
        if (event.attendees.some((attendeeId) => attendeeId.toString() === id)) {
          // remove attendee from event
          event.attendees = event.attendees.filter((attendeeId) => attendeeId.toString() !== id);
          // remove event from user
          user.joinedEvents = user.joinedEvents.filter((userEventsId) => userEventsId.toString()
            !== eventId);
          const newEvent = await event.save();
          await user.save();
          return newEvent;
        }
        // add attendee to event
        event.attendees.push(id);
        // add event to user
        user.joinedEvents.push(eventId);
        const newEvent = await event.save();
        await user.save();
        return newEvent;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Event: {
    attendees: async (parent, { }, context) => {
      // const { id } = CheckAuth(context);
      try {
        // find all user that contains the event id in their joinedEvents array
        const users = await User.find({ joinedEvents: parent.id });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    boardGamesToBePlayed: async (parent, { }, context) => {
      try {
        const boardGames = await BoardGame.find({ _id: { $in: parent.boardGamesToBePlayed } });
        return boardGames;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
export default EventResolver;
