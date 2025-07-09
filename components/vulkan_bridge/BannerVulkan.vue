<template>
  <div class="vulkan-banner-content">
    <div class="margin-general">
      <div class="vulkan-banner-text">
        <img
          v-if="logoSrc"
          class="logo"
          :src="logoSrc"
          :alt="logoAlt"
          :width="logoImageWidth"
          :height="logoImageHeight"
        />
        <h1 class="title">{{ title }}</h1>
        <p class="description body-6">
          {{ description }}
        </p>
        <button
          v-if="buttonText"
          class="button body-6-bold"
          @click="handleButtonClick"
        >
          {{ buttonText }}
        </button>
      </div>
      <div class="vulkan-banner-image">
        <NuxtImg
          :src="mainImageSrc"
          :alt="mainImageAlt"
          format="webp"
          :width="mainImageWidthDesk"
          :height="mainImageHeightDesk"
          sizes="sm:100vw md:50vw lg:33vw"
          quality="85"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="banner-person-img"
          preload
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useImage } from '#imports'; 
import { ref, onMounted, onUnmounted, computed } from 'vue';

const nuxtImg = useImage();
const props = defineProps({
  imgBannerGradient: String,
  imgBannerGradientMobile: String,
  mainImageWidthDesk: String,
  mainImageHeightDesk: String,
  logoImageWidth: String,
  logoImageHeight: String,
  logoSrc: {
    type: String,
    required: false, 
    default: null,
  },
  logoAlt: {
    type: String,
    required: false,
    default: 'Logo', 
  },
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true, 
  },
  mainImageSrc: {
    type: String,
    required: false,
    default: null,
  },
  mainImageAlt: {
    type: String,
    required: false,
    default: '', 
  },
  buttonText: {
    type: String,
    required: false, 
    default: null,
  },
});

const emit = defineEmits(['button-click']);
const handleButtonClick = () => {
  emit('button-click');
};
</script>

<style lang="scss">
  @import '~/assets/scss/components/services/vulkan_bridge/banner.scss';
</style>