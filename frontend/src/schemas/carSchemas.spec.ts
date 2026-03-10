import { describe, it, expect } from 'vitest'

import { carSchema } from './carSchemas'

describe('carSchema', () => {
  it('validates correct car data', () => {
    const result = carSchema.safeParse({
      year: 2022,
      price: 20000,
      make: 1,
      mileage: 50000,
      fuel_type: 'petrol',
      transmission: 'manual',
      color: 'red',
      description: 'Nice car',
    })

    expect(result.success).toBe(true)
  })

  it('fails when year is too small', () => {
    const result = carSchema.safeParse({
      year: 1800,
      price: 20000,
      make: 1,
    })

    expect(result.success).toBe(false)
  })

  it('fails when price is negative', () => {
    const result = carSchema.safeParse({
      year: 2022,
      price: -100,
      make: 1,
    })

    expect(result.success).toBe(false)
  })

  it('fails when make is missing', () => {
    const result = carSchema.safeParse({
      year: 2022,
      price: 20000,
    })

    expect(result.success).toBe(false)
  })
})
