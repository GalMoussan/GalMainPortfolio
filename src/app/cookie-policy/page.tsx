import { LegalPageLayout } from '@/components/layout/LegalPageLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy | Gal Moussan',
  description: 'Cookie policy for galmoussan.com - how we use cookies',
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="May 24, 2026">
      <h2>What Are Cookies</h2>
      <p>
        Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you
        visit a website. They allow the website to recognize your device and remember information about
        your visit, such as your preferences or login status.
      </p>

      <h2>Cookies Used on This Site</h2>
      <p>This Site uses the following types of cookies:</p>

      <table>
        <thead>
          <tr>
            <th>Name / Type</th>
            <th>Purpose</th>
            <th>Duration</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>cookie-consent</code>
            </td>
            <td>Stores your cookie consent choice (accepted or declined)</td>
            <td>Persistent (localStorage)</td>
            <td>Essential</td>
          </tr>
          <tr>
            <td>Vercel Analytics</td>
            <td>
              Privacy-friendly analytics to track page views, navigation, and scroll depth. Does not use
              traditional cookies; relies on cookieless tracking.
            </td>
            <td>Session-based</td>
            <td>Analytics (non-essential)</td>
          </tr>
          <tr>
            <td>Vercel CDN / Hosting</td>
            <td>
              Essential cookies for serving content, session handling, and security. Set automatically by
              the hosting provider.
            </td>
            <td>Session-based or short-term</td>
            <td>Essential</td>
          </tr>
        </tbody>
      </table>

      <h3>Essential Cookies</h3>
      <p>
        Essential cookies are necessary for the Site to function properly. These include cookies set by
        Vercel (the hosting provider) for CDN routing, security, and session management, as well as the{' '}
        <code>cookie-consent</code> cookie that stores your consent choice.
      </p>
      <p>
        <strong>Essential cookies do not require consent</strong> and are loaded automatically.
      </p>

      <h3>Analytics Cookies (Non-Essential)</h3>
      <p>
        <strong>Vercel Analytics</strong> is a privacy-friendly analytics service that helps me understand
        how visitors use the Site. It tracks:
      </p>
      <ul>
        <li>Page views and navigation paths</li>
        <li>Scroll depth (25%, 50%, 75%, 100%)</li>
        <li>Anonymized visitor metrics (no personally identifiable information)</li>
      </ul>
      <p>
        Vercel Analytics <strong>does not use traditional tracking cookies</strong> that follow you across
        websites. It uses a cookieless, privacy-first approach. See Vercel&apos;s{' '}
        <a
          href="https://vercel.com/docs/analytics/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Analytics Privacy Policy
        </a>{' '}
        for details.
      </p>
      <p>
        <strong>
          Analytics scripts only load if you accept cookies via the consent banner on your first visit.
        </strong>{' '}
        If you decline, analytics will not load.
      </p>

      <h2>Managing Cookies</h2>

      <h3>Via the Cookie Consent Banner</h3>
      <p>
        On your first visit to the Site, you will see a cookie consent banner asking you to accept or
        decline non-essential cookies (analytics). Your choice is stored in your browser&apos;s local storage.
      </p>
      <p>
        To change your consent decision, clear your browser&apos;s local storage or site data for galmoussan.com
        and reload the page. The banner will appear again.
      </p>

      <h3>Via Browser Settings</h3>
      <p>
        Most web browsers allow you to control cookies through their settings. You can configure your
        browser to:
      </p>
      <ul>
        <li>Block all cookies</li>
        <li>Block third-party cookies only</li>
        <li>Clear cookies when you close the browser</li>
        <li>Notify you when a cookie is set</li>
      </ul>
      <p>Learn how to manage cookies in common browsers:</p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>
      <p>
        <strong>Note:</strong> Blocking essential cookies may prevent the Site from functioning correctly.
      </p>

      <h2>Consent</h2>
      <p>
        By using this Site, you consent to the use of essential cookies necessary for the Site to
        function.
      </p>
      <p>
        For non-essential cookies (analytics), your explicit consent is requested via the cookie banner
        before any analytics scripts are loaded. If you decline, analytics will not run.
      </p>

      <h2>More Information</h2>
      <p>
        For more details on how your data is used, see the{' '}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <p>
        For questions about this Cookie Policy, contact me at{' '}
        <a href="mailto:galmoussan@gmail.com">galmoussan@gmail.com</a>.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        I may update this Cookie Policy from time to time. The &quot;Last updated&quot; date at the top of this
        page reflects the most recent version.
      </p>
    </LegalPageLayout>
  );
}
