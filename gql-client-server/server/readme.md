Simple explanations of the key concepts in GraphQL:

Query: A request to read or fetch data. It's like asking for specific information from a database.

Mutation: A request to modify data. It's used to create, update, or delete data in the database.

Resolver: A function that handles a query or mutation and fetches the data from the database or another source. It provides the response to the request.

In summary:

Query = Read data

Mutation = Change data

Resolver = Fetch or modify data based on a query or mutation

**Server setup**

startStandaloneServer: Best for quick setups and simple use cases. It abstracts away the need for direct interaction with Express, making it easier for beginners or for projects where a minimal setup is sufficient.
// Passing an ApolloServer instance to the startStandaloneServer function: // 1. creates an Express app // 2. installs your ApolloServer instance as middleware // 3. prepares your app to handle incoming requests

Manual Express Setup: Provides full control over the Express server configuration, allowing for more complex setups, custom middleware, and additional routes beyond the GraphQL endpoint.
Query1 query ExampleQuery { getHello }

---

`Query Names:`
Use descriptive names that represent the action being performed.
Prefix queries with verbs like get, list, search, etc., to clarify their purpose.
For example, getBook(id: ID!), listBooks, searchBooks, etc.
---

**_*schema*_**
export const typeDefs = `
book:{
id:number,
title:string,
authorName:string,
publishedYear:Number
}
`

**schema defination Query**

export const typeDefs = `
  type Query {
    getHello: String
    books: [Book]
    getBook(id: ID!): Book
  }
`;


**Resolver**

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



**Query example**

**Example1: Normal Function**
query ExampleQuery {
    getHello
    books {
        author
        publishedYear
    }
}

**Example1: Function with Parameter**
query ExampleQuery($getBookId: ID!) {
  getHello
  
  getBook(id: $getBookId) {
    id
    title
    author
    publishedYear
  }
}

__variable pass argument:

{
  "getBookId": 1
}



**Mutation**
In GraphQL, the ! symbol denotes a non-nullable field or return type. This means that the value must be provided and cannot be null.

**Non-nullable Input Fields:**
`addBook(title: String!, author: String!, publishedYear: Int!): Book!`
title, author, and publishedYear input fields are marked with !
This means that when you call the addBook mutation, you must provide values for these fields. They cannot be omitted or set to null.

`updateBook(id: ID!, title: String, author: String, publishedYear: Int): Book`
The id input field is marked with !, making it non-nullable, so you must provide an id 
However, the title, author, and publishedYear fields are optional (nullable). You can provide any combination of these fields or none at all.

**Non-nullable Return Type:**
! in the return type ensures that the mutation must return a value.
`addBook` guarantees a Book is returned.
`updateBook` may return null if no book was updated.

**schema Defination**
export const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedYear: Int!
  }

  type Mutation {
    addBook(title: String!, author: String!, publishedYear: Int!): Book!
    updateBook(id: ID!, title: String, author: String, publishedYear: Int): Book
    deleteBook(id: ID!): Book
  }
`;


**Resolver**

export const resolvers = {

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
  },
};


**Query**
**Example-1**
mutation AddBook($title: String!, $author: String!, $publishedYear: Int!) {
  addBook(title: $title, author: $author, publishedYear: $publishedYear) {
    author
    id
    publishedYear
    title
  }
}

____varibale
{  "title": "Soumitya Born to Rise",
  "author": "soumitya",
  "publishedYear": 2029,
}

**Example-2**
mutation Mutation($deleteBookId: ID!) {
  deleteBook(id: $deleteBookId) {
    id
    author
  }
}

____variable
{
  "deleteBookId": "20"
}


**Example-3 multiple mutation call in single mulation obj**
mutation Mutation($title: String!, $author: String!, $publishedYear: Int!, $deleteBookId: ID!, $updateBookId: ID!, $updateBookTitle2: String, $updateBookAuthor2: String, $updateBookPublishedYear2: Int) {
  
  addBook(title: $title, author: $author, publishedYear: $publishedYear) {
    author
    id
    publishedYear
    title
  }
  deleteBook(id: $deleteBookId) {
    author
    id
    publishedYear
  }
  updateBook(id: $updateBookId, title: $updateBookTitle2, author: $updateBookAuthor2, publishedYear: $updateBookPublishedYear2) {
    author
    id
    publishedYear
    title
  }
}


___variable
{  "title": "NUMBER_1",
  "author": "Gill",
  "publishedYear": 2029,
  "deleteBookId": "20",
  "updateBookId": "15",
  "updateBookTitle2": "Soumity the legend",
  "updateBookAuthor2": "Soumitya",
  "updateBookPublishedYear2": 2029
}

____return
{
  "data": {
    "addBook": {
      "author": "Gill",
      "id": "20",
      "publishedYear": 2029,
      "title": "NUMBER_1"
    },
    "deleteBook": {
      "author": "Gill",
      "id": "20",
      "publishedYear": 2029
    },
    "updateBook": {
      "author": "Soumitya",
      "id": "15",
      "publishedYear": 2029,
      "title": "Soumity the legend"
    }
  }
}
