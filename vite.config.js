import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

function globalHtmlInject() {
  return {
    name: 'global-html-inject',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'meta',
            attrs: { charset: 'UTF-8' },
            injectTo: 'head',
          },
          {
            tag: 'link',
            attrs: {
              rel: 'icon',
              type: 'image/svg+xml',
              href: '/icon-logo.svg',
            },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1.0',
            },
            injectTo: 'head',
          },
          {
            tag: 'link',
            attrs: { rel: 'stylesheet', href: '/global.css' },
            injectTo: 'head',
          },
          {
            tag: 'script',
            attrs: { type: 'module', src: '/header.js' },
            injectTo: 'head',
          },
          {
            tag: 'script',
            attrs: { type: 'module', src: '/footer.js' },
            injectTo: 'head',
          },
          {
            tag: 'header',
            attrs: { id: 'header' },
            children: '',
            injectTo: 'body-prepend',
          },
          {
            tag: 'footer',
            attrs: { id: 'footer' },
            children: '',
            injectTo: 'body',
          },
        ],
      };
    },
  };
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        2025: resolve(__dirname, '2025/index.html'),
      },
    },
  },
  plugins: [globalHtmlInject()],
});
