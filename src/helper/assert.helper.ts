import { Page, expect } from '@playwright/test';

export async function ElementToHaveText(
  page: Page,
  locator: string,
  value: string,
) {
  const checkBox = page.locator(locator);

  await expect(checkBox).toHaveText(value);
}
