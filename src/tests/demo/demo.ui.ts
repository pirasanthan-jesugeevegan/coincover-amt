import { test } from '@playwright/test';
import { goToHomePage, clickCheckbox } from '../../helper/action.helper';
import { ElementToHaveText } from '../../helper/assert.helper';

test.describe('navigation @demo', () => {
  test('checkbox should have been clicked', async ({ page }) => {
    //Given the user navigates to the home page
    await goToHomePage(page);
    //When the user clicks on the checkbox
    await clickCheckbox(page);
    //Then the text field should have 'Thanks for checking the box'
    await ElementToHaveText(
      page,
      '#checkbox-info-display',
      'Thanks for checking the box',
    );
  });
});
