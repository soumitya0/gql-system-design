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

  type Mutation {
    addBook(title: String!, author: String!, publishedYear: Int!): Book!
    updateBook(id: ID!, title: String, author: String, publishedYear: Int): Book
    deleteBook(id: ID!): Book
  }

`;
