<template>
    <div class="page-blog gap-general">
      <BannerPages
        :title="'blog.banner.title'"
        :descriptions="[
          $t('blog.banner.description'),
        ]"
        img="/images/blog/Blog-recursos-hero-img.png"
        :alt="$t('blog.banner.altimg')"
        mainImageWidthDesk="597"
        mainImageHeightDesk="418"
        :style="backbanner"
      />
      <!-- <build /> -->
  
      <SurfsUpPosts 
        :use-links="false" 
        :allowed-slugs="[
          'most-recent'
        ]" 
        class="none-main-tabs margin-top"
      />

      <ClientOnly>
        <div class="margin-general forms form-vulkan" id="form" :style="degrade">
          <div  class="cont-general">
            <div class="descript">
              <img src="/images/blog/vulkan-logo-color.svg" :alt="$t('menu.altlogo')" height="71px" width="306px" loading="lazy"/>
              <h2>{{ $t("blog.vulkan_form.title") }}</h2>
            <p class="body-4">{{ $t("blog.vulkan_form.descript-title") }}</p>
            </div>
            <div class="cont_general_form">
              <div class="cont_form">
                <LazyFormVulkan />
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
  
      <div class="accordeons_blog pad-top">
        <div class="margin-general">
          <div class="cont">
            <div class="forex_tradeview_text">
                <h2>{{ $t("blog.accordeon.title") }}</h2>
            </div>
            <LazyAccordeon :options="cards2" />
          </div>
        </div>
      </div>
      <!-- <PreloaderPage ref="preloader" :manualTrigger="true" :duration="3000" /> -->
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import BannerPages from '~/components/BannerPages.vue';
  // import build from '~/components/build.vue';
  import LazyFormVulkan from "~/components/blog/form-blog.vue";
  import LazyAccordeon from "~/components/Accordeon.vue";
  import SurfsUpPosts from '~/components/blog/SurfsUpPostsTabs.vue';
  // import PreloaderPage from '~/components/PreloaderPage.vue';
  import { useI18n } from "vue-i18n";
  import { useImage } from '#imports'; 

  const { t } = useI18n();
  const title = t("seo.blog.title");
  const description = t("seo.blog.description");
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

  const nuxtImg = useImage();

  const back2ImageUrl = '/images/blog/Blog-recursos-hero-background-mb.jpg';
  const back1ImageUrl = '/images/blog/Blog-recursos-hero-background.jpg';
  const degradadeImageUrl = '/images/blog/Blog-recursos-gradient-1.png';
  const degradade2ImageUrl = '/images/blog/Blog-recursos-Gradient-2.png';

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
      '--degrade2': `url('${optimizedDegrade2}')`,
    };
  });

  let cards2 = ref([
    {
        title: "blog.accordeon.accordeonTitle1",
        texts: [
            'blog.accordeon.accordeonDesc1',
        ],
        icon: "attach_money",
    },
    {
        title: "blog.accordeon.accordeonTitle2",
        texts: [
            'blog.accordeon.accordeonDesc2',
        ],
        icon: "done",
    },
    {
        title: "blog.accordeon.accordeonTitle3",
        texts: [
            'blog.accordeon.accordeonDesc3',
        ],
        icon: "devices",
    },
  ]);
</script>

<style lang="scss">
  @import '~/assets/scss/pages/blog.scss';
</style>