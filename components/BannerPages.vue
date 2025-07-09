<template>
  <div>
    <div
      class="banner-contact"
    >

      <div class="margin-general">
        <div class="container">
          <div class="descript_">
            <img v-if="iconSrc" :src="iconSrc" :alt="iconAlt || title" :width="logoImageWidth"
            :height="logoImageHeight">
            <h1 v-html="formatContent(title, $t, localPath)"></h1>
            <div v-for="(description, index) in descriptions" :key="index">
              <p>{{ description }}</p>
            </div>

            <div class="buttons" v-if="buttons && buttons.length > 0">
              <template v-for="(button, index) in buttons" :key="`desktop-${index}`">
                <NuxtLink v-if="button.type === 'internal' && button.to" :to="localPath(button.to)">
                  <button :class="button.class || 'primary-button-medium'">
                    {{ $t(button.text) }}
                  </button>
                </NuxtLink>

                <a v-else-if="button.type === 'external' && button.href" :href="button.href" target="_blank" rel="noopener noreferrer">
                  <button :class="button.class || 'primary-button-medium'">
                    {{ $t(button.text) }}
                  </button>
                </a>

                <button v-else-if="button.type === 'action' && typeof button.onClick === 'function'" @click="button.onClick" :class="button.class || 'primary-button-medium'">
                  {{ $t(button.text) }}
                </button>

                <button v-else-if="button.type === 'scroll' && button.targetId" @click="scrollToSection(button.targetId)" :class="button.class || 'primary-button-medium'">
                    {{ $t(button.text) }}
                </button>
              </template>
            </div>
          </div>

          <div class="img_">
            <NuxtImg
              :src="img"
              :alt="alt"
              format="webp"
              :width="mainImageWidthDesk"
              :height="mainImageHeightDesk"
              sizes="sm:100vw md:50vw lg:33vw"
              quality="85"
              loading="eager"
              fetchpriority="high"
              class="banner-person-img"
              preload
            />

          </div>

          <div class="buttons btn-mobil" v-if="buttons && buttons.length > 0">
              <template v-for="(button, index) in buttons" :key="`mobile-${index}`">
                 <NuxtLink v-if="button.type === 'internal' && button.to" :to="localPath(button.to)">
                  <button :class="button.class || 'primary-button-medium'">
                    {{ $t(button.text) }}
                  </button>
                </NuxtLink>

                <a v-else-if="button.type === 'external' && button.href" :href="button.href" target="_blank" rel="noopener noreferrer">
                  <button :class="button.class || 'primary-button-medium'">
                    {{ $t(button.text) }}
                  </button>
                </a>

                <button v-else-if="button.type === 'action' && typeof button.onClick === 'function'" @click="button.onClick" :class="button.class || 'primary-button-medium'">
                  {{ $t(button.text) }}
                </button>

                <button v-else-if="button.type === 'scroll' && button.targetId" @click="scrollToSection(button.targetId)" :class="button.class || 'primary-button-medium'">
                    {{ $t(button.text) }}
                </button>
              </template>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatContent } from '~/utils/formatContent';

const localPath = useLocalePath();
const { t } = useI18n();

const props = defineProps({
  title: String,
  descriptions: Array,
  img: String,
  alt: String,
  mainImageWidthDesk: String,
  mainImageHeightDesk: String,
  logoImageWidth: String,
  logoImageHeight: String,
  buttons: {
    type: Array,
    default: () => []
  },
  iconSrc: {
    type: String,
    default: '' 
  },
  iconAlt: {
    type: String,
    default: '' 
  }
});

// Scroll Function
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

</script>

<style lang="scss">
  @import '~/assets/scss/components/banner-pages.scss';
</style>