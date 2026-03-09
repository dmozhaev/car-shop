import { useEffect, useState } from 'react'
import { getCars } from '../api/rest'
import { type Car } from '../types/car'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    const loadCars = async () => {
      const data = await getCars()
      setCars(data)
    }

    loadCars()
  }, [])

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {cars.map((car, index) => (
          <Grid item xs={12} md={4} key={car.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{car.price} EUR</Typography>

                <Typography>Year: {car.year}</Typography>

                <Typography>Seller: {car.seller}</Typography>
              </CardContent>

              <CardActions>
                <Button
                  component={Link}
                  to={`/cars/${car.id}`}
                  data-testid={`view-car-button-${index}`}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
