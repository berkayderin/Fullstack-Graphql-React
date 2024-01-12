import { Link, useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'

import { useState } from 'react'

const REGISTER_USER = gql`
	mutation Register($username: String!, $password: String!) {
		register(username: $username, password: $password) {
			id
			username
		}
	}
`

const Register = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [register] = useMutation(REGISTER_USER)

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await register({ variables: { username, password } })
			navigate('/login')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="register-forms">
			<h1 className="register-h1">Kayıt Ol</h1>
			<form onSubmit={handleSubmit} className="register-form">
				<input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="E-posta" />
				<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Şifre" />
				<button type="submit" className="register-form button">
					Kayıt Ol
				</button>
			</form>
			<Link to="/login">
				<span style={{ fontSize: '0.7rem' }}>Kayıtlı mısın ? Giriş Yap</span>
			</Link>
		</div>
	)
}

export default Register
