// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Expose dev server outside the container
  server: { host: true },

  vite: {
    plugins: [tailwindcss()]
  }
});