import './App.css'

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import Book from './pages/Book'
import BookAdd from './pages/BookAdd'
import BookUpdate from './pages/BookUpdate'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import RecommendBooks from './pages/RecommendBooks'
import Register from './pages/Register'

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/home"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/book/:id"
						element={
							<ProtectedRoute>
								<Book />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/book/add"
						element={
							<ProtectedRoute>
								<BookAdd />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/book/:id/update"
						element={
							<ProtectedRoute>
								<BookUpdate />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/recommend-books"
						element={
							<ProtectedRoute>
								<RecommendBooks />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<Login />} />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
