import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../graphql/query";

const Book = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const book = data.book;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Yazar: {book.author}</p>
      <p>Yayın Yılı: {book.publicationYear}</p>
      <p>Tür: {book.genre}</p>
    </div>
  );
};

export default Book;
