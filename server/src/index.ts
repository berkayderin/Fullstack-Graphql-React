import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// MongoDB bağlantı URL'nizi buraya ekleyin
const MONGO_URL =
  "mongodb+srv://zewodi:DAgkkJyG5yNLQeBh@cluster0.8t5rtcd.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası", err));

// Book modelini genişlet
const bookSchema = new Schema({
  title: String,
  author: String,
  publicationYear: Number, // Bu alanı ekleyin
  genre: String,
});

const Book = mongoose.model("Book", bookSchema);

const userSchema = new Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// GraphQL şemalarını genişlet
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

// Resolver fonksiyonlarını güncelle
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

// Apollo Server'ı başlat
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 5000 } });

console.log(`🚀 Server başlatıldı... ${url}`);
