import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from '../components/useSnackbar'
import type { RegisterFormData } from '../schemas/authSchemas'
import { registerSchema } from '../schemas/authSchemas'
import { registerSeller } from '../api/rest'

import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { showSnackbar, SnackbarComponent } = useSnackbar()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerSeller(data)

      showSnackbar('Registration successful!', 'success')

      setTimeout(() => navigate('/'), 500)
    } catch (err: unknown) {
      if (err?.email?.length) {
        showSnackbar(err.email[0], 'error')
      } else {
        showSnackbar('Registration failed', 'error')
      }
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 6, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            inputProps={{ 'data-testid': 'registration-email-input' }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            inputProps={{ 'data-testid': 'registration-password-input' }}
          />

          <TextField
            label="Repeat Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password_repeat')}
            error={!!errors.password_repeat}
            helperText={errors.password_repeat?.message}
            inputProps={{ 'data-testid': 'registration-password-repeat-input' }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isSubmitting}
            data-testid="registration-submit-button"
          >
            Register
          </Button>
        </Box>
      </Paper>

      {SnackbarComponent}
    </Container>
  )
}
