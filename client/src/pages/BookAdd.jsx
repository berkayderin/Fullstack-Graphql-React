import { ADD_BOOK } from '../graphql/mutation'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const BookAdd = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const [addBook, { data, loading, error }] = useMutation(ADD_BOOK)
	const navigate = useNavigate()

	const onSubmit = async (formData) => {
		try {
			const publicationYear = parseInt(formData.publicationYear, 10) || null
			await addBook({ variables: { ...formData, publicationYear } })
			navigate('/home')
		} catch (error) {
			console.error('Kitap ekleme işlemi başarısız', error)
		}
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>

	return (
		<div className="form">
			<div className="form-container">
				<h1 className="form-title">Yeni Kitap Ekle</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="book-form">
					<input {...register('title', { required: true })} placeholder="Başlık" className="form-input" />
					{errors.title && <p className="error-message">Başlık gerekli</p>}

					<input {...register('author', { required: true })} placeholder="Yazar" className="form-input" />
					{errors.author && <p className="error-message">Yazar gerekli</p>}

					<input type="number" {...register('publicationYear')} placeholder="Yayın Yılı" className="form-input" />
					<input {...register('genre')} placeholder="Tür" className="form-input" />

					<button type="submit" className="submit-button">
						Kitap Ekle
					</button>
				</form>
			</div>
		</div>
	)
}

export default BookAdd
