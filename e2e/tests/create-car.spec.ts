import { test, expect } from "@playwright/test"

test("seller can create car", async ({ page }) => {

  await page.goto("/login")

  await page.getByTestId('login-email-input').fill('seller@test.com')
  await page.getByTestId('login-password-input').fill('StrongPass123!')

  await page.getByTestId('login-submit-button').click()

  await page.getByTestId('navbar-create-car-button').click()

  await page.getByTestId("create-car-year-input").fill("2022")
  await page.getByTestId("create-car-price-input").fill("20000")
  await page.getByTestId("create-car-make-input").fill("1")

  await page.getByTestId('create-car-submit-button').click()

  await expect(page.getByText("Car created successfully")).toBeVisible()
})