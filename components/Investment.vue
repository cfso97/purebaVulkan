<template>
  <div class="invest" :style="bannerStyles" ref="investmentDiv">
    <div class="margin-general">
      <h3 v-if="label" v-html="formatContent(label, $t, localPath)"></h3>
      <div v-if="cont_descript && text_descript">
        <p class="heading-h4">{{ $t(text_descript) }}</p>
      </div>

      <div v-if="cont_descript2 && text_descript2_keys && text_descript2_keys.length > 0">
        <p
          v-for="(descKey, index) in text_descript2_keys"
          :key="`desc2-${index}`"
          class="body-6"
          v-html="formatContent(descKey, $t, localPath)"
        >
        </p>
      </div>

      <div class="buttons" v-if="buttonConfig && buttonConfig.textKey">
        <NuxtLink v-if="buttonConfig.type === 'internal' && buttonConfig.to" :to="localPath(buttonConfig.to)">
          <button :class="buttonConfig.class || 'primary-button-medium'">
            {{ $t(buttonConfig.textKey) }}
          </button>
        </NuxtLink>

        <a v-else-if="buttonConfig.type === 'external' && buttonConfig.href" :href="buttonConfig.href" target="_blank" rel="noopener noreferrer">
          <button :class="buttonConfig.class || 'primary-button-medium'">
            {{ $t(buttonConfig.textKey) }}
          </button>
        </a>

        <button v-else-if="buttonConfig.type === 'action' && typeof buttonConfig.onClick === 'function'" @click="buttonConfig.onClick" :class="buttonConfig.class || 'primary-button-medium'">
          {{ $t(buttonConfig.textKey) }}
        </button>

        <button v-else-if="buttonConfig.type === 'scroll' && buttonConfig.targetId" @click="() => scrollToSection(buttonConfig.targetId)" :class="buttonConfig.class || 'primary-button-medium'">
          {{ $t(buttonConfig.textKey) }}
        </button>

        <button v-else :class="buttonConfig.class || 'primary-button-medium'">
          {{ $t(buttonConfig.textKey) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, onMounted, onUnmounted } from "vue"; 
import { useI18n } from 'vue-i18n'; 
import { useLocalePath } from '#i18n'; 
import { formatContent } from '~/utils/formatContent';
import { useImage } from '#imports';

const nuxtImg = useImage();
const { t } = useI18n(); 
const localPath = useLocalePath(); 

const investmentDiv = ref(null);
const isImageVisible = ref(false);

const props = defineProps({
  label: { 
      type: String,
      default: ''
  },
  imgBannerGradient: { 
      type: String,
      default: ''
  },
  cont_descript: Boolean, 
  text_descript: { 
      type: String,
      default: ''
  },
  cont_descript2: Boolean, 
  text_descript2_keys: {
    type: Array, 
    default: () => [],
    validator: (value) => value.every(item => typeof item === 'string') 
  },
  buttonConfig: {
    type: Object,
    default: null, 
    validator: (value) => value === null || (typeof value === 'object' && typeof value.textKey === 'string')
  }
});

const scrollToSection = (targetId = 'formulario') => {
  const element = document.getElementById(targetId);
  if (!element) {
    console.warn(`Scroll target element with ID "${targetId}" not found.`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offset = 70;
  const targetPosition = elementPosition - offset;

  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 2000; 
  let startTime = null;


  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const animationStep = (currentTime) => {
    if (startTime === null) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animationStep);
    }
  };

  requestAnimationFrame(animationStep);
};

const optimizedBackgroundImageUrl = computed(() => {
  if (!props.imgBannerGradient) {
    return 'none'; 
  }
  return nuxtImg(props.imgBannerGradient, {
    quality: 80, 
    format: 'webp', 
  });
});

const bannerStyles = computed(() => {
  return {
    backgroundImage: isImageVisible.value ? `url('${optimizedBackgroundImageUrl.value}')` : 'none',
  };
});

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isImageVisible.value = true;
          observer.disconnect();
        }
      });
    },
    { rootMargin: '100px' }
  );

  if (investmentDiv.value) {
    observer.observe(investmentDiv.value);
  }
});

onUnmounted(() => {
  if (investmentDiv.value) {
    const observer = new IntersectionObserver(() => {});
    observer.disconnect();
  }
});

</script>

<style lang="scss">
  @import '~/assets/scss/components/invest.scss';
</style>