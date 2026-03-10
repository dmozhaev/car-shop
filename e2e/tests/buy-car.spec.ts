import { test, expect } from "@playwright/test"

test("user can buy a car", async ({ page }) => {

  await page.goto("/")

  await page.getByTestId("view-car-button-0").first().click()

  await page.waitForURL(/\/cars\/\d+$/)
  await page.getByTestId("buy-name-input").fill("John Buyer")

  await page.getByTestId('buy-submit-button').click()

  await page.waitForURL("/")
})