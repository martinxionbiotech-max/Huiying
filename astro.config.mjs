// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://carfilterspro.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // P0-5: P320510 near-duplicate SKU page de-duplicated — old slug redirects to the
  // canonical richer record (air-filter-03-42776-010), which lists P320510 as a cross-reference.
  redirects: {
    '/products/air-filter/air-filter-p320510': '/products/air-filter/air-filter-03-42776-010',
  },
});
