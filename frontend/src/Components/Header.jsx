import { Button, Container, Navbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/index.jsx'
import routes from '../routes/routes.js'

const Header = () => {
	const { t } = useTranslation()
	const auth = useAuth()

	const handleLogOut = () => {
		auth.logOut()
	}

	return (
		<Navbar expand='lg' variant='light' className='shadow-sm bg-white'>
			<Container>
				<Navbar.Brand as={Link} to={routes.main()}>
					{t('nav.logo')}
				</Navbar.Brand>
				{auth.loggedIn && (
					<Button type='primary' onClick={handleLogOut}>
						{t('nav.exit')}
					</Button>
				)}
			</Container>
		</Navbar>
	)
}

export default Header
