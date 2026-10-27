// Legal / compliance content — single source for the four legal pages.
// Kept consistent with site.ts (operator, domain, contact) and the Organization JSON-LD in BaseLayout.
import { site } from './site';

export const legalEntity = {
  name: site.companyName,
  domain: site.domain,
  email: site.email,
  phone: site.phone,
  address: site.address,
  effectiveDate: 'October 27, 2026',
};

// ---------------------------------------------------------------------------
// Privacy Policy — deepened (GDPR + CCPA + retention + transfers + minors)
// ---------------------------------------------------------------------------
export const privacyPolicy = {
  title: 'Privacy Policy',
  heading: 'Privacy Policy',
  description:
    `How ${legalEntity.name} collects, uses, shares and protects personal information on ${legalEntity.domain}, including GDPR and CCPA rights.`,
  updated: '2026-10-27',
  body: `This Privacy Policy explains how **${legalEntity.name}** ("we", "our", "us"), the operator of **${legalEntity.domain}** (the "Site"), collects, uses, shares and protects personal information when you visit the Site or contact us. Please read it carefully.

## 1. Who We Are

${legalEntity.name} is a filter manufacturer and exporter located at ${legalEntity.address}. We act as the data controller for personal information collected through this Site. Our contact details are set out at the end of this policy.

## 2. Information We Collect

We collect only the information we need to respond to your enquiries and operate the Site:

- **Contact and enquiry information** that you voluntarily provide — your name, email address, phone or WhatsApp number, company name and the content of your message — when you contact us by email, WhatsApp, telephone or the enquiry form on our Contact page.
- **Usage and technical data** collected automatically by our web-server logs — internet protocol (IP) address, browser type, operating system, pages visited, and the date and time of each request.

We do **not** collect payment-card or other financial-account details through this Site, and we do not require you to create an account.

## 3. How We Use Your Information

We use the information we collect to:

- Respond to your enquiries and provide quotations;
- Prepare, negotiate and fulfil orders you place with us;
- Communicate with you about products, samples, pricing or policy changes where you have asked us to do so;
- Operate, maintain, secure and improve the Site and our services;
- Comply with applicable laws, regulations and legal processes.

## 4. Legal Bases for Processing (EEA / UK)

Where the EU or UK General Data Protection Regulation ("GDPR") applies, we process personal information on the following legal bases:

- **Consent** — where you have given clear consent for a specific purpose (for example, receiving marketing communications);
- **Performance of a contract** — to take steps at your request before entering into, and to perform, a supply contract;
- **Legitimate interests** — to respond to enquiries, operate and secure the Site, and develop our business, where those interests are not overridden by your rights and freedoms;
- **Legal obligation** — where processing is necessary to comply with the law.

## 5. Information Sharing and Disclosure

We do **not** sell, rent or trade your personal information. We share it only:

- With service providers (for example, hosting, email and logistics providers) that process data on our behalf under confidentiality obligations;
- With professional advisers (legal or accounting) where reasonably necessary;
- Where required by law, regulation, court order or a lawful government request;
- In connection with a merger, acquisition or sale of all or part of our business, subject to confidentiality.

## 6. International Data Transfers

Our business is based in the People's Republic of China. Personal information you submit may be transferred to, and processed in, countries outside the European Economic Area or the United Kingdom. Where such transfers occur, we rely on appropriate safeguards recognised under applicable law (for example, the European Commission's Standard Contractual Clauses) or on other lawful transfer mechanisms, and we take reasonable steps to ensure your information is treated securely.

## 7. Data Retention

We keep personal information only as long as necessary for the purposes described in this policy:

- **Inquiry and business-correspondence data** — up to **24 months** after our last interaction with you, unless a longer period is required by law or is needed to establish, exercise or defend against legal claims;
- **Server access logs** — up to **90 days**;
- **Marketing-communications data** — until you withdraw consent or opt out.

When information is no longer needed, we delete or anonymise it.

## 8. Security

We take reasonable technical and organisational measures to protect personal information against unauthorised access, alteration, disclosure or destruction, including encryption of data in transit (HTTPS), access to personal information restricted to personnel who need it to perform their job, and physical and logical security of our systems. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.

## 9. Your Rights (GDPR)

Where the GDPR applies, you have the following rights regarding your personal information:

1. **Right of access** — request a copy of the personal information we hold about you.
2. **Right to rectification** — ask us to correct inaccurate or incomplete information.
3. **Right to erasure** ("right to be forgotten") — ask us to delete your information in certain circumstances.
4. **Right to data portability** — receive your information in a structured, commonly used and machine-readable format, and transmit it to another controller.
5. **Right to object** — object to processing based on our legitimate interests.
6. **Right to withdraw consent** — withdraw consent at any time where processing is based on consent.
7. **Right to restriction of processing** — ask us to restrict processing in certain circumstances.
8. **Rights regarding automated decision-making** — not to be subject to a decision based solely on automated processing, including profiling, that produces legal or similarly significant effects. We do not engage in such automated decision-making.
9. **Right to lodge a complaint** — complain to a supervisory authority in your country if you believe your rights have been infringed.

To exercise any of these rights, contact us using the details below. We will respond within one month, and we may ask you to verify your identity before acting on a request.

## 10. California Privacy Rights (CCPA / CPRA)

If you are a California resident, the California Consumer Privacy Act ("CCPA"), as amended by the California Privacy Rights Act ("CPRA"), may give you additional rights.

**Categories of personal information we may have collected** in the preceding 12 months:

- **Identifiers** — name, email address, phone number and company name;
- **Commercial information** — records of products or services you have enquired about or purchased;
- **Internet or other electronic network activity** — IP address, browser type, pages visited and interactions with the Site.

**We do not sell or share your personal information.** We do not sell personal information, and we do not "share" personal information for cross-context behavioural advertising. We do not use or disclose sensitive personal information for purposes that would give rise to a right to limit.

Your California rights include:

- **Right to know** — request disclosure of the categories and specific pieces of personal information we have collected;
- **Right to delete** — request deletion of your personal information, subject to exceptions under the law;
- **Right to correct** — request correction of inaccurate personal information;
- **Right to opt out of sale or sharing** — we do not sell or share personal information, so there is nothing to opt out of, but you may still exercise this right;
- **Right to non-discrimination** — we will not discriminate against you for exercising any of these rights.

To exercise your California rights, contact us using the details below. You may designate an authorised agent to make a request on your behalf.

## 11. Children's Privacy

The Site is intended for business users and is not directed to children. We do not knowingly collect personal information from anyone under the age of **16**. If you believe a child under 16 has provided us with personal information, please contact us and we will delete it.

## 12. Cookies

We use a limited number of cookies and similar technologies to operate the Site. For details, please see our Cookie Policy at /cookies/.

## 13. Third-Party Links

The Site may contain links to third-party websites. We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies.

## 14. Changes to This Policy

We may update this Privacy Policy from time to time. The latest version, with its effective date, will always be posted on this page. Material changes will be highlighted where appropriate.

## 15. Contact Us

For any privacy-related request or question, please contact our data-protection contact:

- **Email:** ${legalEntity.email}
- **Phone:** ${legalEntity.phone}
- **Address:** ${legalEntity.address}

Effective date: ${legalEntity.effectiveDate}.`,
};

