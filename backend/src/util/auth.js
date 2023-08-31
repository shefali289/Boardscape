import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const CheckAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error('Request must contain Bearer Token');
  }
  throw new Error('No Authorization header is provided');
};

const VerifyIdToken = async (idToken) => {
  const client = new OAuth2Client(process.env.GCP_APP_ID);
  if (idToken) {
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GCP_APP_ID,
      });
      const payload = ticket.getPayload();
      return payload;
    } catch (error) {
      throw new AuthenticationError('Invalid/Expired token');
    }
  }
  throw new Error('Request must contain ID Token');
};

export { CheckAuth, VerifyIdToken };
