import { test, expect } from '@playwright/test'

test('user can login', async ({ page }) => {

  await page.goto('/login')

  await page.getByTestId('login-email-input').fill('seller@test.com')
  await page.getByTestId('login-password-input').fill('StrongPass123!')

  await page.getByTestId('login-submit-button').click()
  await page.waitForURL('/')
  await expect(page).toHaveURL('/')
})