// ---------------------------------------------------------------------------
// Terms of Service
// ---------------------------------------------------------------------------
export const termsOfService = {
  title: 'Terms of Service',
  heading: 'Terms of Service',
  description:
    `The terms that govern your use of ${legalEntity.domain}, operated by ${legalEntity.name}.`,
  updated: '2026-10-27',
  body: `These Terms of Service ("Terms") govern your access to and use of **${legalEntity.domain}** (the "Site"), operated by **${legalEntity.name}** ("we", "our", "us"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.

## 1. Acceptance of Terms

By accessing or using the Site, you confirm that you have read, understood and agreed to these Terms and to our Privacy Policy. If you are using the Site on behalf of a company or other legal entity, you confirm that you have authority to bind that entity to these Terms.

## 2. About Us

${legalEntity.name} is a filter manufacturer and exporter located at ${legalEntity.address}. You can reach us using the contact details at the end of these Terms.

## 3. Scope of Licence and Permitted Use

We grant you a limited, revocable, non-exclusive, non-transferable licence to access and view the Site for your own lawful, internal business purposes — for example, to learn about our products, request a quotation, or contact us about a potential order. This licence does not transfer any ownership or grant any right to use our content for any other purpose.

## 4. Prohibited Uses

You agree not to use the Site, or any content obtained from it, to:

1. Violate any applicable law, regulation or third-party right;
2. Infringe, or assist others to infringe, our or any third party's intellectual property rights;
3. Attempt to gain unauthorised access to, interfere with, or disrupt the Site, its servers or any connected network;
4. Introduce or transmit any virus, malware or other harmful or malicious code;
5. Scrape, harvest, data-mine or otherwise systematically collect content, product data or personal information from the Site;
6. Misrepresent your identity or affiliation, or impersonate any person or entity;
7. Use the Site to transmit unsolicited or unauthorised advertising or spam;
8. Resell, redistribute, republish or commercially exploit any Site content without our prior written consent.

## 5. Intellectual Property

Unless otherwise stated, all content on the Site — including text, graphics, logos, images, product data, and the "huiying" name and trademarks — is owned by or licensed to ${legalEntity.name} and is protected by applicable intellectual-property laws. Nothing in these Terms grants you any right, title or interest in our trademarks or content. You may not use our name, logos or trademarks without our prior written consent.

## 6. User Obligations and Accuracy of Information

You agree to provide accurate, current and complete information when you contact us or request a quotation, and to keep that information up to date. You are responsible for ensuring that any information you submit does not infringe the rights of others and is not unlawful.

## 7. Enquiries Are Not Offers

Information on the Site, including product descriptions, specifications and any pricing shown, is provided for general information and is **an invitation to treat only, not a binding offer**. Your enquiry or request for quotation does not create a contract. No binding agreement is formed until we issue a written order confirmation or a formal written contract, and any order is subject to our then-current terms of sale. We may correct, change or withdraw any information on the Site at any time.

## 8. Third-Party Links

The Site may contain links to third-party websites. We do not control and are not responsible for the content, accuracy or practices of those websites, and linking does not imply endorsement.

## 9. Disclaimer of Warranties

The Site and its content are provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied, to the fullest extent permitted by law. We do not warrant that the Site will be uninterrupted, error-free or free of harmful components, or that any content is accurate, complete or current.

## 10. Limitation of Liability

To the fullest extent permitted by law, ${legalEntity.name}, its affiliates, officers, employees and agents will not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits, revenue, data or goodwill, arising out of or in connection with your use of the Site. Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law.

## 11. Indemnification

You agree to indemnify, defend and hold harmless ${legalEntity.name} and its affiliates, officers, employees and agents from and against any claims, liabilities, damages, losses and expenses (including reasonable legal fees) arising out of or in connection with your violation of these Terms or your use of the Site.

## 12. Force Majeure

Neither party will be liable for any failure or delay in performance caused by events beyond its reasonable control, including acts of God, fire, flood, natural disaster, epidemic or pandemic, war, riot, strike, labour dispute, embargo, government action, power or telecommunications failure, or interruption of transportation.

## 13. Severability

If any provision of these Terms is held to be invalid, illegal or unenforceable, that provision will be limited or removed to the minimum extent necessary, and the remaining provisions will remain in full force and effect.

## 14. Waiver

Our failure to enforce any provision of these Terms does not constitute a waiver of that provision or of the right to enforce it later. A waiver of any provision is effective only if made in writing and signed by us.

## 15. Entire Agreement

These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and us regarding your use of the Site, and supersede any prior agreements or understandings.

## 16. Governing Law

These Terms are governed by and construed in accordance with the laws of the People's Republic of China, without regard to its conflict-of-laws rules, except where mandatory local law provides otherwise. Any dispute arising out of or relating to these Terms or the Site will be subject to the exclusive jurisdiction of the competent courts, except where the law provides for a different forum.

## 17. Changes to These Terms

We may update these Terms from time to time. The latest version, with its effective date, will always be posted on this page. Your continued use of the Site after changes are posted constitutes acceptance of the revised Terms.

## 18. Contact Us

If you have any questions about these Terms, please contact us:

- **Email:** ${legalEntity.email}
- **Phone:** ${legalEntity.phone}
- **Address:** ${legalEntity.address}

Effective date: ${legalEntity.effectiveDate}.`,
};

