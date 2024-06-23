Simple explanations of the key concepts in GraphQL:

Query: A request to read or fetch data. It's like asking for specific information from a database.

Mutation: A request to modify data. It's used to create, update, or delete data in the database.

Resolver: A function that handles a query or mutation and fetches the data from the database or another source. It provides the response to the request.

In summary:

Query = Read data

Mutation = Change data

Resolver = Fetch or modify data based on a query or mutation

Server setup

startStandaloneServer: Best for quick setups and simple use cases. It abstracts away the need for direct interaction with Express, making it easier for beginners or for projects where a minimal setup is sufficient.
// Passing an ApolloServer instance to the startStandaloneServer function: // 1. creates an Express app // 2. installs your ApolloServer instance as middleware // 3. prepares your app to handle incoming requests

Manual Express Setup: Provides full control over the Express server configuration, allowing for more complex setups, custom middleware, and additional routes beyond the GraphQL endpoint.
Query1 query ExampleQuery { getHello }
