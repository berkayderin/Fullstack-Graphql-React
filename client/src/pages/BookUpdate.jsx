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
		console.log(formData) 
		try {
			const updatedFormData = {
				...formData,
				publicationYear: parseInt(formData.publicationYear)
			};
	
			await updateBook({ variables: { id, ...updatedFormData } });
			navigate(`/book/${id}`);
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
		<div className="kitap-guncelle">
			<div className="kitap-guncelle-container">
				<h1 className="form-title">Kitabı Güncelle</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="kitap-guncelle-form">
					<input {...register('title')} placeholder="Başlık" className="form-input" />

					<input {...register('author')} placeholder="Yazar" className="form-input" />

					<input type="number" {...register('publicationYear')} placeholder="Yayın Yılı" className="form-input" />
					<input {...register('genre')} placeholder="Tür" className="form-input" />

					<button type="submit" className="form-button">
						Güncelle
					</button>
					<button onClick={() => navigate(`/book/${id}`)} className="form-button">
						Geri Gel
					</button>
				</form>
			</div>
		</div>
	)
}

export default BookUpdate
