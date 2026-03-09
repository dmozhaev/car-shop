import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getCar, buyCar } from '../api/rest'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { type CarFormData } from '../schemas/carSchemas'

export default function CarDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [snackbarOpen, setSnackbarOpen] = useState(false)
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
    await buyCar(Number(id), name)

    setSnackbarOpen(true)

    setTimeout(() => {
      navigate('/')
    }, 1500)
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

      <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Car purchased successfully
        </Alert>
      </Snackbar>
    </Container>
  )
}
