<template>
    <div class="contact-page gap-general">
        <!-- <PreloaderPage /> -->
        <BannerPages
            class="max-img"
            :title="'contacts.banner.title'"
            :descriptions="[
                $t('contacts.banner.description'),
            ]"
            img="/images/contact/vulkan-Contacto-hero-img.png"
            :alt="$t('contacts.banner.altimg')"
            mainImageWidthDesk="599"
            mainImageHeightDesk="526"
            :style="backbanner"
        />

        <div class="section-form" :style="degrade">
          <div class="margin-general forms form-vulkan" :style="bakckform" id="form">
            <div  class="cont-general">
                <div class="descript">
                  <img src="/images/vulkan_bridge/vulkan-logo.svg" :alt="$t('menu.altlogo')" height="71px" width="306px" loading="lazy"/>
                  <h2>{{ $t("contacts.vulkan_form.title") }}</h2>
                  <p class="body-4">{{ $t("contacts.vulkan_form.descript-title") }}</p>
                  </div>
                  <div class="cont_general_form">
                  <div class="cont_form">
                      <div class="descript-cont">
                      <p class="body-2-bold">{{ $t("contacts.vulkan_form.subtitle") }}</p>
                      </div>
                      <LazyFormVulkan />
                  </div>
                </div>
            </div>
          </div>
          <div class="margin-general">
            <div class="direct-contact-info">
              <h3>{{ $t("contacts.direct_contact.title") }}</h3>
              <div class="info-card">
                <span class="material-symbols-outlined" translate="no">mark_email_read</span>
                <div>
                  <p class="body-6-bold">{{ $t("contacts.direct_contact.text") }}</p>
                  <p class="body-4" v-html="formatContent('contacts.direct_contact.text2', $t)"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LazyDoForYouMAM
            class="var-style-cont"
            :title2="'contacts.do-for-you.title'"
            :cards="cards"
            :paragraphs="[]"
            imageSrc="/images/contact/vulkan-Contacto-img-2.png"
            :image-alt="$t('about.do-for-you.altimg')"
            ImageWidth="535"
            ImageHeight="383"
        />
        <!-- <FindUs :style="degrade2"/> -->
        <div class="margin-general forex_tradeview" :style="degrade2">
            <div class="forex_tradeview_text">
                <h2>{{ $t("contacts.accordeon.title") }}</h2>
            </div>
            <LazyAccordeon :options="cards2" />
        </div>
        <LazyInvestment
            :label="'contacts.invest.title'"
            :imgBannerGradient="'/images/about/Nosotros-footer-background.jpg'"
            :cont_descript="true"
            :text_descript="'contacts.invest.textdescriprtInvest'"
            :cont_descript2="true"
            :text_descript2_keys="['contacts.invest.textdescriprtInvest2']"
        />
    </div>
</template>
  
<script setup>
// import PreloaderPage from "~/components/PreloaderPage.vue";
import BannerPages from "~/components/BannerPages.vue";
import LazyDoForYouMAM from "~/components/multi_mam/DoForYouMAM.vue";
import LazyAccordeon from "~/components/Accordeon.vue";
import FindUs from "~/components/contacts/FindUs.vue";
import LazyFormVulkan from "~/components/vulkan_bridge/FormVulkan.vue";
import LazyInvestment from "~/components/Investment.vue";
import { useI18n } from "vue-i18n";
import { useImage } from '#imports'; 

const nuxtImg = useImage();
const { t } = useI18n();
const title = t("seo.contact.title");
const description = t("seo.contact.description");
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

const back2ImageUrl = '/images/contact/Vulkan-Contacto-hero-BG-mb.jpg';
const back1ImageUrl = '/images/contact/Vulkan-Contacto-hero-BG.jpg';
const degradadeImageUrl = '/images/contact/vulkan-gradiente-3.png';
const degradade2ImageUrl = '/images/contact/vulkan-gradiente-2.png';
const degradade3ImageUrl = '/images/contact/Home-gradient-2.png';

const backImageUrl2 = nuxtImg(back2ImageUrl , {
  quality: 80,
  format: 'webp',
});
const backImageUrl = nuxtImg(back1ImageUrl, {
  quality: 80,
  format: 'webp',
});
const optimizedDegrade = nuxtImg(degradadeImageUrl, {
  quality: 80,
  format: 'webp',
});
const optimizedDegrade2 = nuxtImg(degradade2ImageUrl , {
  quality: 80,
  format: 'webp',
});
const optimizedDegrade3 = nuxtImg(degradade3ImageUrl , {
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

const degrade2 = computed(() => {
  return {
    '--degrade2': `url('${optimizedDegrade2}')`,
  };
});

const degrade3 = computed(() => {
  return {
    '--degrade3': `url('${optimizedDegrade3}')`,
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
    icon: "hotel_class",
    description1: t("contacts.do-for-you.description-1"),
    },
    {
    icon: "support_agent",
    description1: t("contacts.do-for-you.description-2"),
    },
    {
    icon: "acute",
    description1: t("contacts.do-for-you.description-2"),
    },
];

let cards2 = ref([
    {
        title: "contacts.accordeon.accordeonTitle1",
        texts: [
            'contacts.accordeon.accordeonDesc1',
        ],
        icon: "pace",
    },
    {
        title: "contacts.accordeon.accordeonTitle2",
        texts: [
            'contacts.accordeon.accordeonDesc2',
        ],
        icon: "chat",
    },
    {
        title: "contacts.accordeon.accordeonTitle3",
        texts: [
            'contacts.accordeon.accordeonDesc3',
        ],
        icon: "stacked_email",
    },
]);
</script>

<style lang="scss">
@import '~/assets/scss/pages/contact.scss';
</style>
  