import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import User from '../../models/User.js';
import Event from '../../models/Event.js';
import RegisterInputValidators, { LoginInputValidators } from '../../util/validators.js';
import CheckAuth, { VerifyIdToken } from '../../util/auth.js';

const saltRounds = 10;

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' },
  );
}

/**
 * @description - The resolver for the user type.
 * Contain all the resolvers for the user type, including the mutation resolvers.
 * @param {object} root - The root object
 * @param {object} args - The arguments object
 * @param {object} context - The context object
 * @param {object} info - The info object
 * @returns {object} - The response object
 */
const UserResolver = {

  Mutation: {
    /**
     * Login for a user
     * new token is generated for the user
     * @param {String} email - The email of the user
     * @param {String} password - The password of the user
     * @param {String} context - The context header
     * @returns {User} - The user object
     * @throws {UserInputError} - Throws an error if the email is not found, or the password is
     *  not valid
     */
    async login(_, { email, password }) {
      const { valid, errors } = LoginInputValidators(email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ email });
      if (!user) {
        errors.general = 'Email not found';
        throw new UserInputError('Email not found', { errors });
      }
      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        errors.general = 'Wrong credential';
        throw new UserInputError('Wrong credentials ', { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    /**
     * When logging in with a google account
     * create a new user for the google account
     * @param {String} idToken - googles id token
     * @returns {User} - The user object
     */
    async googleLogin(_, { idToken }) {
      // eslint-disable-next-line camelcase
      const { email, given_name, family_name } = await VerifyIdToken(idToken);
      // make sure user doesn't already exists
      const user = await User.findOne({ email });
      if (user) {
        return {
          ...user._doc,
          id: user._id,
          token: generateToken(user),
        };
      }

      const newUser = new User({
        // eslint-disable-next-line camelcase
        firstName: given_name,
        // eslint-disable-next-line camelcase
        lastName: family_name,
        email,
        joinedEvents: [],
        playedBoardGames: [],
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      return {
        ...res._doc,
        id: res._id,
        token: generateToken(res),
      };
    },

    /**
     * Register a new user, take register input as an argument,
     * validate the input, hash the password, create a new user
     * @param {String} firstName - The user's first name
     * @param {String} lastName - The user's last name
     * @param {String} email
     * @param {String} password
     * @param {String} confirmPassword
     * @returns{User} - The user object
     * @throws {UserInputError} - Throws an error if the email is not valid, or the password is not
     * valid
     */
    async register(
      parent,
      {
        registerInput: {
          firstName, lastName, email, password, confirmPassword,
        },
      },
    ) {
      // make sure user doesn't already exists
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('email already exists', {
          errors: {
            email: 'An account with the same email already exists',
          },
        });
      }

      // validate user data
      const { valid, errors } = RegisterInputValidators(email, password, confirmPassword);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // hash password and create an auth token
      const hashedPassword = await hash(password, saltRounds);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        joinedEvents: [],
        playedBoardGames: [],
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
  User: {
    joinedEvents: async (parent, args, context) => {
      // const user = await CheckAuth(req);
      try {
        // find all events that contain the user id in the attendees array
        const events = await Event.find({
          attendees: { $in: [parent.id] },
        });
        return events;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

};

export default UserResolver;
