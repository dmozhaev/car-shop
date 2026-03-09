import { test, expect } from "@playwright/test"

test("cars are visible on homepage", async ({ page }) => {

  await page.goto("/")

  await expect(page.locator("body")).toContainText("Toyota")
})