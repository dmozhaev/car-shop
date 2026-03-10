import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export default function Navbar() {
  const navigate = useNavigate()
  const { logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <AppBar position="fixed" sx={{ width: '100%' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }} component={Link} to="/">
          Car Shop
        </Typography>

        {isAuthenticated ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/cars/create"
              data-testid="navbar-create-car-button"
            >
              Add Car
            </Button>

            <Button color="inherit" onClick={handleLogout} data-testid="navbar-logout-button">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login" data-testid="navbar-login-button">
              Login
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/register"
              data-testid="navbar-register-button"
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
