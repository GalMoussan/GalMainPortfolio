import { test, expect } from '@playwright/test';

test.describe('Portfolio Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the home page with hero content', async ({ page }) => {
    await expect(page.getByText('Hi, my name is')).toBeVisible();
    await expect(page.getByText('Brittany Chiang.')).toBeVisible();
    await expect(page.getByText('I build things for the web.')).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Experience' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Work' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('should have Resume button in nav', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Resume' })).toBeVisible();
  });

  test('should display About section', async ({ page }) => {
    await expect(page.getByText('About Me')).toBeVisible();
  });

  test('should display Experience section with tabs', async ({ page }) => {
    const section = page.locator('#jobs');
    await expect(section).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Upstatement' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Apple' })).toBeVisible();
  });

  test('should switch experience tabs', async ({ page }) => {
    await page.getByRole('tab', { name: 'Apple' }).click();
    await expect(page.getByText('UI Engineer Co-op')).toBeVisible();
    await expect(page.getByText('July - December 2017')).toBeVisible();
  });

  test('should display Featured Projects section', async ({ page }) => {
    await expect(page.getByText('Some Things I\'ve Built')).toBeVisible();
    await expect(page.getByText('Halcyon Theme')).toBeVisible();
  });

  test('should display Noteworthy Projects section', async ({ page }) => {
    await expect(page.getByText('Other Noteworthy Projects')).toBeVisible();
  });

  test('should display Contact section', async ({ page }) => {
    await expect(page.getByText('Get In Touch')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Say Hello' })).toBeVisible();
  });

  test('should have social sidebar links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'GitHub' }).first()).toBeVisible();
  });

  test('should have email sidebar', async ({ page }) => {
    await expect(page.getByText('brittany.chiang@gmail.com')).toBeVisible();
  });

  test('should have footer', async ({ page }) => {
    await expect(page.getByText('Designed & Built by Brittany Chiang')).toBeVisible();
  });
});

test.describe('Archive Page', () => {
  test('should load the archive page', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
    await expect(page.getByText('Halcyon Theme')).toBeVisible();
  });

  test('should have back link to home', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.getByRole('link', { name: '← Back' })).toBeVisible();
  });
});
