import { test, expect } from '@playwright/test'

test('user can register successfully', async ({ page }) => {
  await page.goto('/register')

  await page.getByTestId('registration-email-input').fill('newuser@test.com')
  await page.getByTestId('registration-password-input').fill('StrongPass123!')
  await page.getByTestId('registration-password-repeat-input').fill('StrongPass123!')

  await page.getByTestId('registration-submit-button').click()

  await expect(page.getByText('Registration successful')).toBeVisible()
})