// @ts-check
import { defineConfig } from 'astro/config';

// `site` is used for canonical URLs and the generated sitemap.
// When deploying to a GitHub Pages *project* page (user.github.io/repo),
// also set `base: '/repo'` and the BASE_PATH env var in the workflow.
export default defineConfig({
  site: 'https://greenmatrixsolar.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
});
