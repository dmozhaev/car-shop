import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { carSchema } from '../schemas/carSchemas'
import type { CarFormData } from '../schemas/carSchemas'

import { createCar } from '../api/rest'

import { useSnackbar } from '../hooks/useSnackbar'
import { useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useEffect, useState } from 'react'
import { getMakes } from '../api/rest'

export default function CreateCarPage() {
  const navigate = useNavigate()
  const { showSnackbar, SnackbarComponent } = useSnackbar()
  const [makes, setMakes] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    const loadMakes = async () => {
      const data = await getMakes()
      setMakes(data)
    }
    loadMakes()
  }, [])

  const { register, handleSubmit } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
  })

  const onSubmit = async (data: CarFormData) => {
    try {
      await createCar(data)

      showSnackbar('Car created successfully', 'success')

      setTimeout(() => navigate('/'), 500)
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

          <FormControl fullWidth margin="normal">
            <InputLabel>Make</InputLabel>
            <Select
              label="Make"
              defaultValue=""
              {...register('make', { valueAsNumber: true })}
              data-testid="create-car-make-select"
            >
              {makes.map((make) => (
                <MenuItem
                  key={make.id}
                  value={make.id}
                  data-testid={`create-car-make-option-${make.id}`}
                >
                  {make.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Mileage"
            type="number"
            fullWidth
            margin="normal"
            {...register('mileage', { valueAsNumber: true })}
            inputProps={{ 'data-testid': 'create-car-mileage-input' }}
          />

          <TextField
            label="Fuel Type"
            fullWidth
            margin="normal"
            {...register('fuel_type')}
            inputProps={{ 'data-testid': 'create-car-fuel-type-input' }}
          />

          <TextField
            label="Transmission"
            fullWidth
            margin="normal"
            {...register('transmission')}
            inputProps={{ 'data-testid': 'create-car-transmission-input' }}
          />

          <TextField
            label="Color"
            fullWidth
            margin="normal"
            {...register('color')}
            inputProps={{ 'data-testid': 'create-car-color-input' }}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            {...register('description')}
            inputProps={{ 'data-testid': 'create-car-description-input' }}
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