// ---------------------------------------------------------------------------
// Disclaimer
// ---------------------------------------------------------------------------
export const disclaimer = {
  title: 'Disclaimer',
  heading: 'Disclaimer',
  description:
    `Important disclaimers about the information on ${legalEntity.domain}, including product specifications, reference pricing and industry information.`,
  updated: '2026-10-27',
  body: `This Disclaimer applies to your use of **${legalEntity.domain}** (the "Site"), operated by **${legalEntity.name}** ("we", "our", "us"). By using the Site, you accept this Disclaimer together with our Terms of Service and Privacy Policy.

## 1. General Disclaimer

The content on the Site is provided for general information only. While we make reasonable efforts to keep it accurate and up to date, we make no representation or warranty, express or implied, as to its accuracy, completeness, reliability or suitability for any purpose. You rely on the information at your own risk.

## 2. Product Information and Specifications

Product descriptions, images, dimensions and technical specifications shown on the Site are indicative and for general reference only. **Final specifications are as stated in the formal specification sheet, sample confirmation or written contract for the relevant order.** Actual products may vary in detail from what is shown on the Site, and we may change specifications without prior notice.

## 3. Pricing

Any pricing shown on the Site is for reference only and does not constitute an offer. In particular, reference price ranges such as **USD 10–60** are approximate, indicative figures only. **Actual prices are confirmed only in our formal written quotation or order confirmation**, and depend on specification, quantity, packaging, destination and other commercial terms in force at the time of ordering.

## 4. Industry and Technical Information

General industry, market and technical information on the Site is provided for background context only and is **not professional, engineering, legal or commercial advice**. You should obtain appropriate independent advice before making any purchasing or technical decision.

## 5. External Links

The Site may link to third-party websites. We do not control and are not responsible for the content, accuracy or availability of those websites, and a link does not imply endorsement.

## 6. Errors and Omissions

Despite our care, the Site may contain typographical errors, inaccuracies or omissions. We reserve the right to correct any such errors at any time without notice, and we accept no liability for reliance on inaccurate or incomplete information.

## 7. Content Updates

We may modify, update, replace or remove any content on the Site at any time without notice. We have no obligation to update information, although we aim to keep it current.

## 8. Images

Images on the Site are provided for illustrative purposes. Photographs of products, facilities and exhibitions reflect actual items and premises at the time they were taken, but final product appearance, packaging and configuration may differ. We do not use artificially generated ("AI") imagery on the Site.

## 9. No Warranty and Use at Your Own Risk

The Site and its content are provided "as is" and "as available", without warranties of any kind. To the fullest extent permitted by law, we disclaim all warranties, express or implied. Your use of the Site, and any reliance on its content, is at your own risk.

## 10. Contact Us

If you have any questions about this Disclaimer, please contact us:

- **Email:** ${legalEntity.email}
- **Phone:** ${legalEntity.phone}

Effective date: ${legalEntity.effectiveDate}.`,
};

