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
		<div>
			<h1>{book.title}</h1>
			<p>Yazar: {book.author}</p>
			<p>Yayın Yılı: {book.publicationYear}</p>
			<p>Tür: {book.genre}</p>

			<button onClick={() => navigate('/home')}>Anasayfa</button>
			<button onClick={() => navigate(`/book/${id}/update`)}>Güncelle</button>
			<button onClick={handleDelete}>Sil</button>
		</div>
	)
}

export default Book
