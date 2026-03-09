import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { RegisterFormData } from '../schemas/authSchemas'
import { registerSchema } from '../schemas/authSchemas'
import { registerSeller } from '../api/rest'

import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function RegisterPage() {
  const [successOpen, setSuccessOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerSeller(data)

      setSuccessOpen(true)
      setErrorMessage(null)
    } catch (err: unknown) {
      console.error(err)

      if (err.email) {
        setError('email', {
          type: 'server',
          message: err.email[0],
        })
      }

      if (err.password) {
        setError('password', {
          type: 'server',
          message: err.password[0],
        })
      }

      if (err.non_field_errors) {
        setErrorMessage(err.non_field_errors[0])
      } else if (typeof err === 'object') {
        setErrorMessage('Registration failed')
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

      <Snackbar open={successOpen} autoHideDuration={4000} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success" variant="filled">
          Registration successful!
        </Alert>
      </Snackbar>

      <Snackbar open={!!errorMessage} autoHideDuration={4000} onClose={() => setErrorMessage(null)}>
        <Alert severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}
