// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import { visualizer } from 'rollup-plugin-visualizer';
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  ssr: false,
  target: 'static',

  app: {
    head: {},
  },

  experimental: {
    inlineSSRStyles: false
  },

  css: ["~/assets/scss/main.scss"],

  modules: [
    "@nuxt/devtools",
    "nuxt-site-config",
    "nuxt-schema-org", 
    "@nuxtjs/i18n", 
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/google-fonts", 
    "@primevue/nuxt-module",
    "@nuxt/image"
  ],


  routeRules: {
    '/': { prerender: true }
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    },
    preset: 'netlify'
  },
  
  routeRules: {
    '/': { prerender: true }
  },


  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },

  googleFonts: {
    download: true,
    inject: true,
    display: 'swap',
    preconnect: true,
    families: {
      "Plus+Jakarta+Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
      "Tajawal": true
    }
  },

  i18n: {
    locales: [
      {code: "es", name: "Español", file: "es-ES.json"},
      {code: "en", name: "English(US)", file: "en-US.json"},
    ],
    trailingSlash: true,
    lazy: true,
    defaultLocale: "es",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  site: {
    url: "https://www.vulkanbrokersolutions.com/",
    name: "Vulkan Broker Solutions",
    trailingSlash: true,
    indexable: true,
    debug: true
  },

  sitemap: {
    hostname: "https://www.vulkanbrokersolutions.com/",
    i18n: true
  },

  plugins: [
    '~/plugins/regulationsVar.ts',
    '~/plugins/scrollBehavior.ts',
    '~/plugins/loadScripts.client.ts'
  ],

  vite: {
    css: {
      devSourcemap: true, // útil para debug de CSS en dev
      preprocessorOptions: {
        scss: {
          additionalData: `@use '~/assets/scss/globals.scss' as *;`
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          inlineDynamicImports: false // asegura que SCSS no se empaquete inline
        }
      }
    }
  },

  image: {
    // provider: 'ipx',
    formats: ['avif','webp'],
    screens: { sm: 320, md: 640, lg: 768, xl: 1024, xxl: 1280 }
  },

  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
  },

  compatibilityDate: "2025-02-05",
});