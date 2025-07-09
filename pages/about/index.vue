<template>
    <div class="about-page gap-general">
        <!-- <PreloaderPage /> -->
        <BannerPages
            class="max-text"
            :title="'about.banner.title'"
            :descriptions="[
                $t('about.banner.description'),
            ]"
            img="/images/about/Nosotros-hero-image.png"
            :alt="$t('about.banner.altimg')"
            mainImageWidthDesk="600"
            mainImageHeightDesk="600"
            :style="backbanner"
        />
        <LazyDoForYouMAM
            class="margin-top var-style-do-you"
            :cards="cards"
            :paragraphs="[]"
            imageSrc="/images/about/Nosotros-image-2.png"
            :image-alt="$t('about.do-for-you.altimg')"
            ImageWidth="535"
            ImageHeight="505"
            :style="degrade"
        />
        <div class="margin-general forex_tradeview">
            <div class="forex_tradeview_text">
                <h2>{{ $t("about.accordeon.title") }}</h2>
            </div>
            <LazyAccordeon :options="cards2" />
        </div>
        <div class="margin-general forms form-vulkan" :style="bakckform" id="fo">
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
            :label="'about.invest.title'"
            :imgBannerGradient="'/images/about/Nosotros-footer-background.jpg'"
            :cont_descript="true"
            :text_descript="'about.invest.textdescriprtInvest'"
            :cont_descript2="true"
            :text_descript2_keys="['about.invest.textdescriprtInvest2']"
        />
    </div>
</template>
  
<script setup>
// import PreloaderPage from "~/components/PreloaderPage.vue";
import BannerPages from "~/components/BannerPages.vue";
import LazyDoForYouMAM from "~/components/multi_mam/DoForYouMAM.vue";
import LazyAccordeon from "~/components/Accordeon.vue";
import LazyFormVulkan from "~/components/vulkan_bridge/FormVulkan.vue";
import LazyInvestment from "~/components/Investment.vue";
import { useI18n } from "vue-i18n";
import { useImage } from '#imports'; 

const nuxtImg = useImage();
const { t } = useI18n();
const title = t("seo.about.title");
const description = t("seo.about.description");
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

const back2ImageUrl = '/images/about/about-us-mobile.jpg';
const back1ImageUrl = '/images/about/Nosotros-hero-background.jpg';
const degradadeImageUrl = '/images/about/Nosotros-gradient.png';

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
    subtitle: t("about.do-for-you.subtitle-1"),
    description1: t("about.do-for-you.description-1"),
    },
    {
    icon: "add_reaction",
    subtitle: t("about.do-for-you.subtitle-2"),
    description1: t("about.do-for-you.description-2"),
    },
];

let cards2 = ref([
    {
        title: "about.accordeon.accordeonTitle1",
        texts: [
            'about.accordeon.accordeonDesc1',
        ],
        icon: "attach_money",
    },
    {
        title: "about.accordeon.accordeonTitle2",
        texts: [
            'about.accordeon.accordeonDesc2',
        ],
        icon: "done",
    },
    {
        title: "about.accordeon.accordeonTitle3",
        texts: [
            'about.accordeon.accordeonDesc3',
        ],
        icon: "devices",
    },
]);
</script>

<style lang="scss">
@import '~/assets/scss/pages/about.scss';
</style>
  