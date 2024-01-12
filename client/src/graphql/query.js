import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetAllBooks {
    books {
      id
      title
      author
      publicationYear
      genre
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      publicationYear
      genre
    }
  }
`;
