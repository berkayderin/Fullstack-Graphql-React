import { Navigate, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
	const { user } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [user, navigate])

	if (!user) {
		return <Navigate to="/login" replace />
	}

	return <>{children}</>
}

export default ProtectedRoute
