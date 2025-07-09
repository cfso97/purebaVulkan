<template>
  <div class="langModal-container">
    <div class="lang-selector" v-for="lang in optionsLang" :key="lang.label" @click="openModal">
      <div class="selected" v-if="locale == lang.value">
        <img :src="lang.image" :alt="lang.value" width="32" height="22"/>
        <span class="body-4" style="cursor: pointer">{{ lang.label2 }}</span>
      </div>
    </div>

    <ModalCustom :isVisible="openLangModal" @close="openLangModal = false">
      <span class="title-langs body-6-bold">{{ $t("menu.selectlenguage") }}</span>
      <div class="lang-list">
        <NuxtLink 
          v-for="lang in optionsLang"
          :key="lang.label"
          :to="getRedirectPath(lang.value)"
          @click.prevent="switchLocale(lang.value)"
        >
          <img :src="lang.image" alt="" width="32" height="22"/>
          <span class="body-4">{{ lang.label }}</span>
          <span v-if="locale == lang.value" class="material-symbols-outlined" translate="no">check</span>
        </NuxtLink>
        <!-- <NuxtLink href="https://www.tradeviewmena.com/" target="blank">  
          <img src="/icons/SaudiArabia.svg" alt="" />
          <span class="body-4" style="font-family: 'Tajawal', sans-serif;">عربي</span>
        </NuxtLink> -->
      </div>

      <!-- <div class="regulations-text">
        <span class="caption-2">{{ $t("regulation.bar.authorized") }}:</span>
        <span class="caption-2 bold" style="cursor: pointer" @click="openModal">{{ $t("regulation.bar.america") }}</span>
        <a class="caption-2" target="blank" href="https://tradeview.eu/">{{ $t("regulation.bar.europe") }}</a>
      </div> -->
    </ModalCustom>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ModalCustom from '~/components/utils/modal/ModalCustom.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { locale, locales, setLocale } = useI18n()
const router = useRouter()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const openLangModal = ref(false)

const openModal = () => {
  openLangModal.value = true
}

const switchLocale = async (lang) => {
  if (process.client) {
    sessionStorage.setItem('languageSwitch', 'true')
  }

  openLangModal.value = false
  await setLocale(lang)
}

const getRedirectPath = (lang) => {
  const currentRoute = router.currentRoute.value.path
  const strippedPath = currentRoute.replace(/^\/(en|es)/, '') || '/'
  
  if (lang === 'es') {
    return strippedPath
  } else {
    return `/${lang}${strippedPath}`
  }
}

const optionsLang = [
  { label: "ESP", label2: "ESP", image: "/icons/Spain.svg", alt:"Español", value: "es" },
  { label: "ENG", label2: "ENG", image: "/icons/UnitedKingdom.svg", alt:"English", value: "en" },
  // { label: "ESP (Colombia)", label2: "ESP", image: "/icons/Colombia.svg", alt:"Español", value: "es-co" },
  // { label: "ESP (México)", label2: "ESP", image: "/icons/Mexico.svg", alt:"Español", value: "es-mx" },
  // { label: "ESP (Chile)", label2: "ESP", image: "/icons/Chile.svg", alt:"Español", value: "es-cl" },
  // { label: "ESP (Argentina)", label2: "ESP", image: "/icons/Argentina.svg", alt:"Español", value: "es-ar" },
  // { label: "ESP (Perú)", label2: "ESP", image: "/icons/Peru.svg", alt:"Español", value: "es-pe" },
  // { label: "POR (Brasil)", label2: "POR", image: "/icons/Brazil.svg", alt:"Portugués", value: "pt-br" },
  // { label: "現代語", label2: "現代語", image: "/icons/Japan3.svg", alt:"現代語", value: "ja" },
  // { label: "中文", label2: "中文", image: "/icons/China.svg", alt:"中文", value: "zh" },
  // { label: "한국어", label2: "한국어", image: "/icons/Korea.svg", alt:"한국어", value: "ko" },
]
</script>

<style lang="scss">
@import '~/assets/scss/components/LanguagesModal.scss';
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

