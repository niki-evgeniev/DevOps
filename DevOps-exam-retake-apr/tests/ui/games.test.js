const { test, expect } = require('@playwright/test');

test('Check games page', async ({ page }) => {
    await page.goto('http://localhost:8080/games');
    const list = await page.$('ul');
    expect(list).toBeTruthy();
  });
  