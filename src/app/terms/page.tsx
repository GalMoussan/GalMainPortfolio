import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export const metadata = {
  title: 'Terms of Use | Gal Moussan',
  description: 'Terms of use for galmoussan.com',
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Use" lastUpdated="November 26, 2026">
      <h2>Acceptance of Terms</h2>
      <p>
        By accessing and using galmoussan.com (the &quot;Site&quot;), you accept and agree to be bound by these
        Terms of Use. If you do not agree to these terms, please do not use the Site.
      </p>

      <h2>Nature of the Site</h2>
      <p>
        This Site is the personal portfolio of Gal Moussan, a fullstack developer and AI integration specialist based
        in Israel. It showcases projects, skills and contact information, and describes the services I offer.
      </p>
      <p>
        No purchases are made through this Site and there are no user accounts. Any engagement for services is agreed
        directly between you and me, under separate terms.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this Site — including text, project descriptions, images, code snippets, design,
        layout, and any downloadable materials (such as a resume PDF) — is the intellectual property of
        Gal Moussan and is protected by copyright law.
      </p>
      <p>You may not:</p>
      <ul>
        <li>Scrape, copy, reproduce, or redistribute Site content without written permission.</li>
        <li>
          Use automated tools to extract data from the Site (including but not limited to web scrapers,
          crawlers, or bots not explicitly permitted by robots.txt).
        </li>
        <li>
          Modify, create derivative works from, or reverse-engineer any part of the Site or its content.
        </li>
      </ul>
      <p>
        If you wish to use any content from this Site, contact me at{' '}
        <a href="mailto:galmoussan@gmail.com">galmoussan@gmail.com</a> to request permission.
      </p>

      <h2>Portfolio Projects Disclaimer</h2>
      <p>
        Projects showcased on this Site are <strong>portfolio demonstrations</strong> of technical capabilities,
        presented for showcase and educational purposes.
      </p>
      <p>
        <strong>Important:</strong> Any deployment or use of such projects in a production environment is
        subject to the respective third-party platform terms of service, including but not limited to:
      </p>
      <ul>
        <li>WhatsApp Business API Terms</li>
        <li>X (formerly Twitter) API Terms and Developer Agreement</li>
        <li>OpenAI, Anthropic, or other AI provider terms</li>
        <li>Any other third-party service or API utilized by the project</li>
      </ul>
      <p>
        Descriptions of these projects <strong>do not constitute endorsement of, or encouragement to
        violate</strong>, any third party&apos;s terms of service. Users are solely responsible for ensuring their
        use of any tools, techniques, or concepts presented complies with all applicable laws and
        third-party agreements.
      </p>
      <p>
        Techniques such as web scraping, API automation, or data extraction are shown for educational
        purposes. I do not encourage or condone the use of these techniques in violation of website terms
        of service, robots.txt files, or applicable laws.
      </p>

      <h2>No Warranties</h2>
      <p>
        This Site and all information on it are provided <strong>&quot;as is&quot;</strong> without warranties of
        any kind, either express or implied, including but not limited to warranties of accuracy,
        completeness, fitness for a particular purpose, or non-infringement.
      </p>
      <p>
        I make no guarantee that the information on this Site is up-to-date, complete, or error-free. The
        Site may be updated, modified, or discontinued at any time without notice.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Gal Moussan shall not be liable for any direct, indirect,
        incidental, consequential, or punitive damages arising from:
      </p>
      <ul>
        <li>Your use of or inability to use the Site</li>
        <li>Any errors, omissions, or inaccuracies in the Site content</li>
        <li>Any reliance you place on information found on the Site</li>
        <li>Any unauthorized access to or use of the Site</li>
      </ul>
      <p>
        This includes damages arising from the use of portfolio project descriptions, code samples, or
        technical approaches demonstrated on the Site.
      </p>

      <h2>External Links</h2>
      <p>
        The Site contains links to external websites, including but not limited to GitHub, LinkedIn, WhatsApp, the
        websites of past and current employers, and live project deployments. These links are provided for your
        convenience.
      </p>
      <p>
        I have no control over the content or practices of third-party websites and am not responsible
        for:
      </p>
      <ul>
        <li>The content, accuracy, or legality of external sites</li>
        <li>The privacy practices or terms of service of external sites</li>
        <li>Any damages or losses arising from your use of external sites</li>
      </ul>
      <p>
        Visiting external links is at your own risk. You should review the terms and privacy policies of
        any third-party site you visit.
      </p>

      <h2>Governing Law and Jurisdiction</h2>
      <p>
        These Terms of Use are governed by the laws of the <strong>State of Israel</strong>, without
        regard to its conflict of law principles.
      </p>
      <p>
        Any disputes arising from or relating to these Terms or your use of the Site shall be subject to the
        exclusive jurisdiction of the competent courts in <strong>Israel</strong>.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        I reserve the right to update or modify these Terms of Use at any time. The &quot;Last updated&quot; date
        at the top of this page reflects the most recent version.
      </p>
      <p>
        Continued use of the Site after changes are posted constitutes your acceptance of the revised
        terms.
      </p>

      <h2>Contact</h2>
      <p>
        For questions or concerns about these Terms of Use, contact me at{' '}
        <a href="mailto:galmoussan@gmail.com">galmoussan@gmail.com</a>.
      </p>
    </LegalPageLayout>
  );
}
