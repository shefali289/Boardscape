import { AuthenticationError } from 'apollo-server-express';
import BoardGame from '../../models/BoardGame.js';
import { CheckAuth } from '../../util/auth.js';
import User from '../../models/User.js';
import Event from '../../models/Event.js';

const BoardGameResolver = {

  Query: {
    /**
     * @description - get all boardgames from the database
     * @returns {array} - The array of boardgames
     * @throws {Error} - Throws an error if the database is not connected
     */
    async getBoardGames() {
      try {
        const boardgames = await BoardGame.find().sort({ createdAt: -1 });
        return boardgames;
      } catch (err) {
        throw new Error(err);
      }
    },

    /**
     * Query a single BoardGame with boardgame ID
     * @param {*} _ - The root object
     * @param {String} boardGameId - The boardgame ID
     * @returns {BoardGame} - The boardgame object
     * @throws {Error} - Throws an error if the database is not connected or the
     * boardgame is not found
     */
    async getBoardGame(_, { boardGameId }) {
      try {
        const boardgame = await BoardGame.findById(boardGameId);
        if (boardgame) {
          return boardgame;
        }
        throw new Error('BoardGame not found');
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    joinPlayerbase: async (_, { boardGameId }, context) => {
      const { id } = CheckAuth(context);
      const boardgame = await BoardGame.findById(boardGameId);
      if (boardgame) {
        // check if user is already in the boardgame
        if (boardgame.playerbase.find((playerId) => playerId.toString() === id)) {
          throw new Error('User is already in the boardgame');
        }
        boardgame.playerbase.push(id);
        // get the user
        const user = await User.findById(id);

        if (!user) {
          throw new Error('User not found');
        }

        // check if board game is already in the user's boardgames
        if (user.playedBoardGames.find((boardgameId) => boardgameId.toString() === boardGameId)) {
          throw new Error('BoardGame is already in the user\'s boardgames');
        }
        // add the boardgame to the user
        user.playedBoardGames.push(boardgame);
        await boardgame.save();
        await user.save();
        return boardgame;
      }
      throw new Error('BoardGame not found');
    },
    leavePlayerbase: async (_, { boardGameId }, context) => {
      const { id } = CheckAuth(context);
      try {
        const boardgame = await BoardGame.findById(boardGameId);
        const user = await User.findById(id);

        if (!user) {
          throw new Error('User not found');
        }
        if (!boardgame) {
          throw new Error('BoardGame not found');
        }
        // check if user is already in the boardgame
        if (!boardgame.playerbase.find((playerId) => playerId.toString() === id)) {
          throw new Error('User is not in the boardgame');
        }

        // leave the boardgame player base
        boardgame.playerbase = boardgame.playerbase.filter(
          (playerId) => playerId.toString() !== id,
        );

        // remove the boardgame from the user
        user.playedBoardGames = user.playedBoardGames.filter(
          (bgId) => bgId.toString() !== boardGameId,
        );
        await user.save();
        await boardgame.save();
        return boardgame;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  BoardGame: {
    playerbase: async (parent, { }, context) => {
      // find all user that contains the boardgame id in their playedBoardGames array
      const users = await User.find({ playedBoardGames: parent.id });
      return users;
    },
    relatedEvents: async (parent, { }, context) => {
      // find all events that contains the boardgame id in their boardgames array
      const events = await Event.find({ boardGamesToBePlayed: parent.id });
      return events;
    },
  },
};
export default BoardGameResolver;
