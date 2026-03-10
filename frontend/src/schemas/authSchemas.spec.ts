import { describe, it, expect } from 'vitest'

import { registerSchema, loginSchema } from './authSchemas'

describe('registerSchema', () => {
  it('validates correct data', () => {
    const result = registerSchema.safeParse({
      email: 'user@test.com',
      password: 'StrongPass123',
      password_repeat: 'StrongPass123',
    })

    expect(result.success).toBe(true)
  })

  it('fails when passwords do not match', () => {
    const result = registerSchema.safeParse({
      email: 'user@test.com',
      password: 'StrongPass123',
      password_repeat: 'WrongPass',
    })

    expect(result.success).toBe(false)
  })

  it('fails for invalid email', () => {
    const result = registerSchema.safeParse({
      email: 'invalid',
      password: 'StrongPass123',
      password_repeat: 'StrongPass123',
    })

    expect(result.success).toBe(false)
  })

  it('fails for short password', () => {
    const result = registerSchema.safeParse({
      email: 'user@test.com',
      password: 'short',
      password_repeat: 'short',
    })

    expect(result.success).toBe(false)
  })
})

describe('loginSchema', () => {
  it('validates correct login data', () => {
    const result = loginSchema.safeParse({
      email: 'user@test.com',
      password: 'password123',
    })

    expect(result.success).toBe(true)
  })

  it('fails with invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'invalid',
      password: 'password123',
    })

    expect(result.success).toBe(false)
  })

  it('fails with empty password', () => {
    const result = loginSchema.safeParse({
      email: 'user@test.com',
      password: '',
    })

    expect(result.success).toBe(false)
  })
})
