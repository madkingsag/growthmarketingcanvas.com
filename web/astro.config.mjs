// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Expose dev server outside the container
  server: { host: true },

  // Public site URL (used for canonical URLs, sitemaps, etc.)
  site: 'https://www.growthmarketingcanvas.com',

  vite: {
    plugins: [tailwindcss()]
  }
});