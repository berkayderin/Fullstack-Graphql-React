import { gql, useMutation } from '@apollo/client'

import { useNavigate } from 'react-router-dom'
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
		<form onSubmit={handleSubmit}>
			<input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
			<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
			<button type="submit">Register</button>
		</form>
	)
}

export default Register
