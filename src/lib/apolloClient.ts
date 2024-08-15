import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';

const httpLink = createHttpLink({
  uri: 'https://parseapi.back4app.com/graphql',
  fetch,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Parse-Application-Id': process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID || '',
      'X-Parse-Master-Key': process.env.NEXT_PUBLIC_PARSE_MASTER_KEY || '',
      'X-Parse-Client-Key': process.env.NEXT_PUBLIC_PARSE_CLIENT_KEY || '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
