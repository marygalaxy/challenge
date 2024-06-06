import { test, expect } from '@playwright/test';
import axios from 'axios';

test('User can log in and see the list of products with data', async ({ page }) => {
  // Get users list from file
  const usersResponse = await axios.get('https://dummyjson.com/users');
  const users = usersResponse.data.users;

  // Select random user
  const randomUser = users[Math.floor(Math.random() * users.length)];

  // Go to login page
  await page.goto('http://localhost:3000/', { timeout: 1000 });

  // Enter username and password and press btn "Login"
  await page.fill('#username', randomUser.username);
  await page.fill('#password', randomUser.password);
  await page.click('button[type="submit"]');

  // Check that user is on product list page
  await page.waitForURL('http://localhost:3000/dashboard.html', { timeout: 1000 });

   // Check that product list page contains table with products
   await page.waitForSelector('#product-list table', { timeout: 1000 });
});
