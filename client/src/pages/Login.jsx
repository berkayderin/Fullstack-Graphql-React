import { gql, useMutation } from '@apollo/client'

import { Input } from '@nextui-org/react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LOGIN_USER = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password)
	}
`

const Login = () => {
	const [isVisible, setIsVisible] = useState(false)
	const toggleVisibility = () => setIsVisible(!isVisible)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [login] = useMutation(LOGIN_USER)
	const { login: contextLogin } = useAuth()

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const { data } = await login({ variables: { username, password } })
			if (data.login) {
				contextLogin({ username })
				navigate('/home') // Kullanıcıyı ana sayfaya yönlendir
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="login-forms">
			<h1 className="login-h1">Giriş Yap</h1>
			<form className="login-form" onSubmit={handleSubmit}>
				<input
					className=""
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="E-posta"
				/>
				<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Şifre" />
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Login
