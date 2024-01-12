import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Book from './pages/Book'
import BookAdd from './pages/BookAdd'
import BookUpdate from './pages/BookUpdate'
import Home from './pages/Home'
import RecommendBooks from './pages/RecommendBooks'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/book/:id" element={<Book />} />
					<Route path="/book/add" element={<BookAdd />} />
					<Route path="/book/:id/update" element={<BookUpdate />} />
					<Route path="/recommend-books" element={<RecommendBooks />} />
					<Route path="*" element={<h1>404 Not Found</h1>} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
