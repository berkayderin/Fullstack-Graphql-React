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
		<div>
			<h1>Yeni Kitap Ekle</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register('title', { required: true })} placeholder="Başlık" />
				{errors.title && <p>Başlık gerekli</p>}

				<input {...register('author', { required: true })} placeholder="Yazar" />
				{errors.author && <p>Yazar gerekli</p>}

				<input type="number" {...register('publicationYear')} placeholder="Yayın Yılı" />
				<input {...register('genre')} placeholder="Tür" />

				<button type="submit">Kitap Ekle</button>
			</form>
		</div>
	)
}

export default BookAdd
