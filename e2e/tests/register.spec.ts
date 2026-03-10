import { test, expect } from '@playwright/test'

function randomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length)
}

test('user can register successfully', async ({ page }) => {
  await page.goto('/register')

  const email = `user_${randomString()}@test.com`
  const password = `StrongPass_${randomString(10)}!`

  await page.getByTestId('registration-email-input').fill(email)
  await page.getByTestId('registration-password-input').fill(password)
  await page.getByTestId('registration-password-repeat-input').fill(password)

  await page.getByTestId('registration-submit-button').click()

  await page.waitForURL('/')
  await expect(page).toHaveURL('/')
})