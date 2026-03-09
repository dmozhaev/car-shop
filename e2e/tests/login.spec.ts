import { test, expect } from '@playwright/test'

test('user can login', async ({ page }) => {

  await page.goto('/login')

  await page.getByLabel('Email').fill('seller@test.com')
  await page.getByLabel('Password').fill('StrongPass123!')

  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page.getByText('Login successful')).toBeVisible()
})