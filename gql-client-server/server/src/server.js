import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./typeDef.js";
import { resolvers } from "./resolver.js";
import { startStandaloneServer } from "@apollo/server/standalone";

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
