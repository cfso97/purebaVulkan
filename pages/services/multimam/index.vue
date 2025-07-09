<template>
  <div class="multi-mam-page gap-general" >
    <!-- <PreloaderPage /> -->
    <BannerVulkan 
      class="max-img"
      logo-src="/images/multi_mam/banner-multimam-logo.svg"
      :logo-alt="$t('multiman.banner.alticon')"
      logoImageWidth="331"
      logoImageHeight="58"
      :title="$t('multiman.banner.title')"
      :description="$t('multiman.banner.description')"
      main-image-src="/images/multi_mam/banner-multimam-main.png"
      :main-image-alt="$t('multiman.banner.altimg')"
      mainImageWidthDesk="854"
      mainImageHeightDesk="569"
      :style="backbanner"
    />
    <LazyDoForYouMAM
      class="margin-top"
      :title2="'multiman.do-for-you.title'"
      :cards="cards"
      :paragraphs="[]"
      imageSrc="/images/multi_mam/MultiMAM-image-2.png"
      :image-alt="$t('multiman.do-for-you.altimg')"
      ImageWidth="476"
      ImageHeight="373"
      :style="degrade"
    />
    <div class="margin-general forms form-vulkan" :style="bakckform" >
      <div  class="cont-general">
        <div class="descript">
          <img src="/images/vulkan_bridge/vulkan-logo.svg" :alt="$t('menu.altlogo')" height="71px" width="306px" loading="lazy"/>
          <h2>{{ $t("home.vulkan_form.title") }}</h2>
          <p class="body-4">{{ $t("home.vulkan_form.descript-title") }}</p>
        </div>
        <div class="cont_general_form">
          <div class="cont_form">
            <div class="descript-cont">
              <p class="body-2-bold">{{ $t("home.vulkan_form.subtitle") }}</p>
            </div>    
            <LazyFormVulkan />
          </div> 
        </div>
      </div>
    </div>
    <LazyInvestment
      :label="'multiman.invest.title'"
      :imgBannerGradient="'/images/multi_mam/MultiMAM-footer-background.jpg'"
      :cont_descript2="true"
      :text_descript2_keys="['multiman.invest.textdescriprtInvest2']"
    />
  </div>
</template>

<!-- Config just SEO -->
<script setup>
import { ref } from 'vue';
import BannerVulkan from "~/components/vulkan_bridge/BannerVulkan.vue";
import LazyDoForYouMAM from "~/components/multi_mam/DoForYouMAM.vue";
import LazyFormVulkan from "~/components/vulkan_bridge/FormVulkan.vue";
import LazyInvestment from "~/components/Investment.vue";

import { useSeoMeta } from "#app";
import { useI18n } from "vue-i18n";
import { useImage } from '#imports'; 

const nuxtImg = useImage();
const { t, locale } = useI18n();
const { $regulationsVar } = useNuxtApp();
const regulation = ref($regulationsVar.getRegulation(locale.value));
const title = t("seo.multimam.title");
const description = t("seo.multimam.description");
const imgSeo = 'https://www.vulkanbrokersolutions.com/images/seo/Vulkan-Broker-Solutions-Link-preview.jpg'

useSeoMeta({
  title: title,
  ogTitle: title,
  twitterTitle: title,
  description: description,
  ogDescription: description,
  twitterDescription: description,
  ogImage: imgSeo,
  twitterImage: imgSeo
});

const back2ImageUrl = '/images/multi_mam/banner-multimam-bg-mobile.jpg';
const back1ImageUrl = '/images/multi_mam/banner-multimam-bg.jpg';
const degradadeImageUrl = '/images/multi_mam/MultiMAM-gradient.png';

// Genera URLs optimizadas desde nuxtImg antes del computed
const backImageUrl2 = nuxtImg(back2ImageUrl , {
  quality: 75,
  format: 'webp',
});
const backImageUrl = nuxtImg(back1ImageUrl, {
  quality: 75,
  format: 'webp',
});
const optimizedDegrade = nuxtImg(degradadeImageUrl, {
  quality: 80,
  format: 'webp',
});

// Computed para estilos CSS
const backbanner = computed(() => {
  return {
    '--back2': `url('${backImageUrl2}')`,
    '--back': `url('${backImageUrl}')`,
  };
});

const degrade = computed(() => {
  return {
    '--degrade': `url('${optimizedDegrade}')`,
  };
});

const desktopImageUrl = '/images/home/Home-form-BG.jpg';
const mobileImageUrl = '/images/home/Home-form-mobile-BG.jpg';

const bakckform = computed(() => {
  
  const optimizedDesktopUrl = nuxtImg(desktopImageUrl, {
    quality: 80,
    format: 'webp',
  });

  const optimizedMobileUrl = nuxtImg(mobileImageUrl, {
    quality: 80,
    format: 'webp',
  });

  return {
    backgroundImage: `url('${optimizedDesktopUrl}')`,
    '--bg-mobile': `url('${optimizedMobileUrl}')`,
  };
});

const cards = [
  {
    icon: "graph_2",
    description1: t("multiman.do-for-you.description-1"),
  },
  {
    icon: "overview",
    description1: t("multiman.do-for-you.description-2"),
  },
  {
    icon: "cycle",
    description1: t("multiman.do-for-you.description-3"),
  },
  {
    icon: "verified_user",
    description1: t("multiman.do-for-you.description-4"),
  },
];

</script>

<style lang="scss">
@import '~/assets/scss/pages/multi_mam.scss';
</style>
