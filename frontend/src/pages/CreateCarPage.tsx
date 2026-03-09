import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { carSchema } from '../schemas/carSchemas'
import type { CarFormData } from '../schemas/carSchemas'

import { createCar } from '../api/rest'

import { useSnackbar } from '../components/useSnackbar'
import { useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function CreateCarPage() {
  const navigate = useNavigate()
  const { showSnackbar, SnackbarComponent } = useSnackbar()

  const { register, handleSubmit } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
  })

  const onSubmit = async (data: CarFormData) => {
    try {
      await createCar(data)

      showSnackbar('Car created successfully', 'success')

      setTimeout(() => navigate('/'), 800)
    } catch {
      showSnackbar('Failed to create car', 'error')
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h4">Create Car</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Year"
            type="number"
            fullWidth
            margin="normal"
            {...register('year', { valueAsNumber: true })}
            inputProps={{ 'data-testid': 'create-car-year-input' }}
          />

          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            {...register('price', { valueAsNumber: true })}
            inputProps={{ 'data-testid': 'create-car-price-input' }}
          />

          <TextField
            label="Make ID"
            type="number"
            fullWidth
            margin="normal"
            {...register('make', { valueAsNumber: true })}
            inputProps={{ 'data-testid': 'create-car-make-input' }}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 3 }}
            data-testid="create-car-submit-button"
          >
            Create Car
          </Button>
        </form>
      </Paper>

      {SnackbarComponent}
    </Container>
  )
}
