export const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedYear: Int!
  }

  type Query {
    getHello: String
    books: [Book]
    getBook(id: ID!): Book
  }

`;
