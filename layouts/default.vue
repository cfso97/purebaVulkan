<template>
  <div>
    <!-- <PreloaderPage /> -->
    <Navbar />
    <NavbarMobile />
    <Transition name="fade" mode="out-in">
      <div key="$route.fullPath">
        <NuxtPage />
      </div>
    </Transition>
    <LazyFooter />
  </div>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta, useRoute, useRouter } from "#imports";
import { useI18n } from "vue-i18n";
import { computed, watch } from "vue";
import { usePageSchema } from "~/utils/schemas";

const { locale, t, defaultLocale } = useI18n(); // Las llamadas a hooks se hacen aquí
const route = useRoute(); // Las llamadas a hooks se hacen aquí
const router = useRouter();
const localePath = useLocalePath()
const baseUrl = "https://www.vulkanbrokersolutions.com";

// Pasa 't', 'locale' y 'route' a usePageSchema
const schema = computed(() => usePageSchema(t, locale, route)); // CAMBIO AQUÍ

// Códigos de idioma habilitados
const alternateLanguages = ['en', 'es'] as const;

// Obtener path sin prefijo de idioma
const strippedPath = computed(() => {
   return route.fullPath.replace(/^\/[a-z]{2}(-[a-z]{2})?(?=\/|$)/, '') || '/'
})

// 🔁 Canonical URL generator
const getCanonicalUrl = (path: string) => {
  const cleanPath = path.replace(/^\/[a-z]{2}(-[a-z]{2})?(?=\/|$)/, '') || '/'
  return locale.value === defaultLocale
    ? `${baseUrl}${cleanPath}`
    : `${baseUrl}/${locale.value}${cleanPath}`
}

const alternateLinks = computed(() => {
  return alternateLanguages.map(lang => {
    const localizedPath = localePath(strippedPath.value, lang)
    return {
      rel: 'alternate',
      hreflang: lang,
      href: `${baseUrl}${localizedPath}`
    }
  })
})

// 👀 Observa cambios de ruta y actualiza el <head>
watch(() => route.fullPath, (newPath) => {
  const canonical = getCanonicalUrl(newPath);

  useHead({
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:site_name", content: "Tradeview Markets" },
      { property: "og:image", content: "https://www.vulkanbrokersolutions.com/images/seo/01Home.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Tradeview_" },
      { name: "twitter:creator", content: "@Tradeview_" },
      { name: "twitter:image", content: "https://www.vulkanbrokersolutions.com/images/seo/01Home.jpg" },
      {
        key: 'og-url',
        property: "og:url",
        content: canonical,
      },
    ],
    link: [
      {
        key: 'icon',
        rel: "icon",
        type: "image/x-icon",
        href: "/vulkan.ico",
      },
      {
        key: 'canonical',
        rel: "canonical",
        href: canonical,
      },
      {
        key: 'alternate-x-default',
        rel: "alternate",
        hreflang: 'x-default',
        href: `${baseUrl}${localePath(strippedPath.value, 'es')}`,
      },
      ...alternateLinks.value.map((link, index) => ({
        ...link,
        key: `alternate-${link.hreflang}-${index}`
      }))
    ],
    htmlAttrs: {
      lang: locale.value,
    },
    script: [
      {
        key: 'ld-json',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema.value)
      }
    ]
  });
}, { immediate: true });

// Redirección con slash al final en /faq
router.beforeEach((to) => {
  if (!to.path.endsWith('/') && to.path.match(/\/faq\/[^/]+$/)) {
    return { path: `${to.path}/` };
  }
});

// Configurar el comportamiento de desplazamiento
router.options.scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return { el: to.hash, behavior: 'smooth' };
  }
  return { top: 0, behavior: 'smooth' };
};
</script>

<style>
@media (max-width: 1000px) {
  .desktop {
    display: none !important;
  }
}

/* Estilos para la transición fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

</style>