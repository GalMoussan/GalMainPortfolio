import { test, expect } from '@playwright/test';

test.describe('AI Integration Landing Page', () => {
  test('page loads successfully', async ({ page }) => {
    await page.goto('/ai-integration');
    await expect(page).toHaveTitle(/AI Integration Services/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('displays hero section with correct content', async ({ page }) => {
    await page.goto('/ai-integration');
    await expect(page.locator('text=While your competitors buy Zapier workflows')).toBeVisible();
    await expect(page.locator('text=you get an AI workforce')).toBeVisible();
  });

  test('scenario tab switching works', async ({ page }) => {
    await page.goto('/ai-integration');

    // Wait for demo component to load
    await page.waitForSelector('text=Lead handling');

    // Click second tab
    await page.click('text=Customer support');
    await expect(page.locator('text=Ticket chaos')).toBeVisible();

    // Click third tab
    await page.click('text=Data entry');
    await expect(page.locator('text=Manual sync hell')).toBeVisible();
  });

  test('slider drag interaction works', async ({ page }) => {
    await page.goto('/ai-integration');

    // Wait for demo component
    await page.waitForSelector('[role="slider"]');

    const slider = page.locator('[role="slider"]');
    await expect(slider).toBeVisible();

    // Get slider bounding box
    const sliderBox = await slider.boundingBox();
    if (!sliderBox) throw new Error('Slider not found');

    // Drag slider to the left
    await page.mouse.move(sliderBox.x + sliderBox.width / 2, sliderBox.y + sliderBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(sliderBox.x + 20, sliderBox.y + sliderBox.height / 2);
    await page.mouse.up();

    // Verify slider moved (aria-valuenow should have changed)
    const ariaValue = await slider.getAttribute('aria-valuenow');
    expect(Number(ariaValue)).toBeLessThan(40);
  });

  test('FAQ accordion expand/collapse works', async ({ page }) => {
    await page.goto('/ai-integration');

    // Scroll to FAQ section
    await page.locator('#faq').scrollIntoViewIfNeeded();

    // Find first FAQ question
    const firstQuestion = page.locator('button:has-text("How do I know if my workflow")').first();
    await expect(firstQuestion).toBeVisible();

    // Answer should not be visible initially
    await expect(page.locator('text=Good candidates have these patterns')).not.toBeVisible();

    // Click to expand
    await firstQuestion.click();
    await expect(page.locator('text=Good candidates have these patterns')).toBeVisible();

    // Click again to collapse
    await firstQuestion.click();
    await expect(page.locator('text=Good candidates have these patterns')).not.toBeVisible();
  });

  test('CTA buttons open correct target', async ({ page, context }) => {
    await page.goto('/ai-integration');

    // Listen for new page/tab
    const pagePromise = context.waitForEvent('page');

    // Click primary CTA in hero
    const ctaButton = page.locator('button:has-text("Book free 30-min diagnostic")');
    await ctaButton.click();

    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    // Should open WhatsApp (or Cal.com if configured)
    const url = newPage.url();
    expect(url).toMatch(/wa\.me|cal\.com/);
  });

  test('form validation works', async ({ page }) => {
    await page.goto('/ai-integration');

    // Scroll to Coming Soon section
    await page.locator('#coming-soon').scrollIntoViewIfNeeded();

    const emailInput = page.locator('input[type="email"]');
    const submitButton = page.locator('button:has-text("Get early access")');

    // Try submitting with invalid email
    await emailInput.fill('invalid-email');
    await submitButton.click();

    // Should show validation error
    await expect(page.locator('text=valid email')).toBeVisible({ timeout: 3000 });
  });

  test('form submission shows success state', async ({ page }) => {
    await page.goto('/ai-integration');

    // Scroll to Coming Soon section
    await page.locator('#coming-soon').scrollIntoViewIfNeeded();

    const emailInput = page.locator('input[type="email"]');
    const submitButton = page.locator('button:has-text("Get early access")');

    // Submit with valid email
    await emailInput.fill('test@example.com');
    await submitButton.click();

    // Should show success message
    await expect(page.locator('text=You\'re on the list')).toBeVisible({ timeout: 5000 });
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/ai-integration');

    // Click "How it works" nav link
    await page.click('a:has-text("How it works")');

    // Should scroll to process section
    await page.waitForTimeout(500); // Wait for smooth scroll
    const processSection = page.locator('#how-it-works');
    await expect(processSection).toBeInViewport();
  });

  test('vertical variation - unknown slug returns 404', async ({ page }) => {
    const response = await page.goto('/ai-integration/for-unknown-vertical');
    expect(response?.status()).toBe(404);
  });

  test('pricing displays dual currency (USD + ILS)', async ({ page }) => {
    await page.goto('/ai-integration');

    // Scroll to services section
    await page.locator('#what-i-build').scrollIntoViewIfNeeded();

    // Check for USD pricing
    await expect(page.locator('text=$1,000')).toBeVisible();

    // Check for ILS pricing
    await expect(page.locator('text=₪3,500 ILS')).toBeVisible();
  });

  test('mobile menu works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/ai-integration');

    // Hamburger should be visible
    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await expect(hamburger).toBeVisible();

    // Menu should not be visible initially
    await expect(page.locator('text=Book free call').nth(1)).not.toBeVisible();

    // Click hamburger
    await hamburger.click();

    // Menu should appear
    await expect(page.locator('text=Book free call').nth(1)).toBeVisible();

    // Click link and menu should close
    await page.click('text=FAQ');
    await expect(page.locator('text=Book free call').nth(1)).not.toBeVisible();
  });
});
