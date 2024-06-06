import { test, expect } from '@playwright/test';
import axios from 'axios';

test('User can log in, see the list of products, and log out', async ({ page }) => {
  // Get users list from file
  const usersResponse = await axios.get('https://dummyjson.com/users');
  const users = usersResponse.data.users;

  // Select random user
  const randomUser = users[Math.floor(Math.random() * users.length)];

  // Go to login page
  await page.goto('http://localhost:3000/', { timeout: 3000 });

  // Enter username and password and press btn "Login"
  await page.fill('#username', randomUser.username);
  await page.fill('#password', randomUser.password);
  await page.click('button[type="submit"]');

  // Check that user is on the product list page
  await page.waitForURL('http://localhost:3000/dashboard.html', { timeout: 3000 });

  // Check that user sees table with products
  await page.waitForSelector('#product-list table', { timeout: 3000 });

  // Press btn "Logout"
  await page.click('#logout-button');

  // Check that user is redirected to login page
  await page.waitForURL('http://localhost:3000/index.html', { timeout: 3000 });

  // Check that user sees login form
  const loginForm = await page.$('#login-form');
  expect(loginForm).not.toBeNull();
});