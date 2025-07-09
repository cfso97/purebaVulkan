<template>
    <div class="risk-monitor gap-general" >

        <BannerPages
          class="max-text"
          :title="'risk-monitors.banner.title'"
          :descriptions="[
            $t('risk-monitors.banner.description'),
          ]"
          img="/images/risk-monitor/tmp-3.png"
          :alt="$t('risk-monitors.banner.altimg')"
          mainImageWidthDesk="611"
          mainImageHeightDesk="474"
          iconSrc="/images/vulkan_bridge/vulkan-logo.svg"  
          :iconAlt="$t('menu.altlogo')" 
          logoImageWidth="306"
          logoImageHeight="71"
          :style="backbanner"
        />

        <LazyWhatIsMAM 
          :title="title2"
          :content="content"
        />
        <LazyAdvantages :title="'risk-monitors.advantages.title'" :advantages="advantagesData" :style="degrade"/>
        <LazySimplifyTrading 
          :title="simplifyTradingData.title" 
          :description="simplifyTradingData.description" 
          :steps="simplifyTradingData.steps"  
          :style="backbanner2"
        />
        <LazyToStart 
          img="/images/risk-monitor/Vulkan-risk-img-2.png"
          :alt_img="$t('risk-monitors.toStart.altimg')"
        />
        <div class="margin-general forms form-vulkan" :style="bakckform" id="form">
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
          :label="'risk-monitors.invest.title'"
          :imgBannerGradient="'/images/communi_traders/risk-monitors-footer-background.jpg'"
          :cont_descript2="true"
          :text_descript2_keys="['risk-monitors.invest.textdescriprtInvest']"
          :buttonConfig="{
            type: 'scroll',
            textKey: 'risk-monitors.invest.btn',
            targetId: 'form',
            class: 'primary-button-medium' 
          }"
          />
        </div>
    </div>
  </template>
  
  <script setup>
  // import PreloaderPage from "~/components/PreloaderPage.vue";
  // import DoForYouMAM from "~/components/multi_mam/DoForYouMAM.vue";
  import BannerPages from "~/components/BannerPages.vue";
  import LazyWhatIsMAM from "~/components/multi_mam/WhatIsMAM.vue";
  import LazyAdvantages from "~/components/Advantages.vue";
  import LazySimplifyTrading from "~/components/vulkan_bridge/SimplifyTrading.vue";
  import LazyToStart from "~/components/ToStart.vue";
  import LazyFormVulkan from "~/components/vulkan_bridge/FormVulkan.vue";
  import LazyInvestment from "~/components/Investment.vue"
  
  import { useSeoMeta } from "#app";
  import { useI18n } from "vue-i18n";
  import { useImage } from '#imports'; 
  
  const nuxtImg = useImage();
  const { t } = useI18n();
  const title = t("seo.risk-monitors.title");
  const description = t("seo.risk-monitors.description");
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

  const back2ImageUrl = '/images/risk-monitor/tmp-2.jpg';
  const back1ImageUrl = '/images/risk-monitor/tmp-1.jpg';
  const degradadeImageUrl = '/images/risk-monitor/Vulkan-risk-gradient.png';
  const degradadeImageUrl2 = '/images/risk-monitor/Vulkan-risk-gradient-2.png';
  const back3ImageUrl = '/images/risk-monitor/Vulkan-risk-cards-background.jpg';
  const back4ImageUrl = '/images/risk-monitor/Vulkan-risk-cards-background-mobile.jpg';

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
  const optimizedDegrade2 = nuxtImg(degradadeImageUrl2, {
    quality: 80,
    format: 'webp',
  });
  const optimizedDegrade3 = nuxtImg(back3ImageUrl, {
    quality: 80,
    format: 'webp',
  });
  const optimizedDegrade4 = nuxtImg(back4ImageUrl, {
    quality: 80,
    format: 'webp',
  });

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

  const backbanner2 = computed(() => {
  return {
    '--back3': `url('${optimizedDegrade3}')`,
    '--back4': `url('${optimizedDegrade4}')`,
    '--degrade2': `url('${optimizedDegrade2}')`,
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

  const title2 = t('risk-monitors.what-is.title');
  const content = [
      [
          { text: t('risk-monitors.what-is.text') }
      ],
      [
          { text: t('risk-monitors.what-is.text1'), strong: true }
      ],
      [
          {
              type: 'list', 
              ordered: false, 
              items: [
                  { text: t('risk-monitors.what-is.text2') },
                  { text: t('risk-monitors.what-is.text3') },
                  { text: t('risk-monitors.what-is.text4') } 
              ],
          }
      ],
      [
          { text: t('risk-monitors.what-is.text5') }
      ],
  ];
  
  const advantagesData = ref([
    {
      image: "filter_alt",
      alt: "filter_alt",
      iconSrc: "filter_alt",
      title: "risk-monitors.advantages.subtitle",
      description: "risk-monitors.advantages.text",
    },
    {
      image: "highlight_mouse_cursor",
      alt: "highlight_mouse_curso",
      iconSrc: "highlight_mouse_curso",
      title: "risk-monitors.advantages.subtitle1",
      description: "risk-monitors.advantages.text1",
    },
    {
      image: "dashboard",
      alt: "dashboard",
      iconSrc: "dashboard",
      title: "risk-monitors.advantages.subtitle2",
      description: "risk-monitors.advantages.text2",
    },
    {
      image: "decimal_decrease",
      alt: "decimal_decrease",
      iconSrc: "decimal_decrease",
      title: "risk-monitors.advantages.subtitle3",
      description: "risk-monitors.advantages.text3",
    },
    {
      image: "paid",
      alt: "paid",
      iconSrc: "paid",
      title: "risk-monitors.advantages.subtitle4",
      description: "risk-monitors.advantages.text4",
    },
    {
      image: "notifications_active",
      alt: "notifications_active",
      iconSrc: "notifications_active",
      title: "risk-monitors.advantages.subtitle5",
      description: "risk-monitors.advantages.text5",
    },
    {
      image: "space_dashboard",
      alt: "space_dashboar",
      iconSrc: "space_dashboar",
      title: "risk-monitors.advantages.subtitle6",
      description: "risk-monitors.advantages.text6",
    },
  ]);

  let simplifyTradingData = ref({
    title: "risk-monitors.simplify-trading.title",
    steps: [
      { icon: 'password', description: 'risk-monitors.simplify-trading.description-1' },
      { icon: 'password', description: 'risk-monitors.simplify-trading.description-2' },
      { icon: 'trending_up', description: 'risk-monitors.simplify-trading.description-3' },
    ]
  });
  
  </script>

<style lang="scss"> /* No scoped aquí */
@import '~/assets/scss/pages/risk-monitor.scss';
</style>
  