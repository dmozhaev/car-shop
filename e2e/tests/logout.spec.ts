import { test, expect } from '@playwright/test'

test('user can logout', async ({ page }) => {

  await page.goto('/login')

  await page.getByTestId('login-email-input').fill('seller@test.com')
  await page.getByTestId('login-password-input').fill('StrongPass123!')

  await page.getByTestId('login-submit-button').click()
  await page.waitForURL('/')

  await page.getByTestId('navbar-logout-button').click()

  await expect(page.getByTestId('navbar-login-button')).toBeVisible()
  await expect(page).toHaveURL('/')
})