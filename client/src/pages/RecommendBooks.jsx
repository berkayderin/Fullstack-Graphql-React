import { useEffect, useState } from 'react'

import { GET_BOOKS } from '../graphql/query'
import { useQuery } from '@apollo/client'

const RecommendBooks = () => {
	const { loading, error, data } = useQuery(GET_BOOKS)
	const [recommendedBook, setRecommendedBook] = useState(null)

	useEffect(() => {
		if (data && data.books.length > 0) {
			const randomBook = data.books[Math.floor(Math.random() * data.books.length)]
			setRecommendedBook(randomBook)
		}
	}, [data])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>

	return (
		<div>
			<h1>Önerilen Kitap</h1>
			{recommendedBook && (
				<div>
					<p>Kitap Adı: {recommendedBook.title}</p>
					<p>Yazar: {recommendedBook.author}</p>
					<p>Yayın Yılı: {recommendedBook.publicationYear}</p>
					<p>Tür: {recommendedBook.genre}</p>
				</div>
			)}
		</div>
	)
}

export default RecommendBooks
