import { useMutation, useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import { GET_BOOK } from '../graphql/query'
import { UPDATE_BOOK } from '../graphql/mutation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const BookUpdate = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { loading, error, data } = useQuery(GET_BOOK, { variables: { id } })
	const [updateBook] = useMutation(UPDATE_BOOK)

	const {
		register,
		handleSubmit,
		getValues,
		trigger,
		control,
		reset,
		methods,
		setValue,
		formState,
		watch,
		formState: { errors, isDirty }
	} = useForm({ mode: 'onChange' })

	const onSubmit = async (formData) => {
		console.log(formData) // Form verilerini logla
		try {
			await updateBook({ variables: { id, ...formData } })
			navigate(`/book/${id}`)
		} catch (error) {
			console.error('Güncelleme işlemi başarısız', error)
		}
	}

	useEffect(() => {
		if (data && data.book) {
			const fields = ['title', 'author', 'publicationYear', 'genre']
			fields.forEach((field) => setValue(field, data.book[field]))
		}
	}, [data, setValue])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>

	return (
		<div>
			<h1>Kitabı Güncelle</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register('title')} placeholder="Başlık" />

				<input {...register('author')} placeholder="Yazar" />

				<input type="number" {...register('publicationYear')} placeholder="Yayın Yılı" />
				<input {...register('genre')} placeholder="Tür" />

				<button type="submit">Güncelle</button>
				<button onClick={() => navigate(`/book/${id}`)}>Geri Gel</button>
			</form>
		</div>
	)
}

export default BookUpdate
