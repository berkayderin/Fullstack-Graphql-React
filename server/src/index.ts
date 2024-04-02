import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const MONGO_URL =
  "mongodb+srv://zewodi:u52fNsMt8wefgV8Y@cluster0.bn64c0f.mongodb.net";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası", err));

interface IBook extends Document {
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: Number,
  genre: String,
});

const Book = mongoose.model<IBook>("Book", bookSchema);

interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

const typeDefs = `#graphql
    type Book {
        id: ID!
        title: String
        author: String
        publicationYear: Int
        genre: String
    }

    type Query {
        books: [Book]
        book(id: ID!): Book
    }

	
	type User {
		id: ID!
		username: String
	}

    type Mutation {
		addBook(title: String!, author: String!, publicationYear: Int, genre: String): Book
		updateBook(id: ID!, title: String, author: String, publicationYear: Int, genre: String): Book
		deleteBook(id: ID!): String
		register(username: String!, password: String!): User
		login(username: String!, password: String!): Boolean
	}

`;

const resolvers = {
  Query: {
    books: () => Book.find().exec(),
    book: (_, { id }) => Book.findById(id).exec(),
  },
  Mutation: {
    addBook: async (_, { title, author, publicationYear, genre }) => {
      const book = new Book({ title, author, publicationYear, genre });
      await book.save();
      return book;
    },
    updateBook: async (_, { id, title, author, publicationYear, genre }) => {
      return Book.findByIdAndUpdate(
        id,
        { title, author, publicationYear, genre },
        { new: true }
      );
    },
    deleteBook: async (_, { id }) => {
      await Book.findByIdAndDelete(id);
      return "Silme işlemi başarılı";
    },
    async register(_, { username, password }) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      return newUser;
    },
    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return false;
      }
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 5000 } });

console.log(`🚀 Server başlatıldı... ${url}`);
