import { useEffect, useState } from 'react'
import { getCars } from '../api/rest'
import { type Car } from '../types/car'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

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
        {cars.map((car) => (
          <Grid item xs={12} md={4} key={car.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {car.make} {car.year}
                </Typography>

                <Typography>Price: ${car.price}</Typography>

                {car.mileage && <Typography>Mileage: {car.mileage} km</Typography>}

                {car.fuel_type && <Typography>Fuel: {car.fuel_type}</Typography>}

                {car.transmission && <Typography>Transmission: {car.transmission}</Typography>}

                {car.color && <Typography>Color: {car.color}</Typography>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
