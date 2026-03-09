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

export default function RegisterPage() {
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
      alert('Registration successful')
    } catch (err) {
      console.error(err)
      alert('Registration failed')
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 6, p: 4, mx: 'auto' }}>
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
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Repeat Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password_repeat')}
            error={!!errors.password_repeat}
            helperText={errors.password_repeat?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
