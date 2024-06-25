import { DBBookData } from "./DBData.js";

export const resolvers = {
  Query: {
    getHello: () => "Hello, world!",
    books: () => DBBookData,
    getBook: (id) =>
      DBBookData.find((book) => {
        book.id === id;
      }),
  },
};
