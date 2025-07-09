<template>
  <div class="communi-traders-page gap-general">
    <!-- <PreloaderPage /> -->
    <BannerPages
      :title="'communitraders.banner.title'"
      :descriptions="[
        $t('communitraders.banner.description'),
      ]"
      img="/images/communi_traders/CommuniTraders-hero-image.png"
      :alt="$t('communitraders.banner.altimg')"
      mainImageWidthDesk="710"
      mainImageHeightDesk="430"
      iconSrc="/images/communi_traders/CommuniTraders-logo.svg"  
      :iconAlt="$t('communitraders.banner.alticon')" 
      logoImageWidth="321"
      logoImageHeight="56"
      :style="backbanner"
    />
    <LazyDoForYouMAM
      class="margin-top"
      :title2="'communitraders.do-for-you.title'"
      :cards="cards"
      :paragraphs="[]"
      imageSrc="/images/communi_traders/CommuniTraders-image-2.png"
      :image-alt="$t('communitraders.do-for-you.altimg')"
      ImageWidth="482"
      ImageHeight="372"
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
      :label="'communitraders.invest.title'"
      :imgBannerGradient="'/images/communi_traders/CommuniTraders-footer-background.jpg'"
      :cont_descript="true"
      :text_descript="'communitraders.invest.textdescriprtInvest'"
      :cont_descript2="true"
      :text_descript2_keys="['communitraders.invest.textdescriprtInvest2']"
    />
  </div>
</template>

<script setup>
// import PreloaderPage from "~/components/PreloaderPage.vue";
import BannerPages from "~/components/BannerPages.vue";
import LazyDoForYouMAM from "~/components/multi_mam/DoForYouMAM.vue";
import LazyFormVulkan from "~/components/vulkan_bridge/FormVulkan.vue";
import LazyInvestment from "~/components/Investment.vue";

import { useSeoMeta } from "#app";
import { useI18n } from "vue-i18n";
import { useImage } from '#imports'; 

const nuxtImg = useImage();
const { t } = useI18n();
const title = t("seo.communitraders.title");
const description = t("seo.communitraders.description");
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

const back2ImageUrl = '/images/communi_traders/CommuniTraders-hero-background-mobile.jpg';
const back1ImageUrl = '/images/communi_traders/CommuniTraders-hero-background.jpg';
const degradadeImageUrl = '/images/communi_traders/CommuniTraders-Gradient.png';

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
    icon: "trophy",
    description1: t("communitraders.do-for-you.description-1"),
  },
  {
    icon: "add_reaction",
    description1: t("communitraders.do-for-you.description-2"),
  },
  {
    icon: "cycle",
    description1: t("communitraders.do-for-you.description-3"),
  },
  {
    icon: "devices",
    description1: t("communitraders.do-for-you.description-4"),
  },
];
</script>

<style lang="scss">
@import '~/assets/scss/pages/communi_traders.scss';
</style>
