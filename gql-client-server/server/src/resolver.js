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

  Mutation: {
    addBook: (_, { title, author, publishedYear }) => {
      const newBook = {
        id: String(DBBookData.length + 1),
        title,
        author,
        publishedYear,
      };
      DBBookData.push(newBook);
      return newBook;
    },
    updateBook: (_, { id, title, author, publishedYear }) => {
      const index = DBBookData.findIndex((book) => book.id === id);
      if (index !== -1) {
        DBBookData[index] = {
          ...DBBookData[index],
          title,
          author,
          publishedYear,
        };
        return DBBookData[index];
      }
      return null;
    },
    deleteBook: (_, { id }) => {
      const index = DBBookData.findIndex((book) => book.id === id);
      if (index !== -1) {
        const deletedBook = DBBookData.splice(index, 1)[0];
        return deletedBook;
      }
      return null;
    },
  },
};
