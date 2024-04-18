/* eslint-disable react/jsx-no-constructed-context-values */
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '../contexts/index.jsx'
import useAuth from '../hooks/index.jsx'
import routes from '../routes/routes.js'
import ChatPage from './ChatPage.jsx'
import ErrorPage from './ErrorPage.jsx'
import Header from './Header.jsx'
import LoginPage from './LoginPage.jsx'
import SignUpPage from './SignUpPage.jsx'

const AuthProvider = ({ children }) => {
	const currentUser = JSON.parse(localStorage.getItem('userId'))
	const [loggedIn, setLoggedIn] = useState(
		currentUser ? { username: currentUser.username } : null
	)

	const logIn = loginData => {
		localStorage.setItem('userId', JSON.stringify(loginData))
		setLoggedIn(true)
	}
	const logOut = () => {
		localStorage.removeItem('userId')
		setLoggedIn(false)
	}
	const getToken = () => {
		const userData = JSON.parse(localStorage.getItem('userId'))

		return userData?.token ? userData.token : {}
	}

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				loggedIn,
				logIn,
				logOut,
				getToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

const PrivateRoute = ({ children }) => {
	const auth = useAuth()
	const location = useLocation()

	return auth.loggedIn ? (
		children
	) : (
		<Navigate to={routes.login()} state={{ from: location }} />
	)
}

const App = () => (
	<AuthProvider>
		<BrowserRouter>
			<div className='d-flex flex-column h-100'>
				<Header />
				<Routes>
					<Route path='*' element={<ErrorPage />} />
					<Route path={routes.signup()} element={<SignUpPage />} />
					<Route
						path={routes.main()}
						element={
							<PrivateRoute>
								<ChatPage />
							</PrivateRoute>
						}
					/>
					<Route path={routes.login()} element={<LoginPage />} />
				</Routes>
				<ToastContainer />
			</div>
		</BrowserRouter>
	</AuthProvider>
)

export default App
