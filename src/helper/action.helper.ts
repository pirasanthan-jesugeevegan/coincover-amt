import type { Page } from '@playwright/test/types/test';

export async function goToHomePage(page: Page) {
  await page.goto('https://test.k6.io/browser.php', {
    waitUntil: 'networkidle',
  });
}

export async function clickCheckbox(page: Page) {
  await page.locator('#checkbox1').check();
}
