import { test, expect } from '@playwright/test';

test.describe('Store Application E2E', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Smoke Test: App loads and header is visible', async ({ page }) => {
        await expect(page.getByText('My Shop')).toBeVisible();
    });

    test('i18n Test: Switch language to Hebrew', async ({ page }) => {
        await expect(page.getByText('My Shop')).toBeVisible();

        const languageSwitcher = page.getByTestId('language-switcher');
        await languageSwitcher.getByText('HE').click();

        await expect(page.getByText('החנות שלי')).toBeVisible();

        const html = page.locator('html');
        await expect(html).toHaveAttribute('dir', 'rtl');
    });

    test('Navigation Flow: Products List to Details', async ({ page }) => {
        await page.getByRole('link', { name: 'Products' }).click();

        const firstRow = page.getByTestId('product-row').first();
        await expect(firstRow).toBeVisible();

        await firstRow.getByRole('link').first().click();

        await expect(page).toHaveURL(/\/products\/\d+/);

        await expect(page.getByTestId('product-title')).toBeVisible();
    });

    test('Theme Switcher: Toggle Light/Dark theme', async ({ page }) => {
        const themeLink = page.locator('#theme-link');

        await expect(themeLink).toHaveAttribute('href', /lara-light-cyan/);

        await page.getByTestId('theme-switcher').click();

        await expect(themeLink).toHaveAttribute('href', /lara-dark-cyan/);
    });

    test('Visual Regression Test: Home Page', async ({ page }) => {
        await expect(page.getByText('My Shop')).toBeVisible();

        await expect(page).toHaveScreenshot('home-page.png');
    });

});
