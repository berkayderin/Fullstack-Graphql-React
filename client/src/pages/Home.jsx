import React from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_BOOKS } from "../graphql/query";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  return (
    <>
      <h1>Anasayfa</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {data && (
        <ul>
          {data.books.map((book) => (
            <li key={book.id} style={{ marginBottom: "20px" }}>
              <Link
                to={`/book/${book.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "start",
                }}
              >
                <span>Kitap adı: {book.title}</span>
                <span>Yazar: {book.author}</span>
                <span>Yayın yılı: {book.publicationYear}</span>
                <span>Tür: {book.genre}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
