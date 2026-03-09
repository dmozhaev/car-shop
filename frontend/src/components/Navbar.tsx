import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link as RouterLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={{ width: '100%' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }} component={RouterLink} to="/">
          Car Shop
        </Typography>

        <Box>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>

          <Button color="inherit" component={RouterLink} to="/register">
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
