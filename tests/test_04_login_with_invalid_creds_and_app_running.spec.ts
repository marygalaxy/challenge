import { test, expect } from '@playwright/test';

test('User cannot log in with invalid credentials and app is running', async ({ page }) => {
  // Go to login page
  await page.goto('http://localhost:3000/', { timeout: 3000 });

  // Enter invalid username and password and press btn Login
  await page.fill('#username', 'invalidUser');
  await page.fill('#password', 'invalidPassword');
  await page.click('button[type="submit"]');


  await page.waitForTimeout(3000); 

  // Check that user still on login page 
  const currentURL = page.url();
  expect(currentURL).toBe('http://localhost:3000/');

  // Check that error message is shown
  const errorMessage = await page.$('#error-message');
  expect(errorMessage).not.toBeNull();

  //Check if app is still running
  await page.goto('http://localhost:3000/', { timeout: 3000 });
});