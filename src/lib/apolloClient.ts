import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://parseapi.back4app.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    'X-Parse-Application-Id': 'YHSRARrlmxOYlYKzi0vWKVjWRINqwP00ofqX8hFP',
    'X-Parse-REST-API-Key': 'jWoQ1V5klwd8kTg3tqU5odb7FrRtpq4WmWYQwKRc',
  },
});

export default client;
