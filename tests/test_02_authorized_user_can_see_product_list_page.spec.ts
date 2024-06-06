import { test, expect } from '@playwright/test';
import axios from 'axios';

test('Authorized user can see the list of products with non-empty rows', async ({ page }) => {
  // Get list of users from file
  const usersResponse = await axios.get('https://dummyjson.com/users');
  const users = usersResponse.data.users;

  // Select random user
  const randomUser = users[Math.floor(Math.random() * users.length)];

  // Go to login page
  await page.goto('http://localhost:3000/', { timeout: 3000 });

  // Enter username and password of random user and press btn "Login"
  await page.fill('#username', randomUser.username);
  await page.fill('#password', randomUser.password);
  await page.click('button[type="submit"]');

  // Check that user navigated to product list page
  await page.waitForURL('http://localhost:3000/dashboard.html', { timeout: 3000 });

  // Check that user sees table with products
  await page.waitForSelector('#product-list table', { timeout: 3000 });

  // Check that table contains at least one row
  const productRows = await page.$$('table tbody tr');
  expect(productRows.length).toBeGreaterThan(0);
});
