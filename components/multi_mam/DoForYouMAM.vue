<template>
  <div class="margin-general">
    <div class="do-for-you-content">
      <div class="do-for-you-left">
        <div class="text-box">
          <h2 v-if="title" v-html="formatContent(title, $t, localPath)"></h2>
          <div v-for="(paragraph, index) in paragraphs" :key="index">
            <p class="description">
              <span v-for="(part, partIndex) in paragraph" :key="partIndex">
                <strong v-if="part.strong">{{ part.text }}</strong>
                <span v-else>{{ part.text }}</span>
              </span>
            </p>
          </div>
          <NuxtImg
            v-if="imageSrc"
            :src="imageSrc"
            :alt="imageAlt || 'Image not available'"
            :width="ImageWidth"
            :height="ImageHeight"
          />
          <video
            v-if="videoSrc"
            ref="video"
            class="video"
            autoplay
            loop
            muted
            playsinline
            preload="lazy"
            :alt="videoAlt"
          >
            <source :src="videoSrc" :type="videoType" />
          </video>
        </div>
      </div>
      <div class="cont-rigth">
        <h2 v-if="title2" v-html="formatContent(title2, $t, localPath)"></h2>
        <NuxtImg
          v-if="imageSrc"
          :src="imageSrc"
          :alt="imageAlt || 'Image not available'"
        />
        <video
          v-if="videoSrc"
          ref="video"
          class="video"
          autoplay
          loop
          muted
          playsinline
          preload="lazy"
          :alt="videoAlt"
        >
          <source :src="videoSrc" :type="videoType" />
        </video>
        <div class="do-for-you-right">
          <div v-for="(item, index) in cards" :key="index" class="card">
            <div class="img-content">
              <div class="img-box">
                <span class="material-symbols-outlined" translate="no">{{ item.icon }}</span>
              </div>
            </div>
            <div class="text-content">
              <p v-if="item.subtitle" class="subtitle body-6-bold">{{ item.subtitle }}</p>
              <p v-if="item.description1" class="description"> {{ item.description1 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { formatContent } from '~/utils/formatContent';
import { useI18n } from '#imports';

const localPath = useLocalePath();
const props = defineProps({
  title: {
    type: String,
    required: false, 
    default: null, 
  },
  title2: {
    type: String,
    required: false,
    default: null,  
  },
  paragraphs: {
    type: Array,
    required: true,
  },
  cards: {
    type: Array,
    required: true,
  },
  imageSrc: String,
  ImageWidth: String,
  ImageHeight: String,
  imageAlt: {
    type: String,
    required: false,
    default: '',
  },
  videoConfig: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  videoAlt: {
    type: String,
    required: false,
    default: '',
  },
});

const { locale } = useI18n();

const videoSrc = computed(() => {
  return props.videoConfig[locale.value]?.video || props.videoConfig.default?.video || null;
});

const videoType = computed(() => {
  const type = props.videoConfig[locale.value]?.type || props.videoConfig.default?.type;
  return type || (videoSrc.value ? 'video/mp4' : null); 
});
</script>

<style lang="scss">
  @import '~/assets/scss/components/services/multi_mam/do-for-you-mam.scss';
</style>