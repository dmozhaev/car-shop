import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getCar, buyCar } from '../api/rest'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { type CarFormData } from '../schemas/carSchemas'
import { useSnackbar } from '../components/useSnackbar'

export default function CarDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showSnackbar, SnackbarComponent } = useSnackbar()

  const [car, setCar] = useState<CarFormData>()
  const [name, setName] = useState('')

  useEffect(() => {
    const load = async () => {
      const data = await getCar(Number(id))
      setCar(data)
    }

    load()
  }, [id])

  const handleBuy = async () => {
    try {
      await buyCar(Number(id), name)

      showSnackbar('Car purchased successfully', 'success')

      setTimeout(() => navigate('/'), 800)
    } catch {
      showSnackbar('Failed to purchase a car', 'error')
    }
  }

  if (!car) return null

  return (
    <Container>
      <Typography variant="h4">
        {car.make} {car.year}
      </Typography>

      <Typography>Price: ${car.price}</Typography>

      <Typography>Seller: {car.seller}</Typography>

      <Typography>{car.description}</Typography>

      <TextField
        label="Buyer Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{ 'data-testid': 'buy-name-input' }}
      />

      <Button variant="contained" onClick={handleBuy} data-testid="buy-submit-button">
        Buy
      </Button>

      {SnackbarComponent}
    </Container>
  )
}
