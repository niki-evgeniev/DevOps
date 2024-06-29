const { test, expect } = require('@playwright/test');

test('Check header', async ({ page }) => {
    await page.goto('http://localhost:8080'); 
    const homeLink = await page.$('body > header > a:nth-child(1)');
    const text = await homeLink.textContent();
    expect(text).toBe('Home');
  });
  