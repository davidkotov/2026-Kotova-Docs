// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// docs.kotova.io — see PLAN.md for the reasoning behind every choice here.
export default defineConfig({
  site: 'https://docs.kotova.io',
  // Clean URLs without a trailing slash, matching kotova.io (/terms/privacy, not
  // /terms/privacy/). Pagefind's result links are normalised to match.
  trailingSlash: 'never',
  build: { format: 'file' },

  integrations: [
    starlight({
      title: 'Kotova Docs',
      description:
        'Documentation for Kotova X — the non-custodial swap aggregator. How it works, how to use it, and how to report a security issue.',
      // Kotova is dark-only; the theme toggle is overridden away below.
      // `head` additions load the two brand typefaces.
      head: [
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap',
          },
        },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#0A0F1C' } },
      ],

      // Decision Q3: English ships now; all six locales are wired from day one so
      // translations land incrementally. Missing pages fall back to English with a
      // notice rather than 404ing.
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        de: { label: 'Deutsch', lang: 'de' },
        it: { label: 'Italiano', lang: 'it' },
        es: { label: 'Español', lang: 'es' },
        fr: { label: 'Français', lang: 'fr' },
        ru: { label: 'Русский', lang: 'ru' },
      },

      // Kotova chrome replaces Starlight's. Header carries the navbar from
      // kotova.io/services (brand → DOCS, no Services link, no currency switcher,
      // search added). ThemeSelect renders nothing — dark only.
      components: {
        Header: './src/components/Header.astro',
        Footer: './src/components/Footer.astro',
        ThemeSelect: './src/components/Empty.astro',
        SocialIcons: './src/components/Empty.astro',
      },

      customCss: ['./src/styles/tokens.css', './src/styles/kotova.css'],

      // Right-hand rail lists h2 + h3 (PLAN.md §4).
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },

      pagination: true,
      lastUpdated: false,
      credits: false,

      sidebar: [
        { label: 'Welcome', link: '/' },
        {
          label: 'Introduction',
          items: [
            { label: 'What is Kotova X', link: '/introduction/what-is-kotova-x' },
            { label: 'The aggregator model', link: '/introduction/aggregator-model' },
            { label: 'Non-custodial architecture', link: '/introduction/non-custodial' },
            { label: 'Product status and roadmap', link: '/introduction/status' },
          ],
        },
        {
          label: 'How It Works',
          items: [
            { label: 'Quoting and routing', link: '/how-it-works/quoting-and-routing' },
            { label: 'The order lifecycle', link: '/how-it-works/order-lifecycle' },
            { label: 'Fees', link: '/how-it-works/fees' },
            { label: 'Refunds and emergencies', link: '/how-it-works/refunds' },
            { label: 'Liquidity sources', link: '/how-it-works/liquidity-sources' },
          ],
        },
        {
          label: 'Security and Trust',
          items: [
            { label: 'Security overview', link: '/security/overview' },
            { label: 'Counterparty and freeze risk', link: '/security/counterparty-risk' },
            { label: 'DEX-only mode', link: '/security/dex-only-mode' },
            { label: 'Privacy and data retention', link: '/security/privacy' },
            { label: 'Bug bounty', link: '/security/bug-bounty' },
          ],
        },
        {
          label: 'Help',
          items: [
            { label: 'Troubleshooting', link: '/help/troubleshooting' },
            { label: 'Contact support', link: '/help/contact' },
          ],
        },
        {
          label: 'Elsewhere',
          items: [
            { label: 'Launch app', link: 'https://app.kotova.io/', attrs: { target: '_blank' } },
            { label: 'Terms of Service', link: 'https://kotova.io/terms/', attrs: { target: '_blank' } },
            { label: 'Privacy Policy', link: 'https://kotova.io/terms/privacy', attrs: { target: '_blank' } },
            { label: 'Brand assets', link: 'https://kotova.io/press/brand-assets', attrs: { target: '_blank' } },
          ],
        },
      ],
    }),
  ],
});
