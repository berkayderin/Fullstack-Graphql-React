import { GET_BOOKS } from '../graphql/query'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

const Home = () => {
	const { loading, error, data } = useQuery(GET_BOOKS)

	const [search, setSearch] = useState('')
	const [genreFilter, setGenreFilter] = useState('')
	const [yearFilter, setYearFilter] = useState('')
	const [filteredBooks, setFilteredBooks] = useState(data ? data.books : [])

	const handleSearchChange = (event) => {
		setSearch(event.target.value.toLowerCase())
	}

	const handleSearch = () => {
		const filtered = data.books.filter(
			(book) => book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search)
		)
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
	return (
		<>
			{loading && <p>Loading...</p>}
			{error && <p>Error :(</p>}

			<h1>Anasayfa</h1>

			<input type="text" placeholder="Başlık veya yazar ara" onChange={handleSearchChange} />
			<button onClick={handleSearch}>Ara</button>

			<div>
				<input type="text" placeholder="Tür Ara" onChange={(e) => setGenreFilter(e.target.value.toLowerCase())} />
				<input type="number" placeholder="Yayın Yılı Ara" onChange={(e) => setYearFilter(e.target.value)} />
				<button onClick={handleFilter}>Filtrele</button>
			</div>

			<h2>Kitaplar</h2>
			<p>Kitap sayısı: {data && data.books.length}</p>
			<button>
				<Link to="/book/add">Kitap Ekle</Link>
			</button>
			<button>
				<Link to="/recommend-books">Kitap Öner</Link>
			</button>

			<p>Bulunan Kitaplar:</p>
			<ul>
				{filteredBooks.map((book) => (
					<li key={book.id} style={{ marginBottom: '20px' }}>
						<Link to={`/book/${book.id}`}>
							<span>Kitap adı: {book.title}</span>
							<span>Yazar: {book.author}</span>
							<span>Yayın yılı: {book.publicationYear}</span>
							<span>Tür: {book.genre}</span>
						</Link>
					</li>
				))}
			</ul>

			<p>Tüm Kitaplar:</p>
			{data && (
				<ul>
					{data.books.map((book) => (
						<li key={book.id} style={{ marginBottom: '20px' }}>
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
		</>
	)
}

export default Home
