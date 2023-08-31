import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import cookieCutter from 'cookie-cutter';

const authLink = setContext((_, { headers }) => {
  const token = cookieCutter.get('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: 'https://boardscape-backend1.herokuapp.com/graphql',
  // uri: 'http://localhost:4001/graphql',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const makeClient = () => new ApolloClient({
  link: httpLink,
  cache,
});

export default client;
export { makeClient };
