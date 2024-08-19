import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const cache = new InMemoryCache({ addTypename: false });

const link = new HttpLink({
  uri: 'https://parseapi.back4app.com/graphql',
  headers: {
    'X-Parse-Application-Id': 'YHSRARrlmxOYlYKzi0vWKVjWRINqwP00ofqX8hFP',
    'X-Parse-Master-Key': 'jWoQ1V5klwd8kTg3tqU5odb7FrRtpq4WmWYQwKRc',
  },
  fetchOptions: {
    cache: 'no-store'
  },
});

const client = new ApolloClient({
  link,
  cache,
});

export default client;
