import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../schemas/authSchemas'
import type { LoginFormData } from '../schemas/authSchemas'
import { useAuth } from '../auth/useAuth'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from '../hooks/useSnackbar'

import { loginSeller } from '../api/rest'

import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const { login } = useAuth()
  const navigate = useNavigate()
  const { showSnackbar, SnackbarComponent } = useSnackbar()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginSeller(data)

      login(result.access)

      showSnackbar('Login successful', 'success')

      setTimeout(() => navigate('/'), 500)
    } catch (err: unknown) {
      console.log(err)
      showSnackbar('Invalid email or password', 'error')
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h4">Login</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            inputProps={{ 'data-testid': 'login-email-input' }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            inputProps={{ 'data-testid': 'login-password-input' }}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 3 }}
            data-testid="login-submit-button"
          >
            Login
          </Button>
        </form>
      </Paper>

      {SnackbarComponent}
    </Container>
  )
}
