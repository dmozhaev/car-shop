import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { registerSchema } from '../schemas/authSchemas'
import type { RegisterFormData } from '../schemas/authSchemas'
import { registerSeller } from '../api/rest'

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>

      <div>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input type="password" {...register('password')} placeholder="Password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <input type="password" {...register('password_repeat')} placeholder="Repeat Password" />
        {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
      </div>

      <button disabled={isSubmitting}>Register</button>
    </form>
  )
}
