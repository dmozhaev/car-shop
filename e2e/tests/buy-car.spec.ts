import { test, expect } from "@playwright/test"

test("user can buy a car", async ({ page }) => {

  await page.goto("/")

  await page.getByTestId("view-car-button-0").first().click()

  await page.getByTestId("buy-name-input").fill("John Buyer")

  await page.getByTestId('buy-submit-button').click()

  await expect(
    page.getByText("Car purchased successfully")
  ).toBeVisible()

  await page.waitForURL("/")

})