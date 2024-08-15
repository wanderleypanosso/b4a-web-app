import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://parseapi.back4app.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    "X-Parse-Application-Id": process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID,
    "X-Parse-Master-Key": process.env.NEXT_PUBLIC_PARSE_MASTER_KEY,
    "X-Parse-Client-Key": process.env.NEXT_PUBLIC_PARSE_CLIENT_KEY,
  },
});

export default client;
