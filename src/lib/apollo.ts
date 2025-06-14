// En: lib/apollo.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const createApolloClient = () => {
  return new ApolloClient({
    // SSR Mode true es importante para que no comparta datos entre peticiones
    ssrMode: true, 
    link: new HttpLink({
      uri: process.env.GRAPHQL_ENDPOINT,
      // fetchOptions: { cache: 'no-store' }, // Otra forma de asegurar datos frescos
    }),
    cache: new InMemoryCache(),
  });
};