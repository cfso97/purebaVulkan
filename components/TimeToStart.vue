<template>
  <client-only>
    <div class="content-timetostart margin-general" :style="props.style">
      <div class="content">
        <div class="desc-seccion-mobile">
          <h2 v-if="titleKey && isMobile">{{ $t(titleKey) }}</h2>
        </div>

        <NuxtImg
          v-if="image && image.src"
          :src="image.src"
          :alt="$t(image.altKey || 'images.defaultAltText')"
          :width="imageWidth"
          :height="imageHeight"
          loading="lazy"
        />
        <div class="desc">
          <h2 v-if="titleKey && !isMobile">{{ $t(titleKey) }}</h2>
          
          <div v-if="descriptionKeys && descriptionKeys.length > 0" class="desc-seccion">
            <p
              v-for="(descKey, index) in descriptionKeys"
              :key="`desc-${index}`"
              class="body-4"
              v-html="formatContent(descKey, $t, localPath)" 
            >
            </p>
          </div>

          <div v-if="listItemKeys && listItemKeys.length > 0" class="card">
            <ul>
              <li
                v-for="(itemKey, index) in listItemKeys"
                :key="`item-${index}`"
                class="body-4"
              >
                {{ $t(itemKey) }}
              </li>
            </ul>
          </div>

          <span v-if="disclaimerKey" class="disclaimer body-5">{{
            $t(disclaimerKey)
          }}</span>

          <div v-if="buttons && buttons.length > 0" class="buttons">
              <template v-for="(button, index) in buttons" :key="`btn-${index}`">
                <NuxtLink v-if="button.type === 'internal' && button.to" :to="localPath(button.to)">
                  <button :class="button.class || 'primary-button-medium'">
                    {{ $t(button.textKey) }}
                  </button>
                </NuxtLink>

                <a v-else-if="button.type === 'external' && button.href" :href="button.href" target="_blank" rel="noopener noreferrer">
                  <button :class="button.class || 'primary-button-medium'">
                    {{ $t(button.textKey) }}
                  </button>
                </a>

                <button v-else-if="button.type === 'action' && typeof button.onClick === 'function'" @click="button.onClick" :class="button.class || 'primary-button-medium'">
                  {{ $t(button.textKey) }}
                </button>

                <button v-else-if="button.type === 'scroll' && button.targetId" @click="() => scrollToSection(button.targetId)" :class="button.class || 'primary-button-medium'">
                    {{ $t(button.textKey) }}
                  </button>
              </template>
            </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '#i18n';

const { t } = useI18n();
const localPath = useLocalePath();

// Screen size detection logic
const isMobile = ref(false);
const breakpoint = 768;

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < breakpoint;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const props = defineProps({
  titleKey: {
    type: String,
    default: ''
  },
  descriptionKeys: {
    type: Array,
    default: () => [],
    validator: (value) => value.every(item => typeof item === 'string')
  },
  image: {
    type: Object,
    default: () => null,
    validator: (value) => value === null || (typeof value === 'object' && typeof value.src === 'string' && typeof value.altKey === 'string')
  },
  imageWidth: {
    type: [String, Number],
    default: undefined
  },
  imageHeight: {
    type: [String, Number],
    default: undefined
  },
  listItemKeys: {
    type: Array,
    default: () => [],
    validator: (value) => value.every(item => typeof item === 'string')
  },
  disclaimerKey: {
    type: String,
    default: ''
  },
  buttons: {
    type: Array,
    default: () => []
  },
  style: {
    type: Object,
    default: () => ({})
  }
});

const scrollToSection = (targetId) => {
  // console.warn(`Scroll function called for target: ${targetId}. Needs implementation.`); // Original console.warn
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    console.warn(`Scroll target element with ID "${targetId}" not found.`);
  }
};

// Assuming formatContent is globally available or defined elsewhere if needed by your template
// If not, you'll need to define or import it. Example:
// const formatContent = (key, i18nInstance, pathInstance) => {
//   // Your implementation for formatContent
//   return i18nInstance(key); // Placeholder
// };

</script>

<style lang="scss">
  @import '~/assets/scss/components/partners/timeToStart.scss';
</style>