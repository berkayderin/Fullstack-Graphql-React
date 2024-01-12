import { useMutation, useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import { DELETE_BOOK } from '../graphql/mutation'
import { GET_BOOK } from '../graphql/query'

const Book = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { loading, error, data } = useQuery(GET_BOOK, {
		variables: { id }
	})

	const [deleteBook] = useMutation(DELETE_BOOK)

	const handleDelete = async () => {
		try {
			await deleteBook({ variables: { id } })
			navigate('/home')
		} catch (error) {
			console.error('Silme işlemi başarısız', error)
		}
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>

	const book = data.book

	return (
		<div className="kitap-detay">
			<div className="book-card">
				<h1 className="book-title">{book.title}</h1>
				<p className="book-detail">Yazar: {book.author}</p>
				<p className="book-detail">Yayın Yılı: {book.publicationYear}</p>
				<p className="book-detail">Tür: {book.genre}</p>

				<button className="book-button" onClick={() => navigate('/home')}>
					Anasayfa
				</button>
				<button className="book-button" onClick={() => navigate(`/book/${id}/update`)}>
					Güncelle
				</button>
				<button className="book-button" onClick={handleDelete}>
					Sil
				</button>
			</div>
		</div>
	)
}

export default Book
