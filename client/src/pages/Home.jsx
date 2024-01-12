import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { GET_BOOKS } from '../graphql/query'
import { useAuth } from '../context/AuthContext'
import { useQuery } from '@apollo/client'

const Home = () => {
	const { loading, error, data } = useQuery(GET_BOOKS)

	const { logout } = useAuth()

	const navigate = useNavigate()

	const [search, setSearch] = useState('')
	const [genreFilter, setGenreFilter] = useState('')
	const [yearFilter, setYearFilter] = useState('')
	const [filteredBooks, setFilteredBooks] = useState(data ? data.books : [])

	const handleSearchChange = (event) => {
		setSearch(event.target.value.toLowerCase())
	}

	const handleSearch = (event) => {
		if (event) event.preventDefault()
		const filtered = data.books.filter((book) => {
			return book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search)
		})
		setFilteredBooks(filtered)
	}

	const handleFilter = () => {
		const filtered = data.books.filter((book) => {
			return (
				(genreFilter ? book.genre.toLowerCase().includes(genreFilter) : true) &&
				(yearFilter ? book.publicationYear === parseInt(yearFilter) : true)
			)
		})
		setFilteredBooks(filtered)
	}

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	useEffect(() => {
		setFilteredBooks([])
	}, [data])

	return (
		<>
			{loading && <p>Loading...</p>}
			{error && <p>Error :(</p>}
			<div className="menu">
				<h1>Kitaplığım</h1>
				<div className="menu1-input1">
					<input type="text" placeholder="Başlık veya yazar ara" onChange={handleSearchChange} />
					<button onClick={handleSearch} disabled={!search.trim()}>
						Ara
					</button>
				</div>

				<button onClick={handleLogout} className="logout">
					Çıkış Yap
				</button>
			</div>
			<div className="container-main">
				<div className="container-left">
					<div className="menu-input">
						<input type="text" placeholder="Tür Ara" onChange={(e) => setGenreFilter(e.target.value.toLowerCase())} />
						<input
							type="number"
							placeholder="Yayın Yılı Ara"
							onChange={(e) => setYearFilter(e.target.value)}
							className="inpt"
						/>
						<button onClick={handleFilter}>Filtrele</button>
					</div>
					<div className="left-div">
						<h2 style={{ fontSize: '2rem' }}>Bulunan Kitaplar:</h2>
						<ul>
							{filteredBooks.map((book) => (
								<li key={book.id}>
									<Link
										to={`/book/${book.id}`}
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'start',
											justifyContent: 'start'
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
					</div>
				</div>
				<div className="container-right">
					<div className="container1">
						<button>
							<Link to="/book/add">Kitap Ekle</Link>
						</button>
						<button>
							<Link to="/recommend-books">Kitap Öner</Link>
						</button>
					</div>
					<div className="container2">
						<h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Tüm Kitaplar:</h2>
						{data && (
							<ul>
								{data.books.map((book) => (
									<li key={book.id}>
										<Link
											to={`/book/${book.id}`}
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'start',
												justifyContent: 'start'
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
						<p>Kitap sayısı: {data && data.books.length}</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
