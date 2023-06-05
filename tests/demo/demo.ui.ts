import { test } from '@playwright/test';
import { goToHomePage, clickCheckbox } from '../../utils/action';
import { ElementToHaveText } from '../../utils/assert';

test('checkbox should have been clicked', async ({ page }) => {
  //Given the user navigates to the home page
  await goToHomePage(page);
  //When the user clicks on the checkbox
  await clickCheckbox(page);
  //Then the text field should have 'Thanks for checking the box'
  await ElementToHaveText(
    page,
    '#checkbox-info-display',
    'Thanks for checking the box'
  );
});
