import { test, expect } from "@playwright/test"

test("seller can create car", async ({ page }) => {

  await page.goto("/login")

  await page.getByTestId('login-email-input').fill('seller@test.com')
  await page.getByTestId('login-password-input').fill('StrongPass123!')

  await page.getByTestId('login-submit-button').click()
  await page.waitForURL('/')
  await expect(page).toHaveURL('/')

  await page.getByTestId('navbar-create-car-button').click()

  await page.waitForURL('/cars/create')
  await page.getByTestId("create-car-year-input").fill("2022")
  await page.getByTestId("create-car-price-input").fill("20000")

  await expect(page.getByTestId("create-car-make-select")).toBeVisible()
  await page.getByTestId("create-car-make-select").click()
  const option = page.getByTestId("create-car-make-option-1")
  await expect(option).toBeVisible()
  await option.click()

  await page.getByTestId("create-car-mileage-input").fill("12345")

  await page.getByTestId('create-car-submit-button').click()

  await page.waitForURL('/')
  await expect(page).toHaveURL('/')
})