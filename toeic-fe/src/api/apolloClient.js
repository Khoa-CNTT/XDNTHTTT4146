import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
<<<<<<< HEAD
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Tạo Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
=======

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  }),
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
  cache: new InMemoryCache(),
});

export default client;
