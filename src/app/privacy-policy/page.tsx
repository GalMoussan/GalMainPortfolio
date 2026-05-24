import { LegalPageLayout } from '@/components/layout/LegalPageLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Gal Moussan',
  description: 'Privacy policy for galmoussan.com - how we handle your data',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="May 24, 2026">
      <h2>Introduction</h2>
      <p>
        This privacy policy describes how Gal Moussan (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;) collects, uses, and protects
        your personal information when you visit galmoussan.com (the &quot;Site&quot;). This is a personal portfolio
        website showcasing my work as a fullstack developer based in Tel Aviv, Israel.
      </p>
      <p>
        This Site is informational only — there are no user accounts, no e-commerce transactions, and no
        paid services offered.
      </p>

      <h2>What Data Is Collected</h2>

      <h3>Email Communications</h3>
      <p>
        When you contact me via the <code>mailto:galmoussan@gmail.com</code> link, your email address and
        the content of your message are stored in my personal Gmail account. This is necessary to respond
        to your inquiry.
      </p>

      <h3>Technical Data (Server Logs)</h3>
      <p>
        The Site is hosted on Vercel. Vercel automatically collects standard server log data, including:
      </p>
      <ul>
        <li>Your IP address</li>
        <li>Browser type and version</li>
        <li>Device information</li>
        <li>Pages you visit on the Site</li>
        <li>Date and time of access</li>
        <li>Referring website (if applicable)</li>
      </ul>
      <p>
        This data is collected to operate, secure, and improve the Site&apos;s performance. Vercel&apos;s data
        handling is governed by their{' '}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </p>

      <h3>Analytics Data</h3>
      <p>
        The Site uses <strong>Vercel Analytics</strong> (privacy-friendly analytics) to understand visitor
        behavior and improve content. Vercel Analytics collects:
      </p>
      <ul>
        <li>Page views and navigation paths</li>
        <li>Scroll depth percentages (25%, 50%, 75%, 100%)</li>
        <li>Anonymized visitor metrics (no personally identifiable information)</li>
      </ul>
      <p>
        Vercel Analytics <strong>does not use cookies</strong> and does not track individuals across
        websites. See Vercel&apos;s{' '}
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
        Analytics only load when you give consent via the cookie banner (see{' '}
        <Link href="/cookie-policy">Cookie Policy</Link> for details).
      </p>

      <h2>How Data Is Used</h2>
      <p>I use your data solely to:</p>
      <ul>
        <li>Respond to your email inquiries</li>
        <li>Operate and secure the Site</li>
        <li>Understand how visitors use the Site and improve content</li>
      </ul>
      <p>
        I <strong>do not</strong> use your data for marketing, profiling, or automated decision-making. I{' '}
        <strong>do not sell or share</strong> your personal information with third parties, except as
        described in the &quot;Third Parties&quot; section below.
      </p>

      <h2>Third Parties</h2>
      <p>Your data may be processed by the following third-party services:</p>
      <ul>
        <li>
          <strong>Vercel</strong> (hosting provider) — processes server logs and analytics data. See
          Vercel&apos;s{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </li>
        <li>
          <strong>Google/Gmail</strong> (email service) — stores email correspondence. See Google&apos;s{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </li>
      </ul>
      <p>
        Each service operates under its own privacy policy. I have no control over how they handle your
        data beyond the services they provide to me.
      </p>

      <h2>Data Retention</h2>
      <ul>
        <li>
          <strong>Email correspondence:</strong> Kept as long as relevant to our communication (typically
          indefinitely, unless you request deletion).
        </li>
        <li>
          <strong>Server logs:</strong> Retained according to Vercel&apos;s standard log retention policy.
        </li>
        <li>
          <strong>Analytics data:</strong> Anonymized and aggregated; no individual visitor records are
          stored.
        </li>
      </ul>

      <h2>Your Rights</h2>

      <h3>GDPR (EU/EEA Visitors)</h3>
      <p>
        If you are located in the European Union or European Economic Area, you have the following rights
        under the General Data Protection Regulation (GDPR):
      </p>
      <ul>
        <li>
          <strong>Right of access:</strong> Request a copy of the personal data I hold about you.
        </li>
        <li>
          <strong>Right to rectification:</strong> Request correction of inaccurate data.
        </li>
        <li>
          <strong>Right to erasure (&quot;right to be forgotten&quot;):</strong> Request deletion of your
          personal data.
        </li>
        <li>
          <strong>Right to data portability:</strong> Receive your data in a structured, commonly used
          format.
        </li>
        <li>
          <strong>Right to object:</strong> Object to processing of your data.
        </li>
      </ul>
      <p>
        To exercise any of these rights, contact me at{' '}
        <a href="mailto:galmoussan@gmail.com">galmoussan@gmail.com</a>.
      </p>

      <h3>CCPA / CPRA (California Residents)</h3>
      <p>
        If you are a California resident, you have the following rights under the California Consumer
        Privacy Act (CCPA) and California Privacy Rights Act (CPRA):
      </p>
      <ul>
        <li>
          <strong>Right to know:</strong> Request disclosure of the personal information I collect, use,
          disclose, or sell.
        </li>
        <li>
          <strong>Right to delete:</strong> Request deletion of your personal information.
        </li>
        <li>
          <strong>Right to opt-out of sale:</strong> I do not sell personal information, so this right is
          not applicable.
        </li>
      </ul>
      <p>
        To exercise these rights, contact me at{' '}
        <a href="mailto:galmoussan@gmail.com">galmoussan@gmail.com</a>.
      </p>

      <h3>Israeli PDPL (Israeli Residents)</h3>
      <p>
        If you are located in Israel, you have the right to review and correct any personal data I hold
        about you under the Israeli Protection of Privacy Law (PDPL), 1981. As the site owner is based in
        Israel, Israeli privacy law applies.
      </p>
      <p>
        To exercise this right, contact me at{' '}
        <a href="mailto:galmoussan@gmail.com">galmoussan@gmail.com</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        The Site uses cookies and similar technologies for essential functionality and analytics. For
        detailed information, see the <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        For any privacy-related questions or requests, contact me at{' '}
        <a href="mailto:galmoussan@gmail.com">galmoussan@gmail.com</a>.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        I may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of
        this page reflects the most recent version. Continued use of the Site after changes constitutes
        acceptance of the updated policy.
      </p>
    </LegalPageLayout>
  );
}
