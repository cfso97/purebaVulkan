<template>
  <div class="home-page gap-general" >
    <BannerPages
      :title="'home.banner.title'"
      :descriptions="[
        $t('home.banner.description'),
      ]"
      img="/images/home/Home-hero-image.webp"
      mainImageWidthDesk="607"
      mainImageHeightDesk="607"
      :alt="$t('home.banner.altimg')"
      :buttons="[
        {
          text: 'home.banner.button-1', 
          type: 'scroll',
          targetId: 'contacts', 
          class: 'second-button-medium-white' 
        }
      ]"
      :style="backbanner"
    />

    <LazyYourOpportunity
      :titleKey="'home.yourOpp.title'"
      :desc2Key="'home.yourOpp.desc'"
      :buttons="[
        {
          text: 'home.yourOpp.button-1', 
          type: 'scroll',
          targetId: 'form', 
          class: 'primary-button-medium' 
        }
      ]"
      :listItems="opportunityListKeys" 
      :style="degrade"
    />

    <div class="platforms_landings">
      <Lazytabsplatforms
        :generalTitleKey="'home.advantages.title_general'"
        :tabs="platformTabs"
        :contentData="platformContent"
        :globalFooterConfig="footerSetup"
        @tabSelected="handleTabSelection"
      />
    </div>


    <LazyTimeToStart 
      :titleKey="'home.timeStart.title'"
      :descriptionKeys="['home.timeStart.desc1', 'home.timeStart.desc2']"
      :image="{ src: '/images/home/Home-image-2.png', altKey: 'home.timeStart.altimg' }"
      :imageWidth="545"
      :imageHeight="438"
      :listItemKeys="[
        'home.timeStart.item1',
        'home.timeStart.item2',
        'home.timeStart.item3',
      ]"
      :style="degrade2"
    />

    <ClientOnly>
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
    </ClientOnly>

    <LazyInvestment
      id="contacts"
      :label="'home.invest.title'" 
      :imgBannerGradient="'/images/home/Home-footer-background.jpg'"
      :cont_descript="true"
      :text_descript="'home.invest.textdescriprtInvest'"
      :cont_descript2="true"
      :text_descript2_keys="['home.invest.textdescriprtInvest2']"
    />
  </div>
</template>

<!-- Config just SEO -->
<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import BannerPages from "~/components/BannerPages.vue";
import LazyYourOpportunity from "~/components/YourOpportunity.vue";
import Lazytabsplatforms from "~/components/tabs-platforms.vue";
import LazyTimeToStart from "~/components/TimeToStart.vue";
import LazyFormVulkan from "~/components/vulkan_bridge/FormVulkan.vue";
import LazyInvestment from "~/components/Investment.vue";

import { useImage } from '#imports'; 

const nuxtImg = useImage();
const { t } = useI18n();

const title = t("seo.home.title");
const description = t("seo.home.description");
const imgSeo = 'https://www.vulkanbrokersolutions.com/images/seo/Vulkan-Broker-Solutions-Link-preview.jpg'

useSeoMeta({
  title: title,
  ogTitle: title,
  twitterTitle: title,
  description: description,
  ogDescription: description,
  twitterDescription: description,
  ogImage: imgSeo,
  twitterImage: imgSeo,
});

const back2ImageUrl = '/images/home/Home_mobile.webp';
const back1ImageUrl = '/images/home/Home-hero-background.webp';
const degradadeImageUrl = '/images/home/Home-gradient-1.png';
const degradade2ImageUrl = '/images/home/Home-gradient-2.png';

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
const optimizedDegrade2 = nuxtImg(degradade2ImageUrl , {
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


const opportunityListKeys = ref([
  "home.yourOpp.item1",
  "home.yourOpp.item2",
  "home.yourOpp.item3",
  "home.yourOpp.item4",
]);

const platformTabs = ref([
  { label: 'home.advantages.title1', value: 'CommuniTraders' },
  { label: 'home.advantages.title2', value: 'Vulkan Prime' },
  { label: 'home.advantages.title3', value: 'MultiMAM' },
  { label: 'home.advantages.title4', value: 'Risk' }
]);

const platformContent = ref({
  'CommuniTraders': [
    {
      desktopTitleKey: 'home.advantages.title1',
      imgSrc: '/images/home/Home-servicios-CommuniTraders.png',
      imgAltKey: 'home.advantages.altimg1',
      width: 392,
      height: 332,
      descriptionHtmlKeys: [
        'home.advantages.tab1text1', 
        'home.advantages.tab1text2'  
      ],
      button: {
         type: 'internal',
         to: '/services/communitraders/',
         text: 'home.advantages.btn',
         class: 'second-button-small'
      },
    }
  ],
  'Vulkan Prime': [
    {
      desktopTitleKey: 'home.advantages.title2',
      imgSrc: '/images/home/Home-servicios-Vulkan.png',
      imgAltKey: 'home.advantages.altimg2',
      width: 469,
      height: 344,
      descriptionHtmlKeys: [
        'home.advantages.tab2text1', 
        'home.advantages.tab2text2'  
      ],
      button: {
        type: 'internal',
        to: '/services/vulkan/',
        text: 'home.advantages.btn',
        class: 'second-button-small'
      }
    },
  ],
  'MultiMAM': [
    {
      desktopTitleKey: 'home.advantages.title3',
      imgSrc: '/images/home/Home-servicios-MultiMAM.png',
      imgAltKey: 'home.advantages.altimg3',
      width: 400,
      height: 323,
      descriptionHtmlKeys: [
        'home.advantages.tab3text1', 
        'home.advantages.tab3text2'  
      ],
      button: {
        type: 'internal',
        to: '/services/multimam/',
        text: 'home.advantages.btn',
        class: 'second-button-small'
      }
    },
  ],
  'Risk': [
    {
      desktopTitleKey: 'home.advantages.title4',
      imgSrc: '/images/home/Vulkan-risk-img.png',
      imgAltKey: 'home.advantages.altimg4',
      width: 626,
      height: 444,
      descriptionHtmlKeys: [
        'home.advantages.tab4text1', 
        'home.advantages.tab4text2'  
      ],
      button: {
        type: 'internal',
        to: '/services/risk-monitor/',
        text: 'home.advantages.btn',
        class: 'second-button-small'
      }
    },
  ]
});

const footerSetup = ref({
  textKey: 'home.advantages.disclaimertext', 
  link: {
    textKey: 'home.advantages.disclaimertextbtn', 
    type: 'scroll',                      
    targetId: 'form'      
  }
});

const handleTabSelection = (selectedTabValue) => {
  console.log(`Pestaña seleccionada en el padre: ${selectedTabValue}`);
};

</script>

<style lang="scss">
@import '~/assets/scss/pages/home.scss';
@import '~/assets/scss/components/platforms_landings.scss';

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>