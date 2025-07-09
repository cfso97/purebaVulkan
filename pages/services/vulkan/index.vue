<template>
  <div class="vulkan-bridge-page gap-general">
    <!-- <PreloaderPage /> -->
    <BannerVulkan 
      logo-src="/images/vulkan_bridge/vulkan-logo.svg"
      :logo-alt="$t('menu.altlogo')"
      logoImageWidth="306"
      logoImageHeight="71"
      :title="$t('vulkan.banner.title')"
      :description="$t('vulkan.banner.description')"
      main-image-src="/images/vulkan_bridge/vulkan-img-1.png"
      :main-image-alt="$t('home.banner.altimg')"
      mainImageWidthDesk="764"
      mainImageHeightDesk="662"
      :style="backbanner"
    />
    <LazyDoForYouMAM
      class="margin-top img-rigth"
      :title2="'vulkan.do-for-you.title'"
      :cards="cards"
      :paragraphs="[]"
      :video-config="{
        default: {
          video: '/images/vulkan_bridge/video.mp4',
          type: 'video/mp4'
        }
      }"
      :videoAlt="$t('vulkan.do-for-you.altimg')" 
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
    <div class="cont-var-deg">
      <LazyInvestment
        class="var-white"
        :label="'vulkan.invest.title'"
        :imgBannerGradient="'/images/home/Home-footer-background.jpg'"
        :cont_descript2="true"
        :text_descript2_keys="['vulkan.invest.textdescriprtInvest2']"
      />
    </div>
  </div>
</template>

<!-- Config just SEO -->
<script setup>
import BannerVulkan from "~/components/vulkan_bridge/BannerVulkan.vue";
import LazyDoForYouMAM from "~/components/multi_mam/DoForYouMAM.vue";
import LazyFormVulkan from "~/components/vulkan_bridge/FormVulkan.vue";
import LazyInvestment from "~/components/Investment.vue";

import { useSeoMeta } from "#app";
import { useI18n } from "vue-i18n";
import { useImage } from '#imports'; 

const nuxtImg = useImage();
const { t } = useI18n();
const title = t("seo.vulkan-bridge.title");
const description = t("seo.vulkan-bridge.description");
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

const back2ImageUrl = '/images/vulkan_bridge/vulkan-background.jpg';
const back1ImageUrl = '/images/vulkan_bridge/vulkan-background.jpg';
const degradadeImageUrl = '/images/vulkan_bridge/05.Vulkan-Gradient-top.png';

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
    icon: "account_balance",
    description1: t("vulkan.do-for-you.description-1"),
  },
  {
    icon: "trending_down",
    description1: t("vulkan.do-for-you.description-2"),
  },
  {
    icon: "acute",
    description1: t("vulkan.do-for-you.description-3"),
  },
  {
    icon: "checklist_rtl",
    description1: t("vulkan.do-for-you.description-4"),
  },
];

</script>

<style lang="scss">
@import '~/assets/scss/pages/vulkan_bridge.scss';
</style>