// ---------------------------------------------------------------------------
// Cookie Policy
// ---------------------------------------------------------------------------
export const cookiePolicy = {
  title: 'Cookie Policy',
  heading: 'Cookie Policy',
  description:
    `How ${legalEntity.domain} uses cookies and similar technologies, with a clear classification of the cookies in use.`,
  updated: '2026-10-27',
  body: `This Cookie Policy explains how **${legalEntity.name}** ("we", "our", "us") uses cookies and similar technologies on **${legalEntity.domain}** (the "Site").

## 1. What Are Cookies

Cookies are small text files placed on your device when you visit a website. They help a website recognise your device and remember information about your visit. Similar technologies include local storage and other tracking pixels.

## 2. Cookies We Use

This Site is a static business website and is designed to be privacy-friendly. We do **not** use advertising or marketing cookies, and we do **not** use third-party advertising or cross-site behavioural-tracking cookies. We use only a minimal set of cookies that are strictly necessary for the Site to function.

## 3. Cookie Classification

The table below sets out the categories of cookies and similar technologies, their purpose, and whether we currently use them.

| Category | Purpose | Used on this Site |
| --- | --- | --- |
| Strictly necessary | Required for the Site to function and to enable basic features such as security and core navigation. These do not require consent. | Yes — a minimal set only |
| Analytics / performance | Used to understand how visitors use the Site (for example, which pages are visited) and to improve it. | No — not currently used |
| Functional / preference | Used to remember choices you make (such as language or region) to personalise your experience. | No — not currently used |
| Advertising / targeting | Used to deliver advertising or to track you across websites for marketing purposes. | No — never used |

## 4. Consent and Managing Cookies

Because we only use strictly necessary cookies, we do not operate a cookie-consent banner. You can still control and delete cookies through your browser settings at any time:

- **Block or delete cookies** — most browsers let you view, block or delete cookies via the privacy or settings menu;
- **Clear browsing data** — you can clear stored cookies and site data for this or any site;
- **Use private / incognito browsing** — to prevent cookies from being stored on your device.

For detailed instructions, refer to your browser's help documentation. Please note that disabling strictly necessary cookies may affect the functionality of some websites.

## 5. Third-Party Cookies

The Site does not currently set third-party advertising or tracking cookies. If the Site links to third-party websites, those websites may set their own cookies, which are governed by their own cookie policies and outside our control.

## 6. Changes to This Cookie Policy

We may update this Cookie Policy from time to time. The latest version, with its effective date, will always be posted on this page.

## 7. Contact Us

If you have any questions about this Cookie Policy, please contact us:

- **Email:** ${legalEntity.email}
- **Phone:** ${legalEntity.phone}

Effective date: ${legalEntity.effectiveDate}.`,
};
