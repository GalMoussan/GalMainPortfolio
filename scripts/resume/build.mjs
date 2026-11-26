// Renders scripts/resume/resume.html to public/resume.pdf (A4, selectable text).
// Usage: npm run resume:build  (needs `npx playwright install chromium` once)
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const template = new URL('./resume.html', import.meta.url);
const output = fileURLToPath(new URL('../../public/resume.pdf', import.meta.url));

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(template.href, { waitUntil: 'load' });
  const overflow = await page.evaluate(() => document.body.scrollHeight - document.body.clientHeight);
  if (overflow > 0) throw new Error(`Resume overflows one A4 page by ${overflow}px; tighten the copy or spacing.`);
  await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log(`wrote ${output}`);
} finally {
  await browser.close();
}
