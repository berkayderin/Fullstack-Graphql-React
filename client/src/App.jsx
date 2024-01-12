import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useQuery, gql } from "@apollo/client";
import Book from "./pages/Book";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<p>test</p>} />
          <Route path="/book/:id" element={<Book />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
