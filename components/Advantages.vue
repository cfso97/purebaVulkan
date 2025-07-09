<template>
  <div class="advantages-container margin-general">
    <div class="items-container">
      <div class="title-container">
        <h2 v-if="title" class="title">
          {{ $t(title) }}
        </h2>
        <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="imageAlt"
        />
      </div>
      <div class="items-container-2">
        <div class="advantage" v-for="(item, index) in advantages" :key="index">
          <div class="image-container">
            <span class="material-symbols-outlined icon" translate="no">{{ item.image }}</span>
          </div>
          <div class="advantage-text-item">
            <p class="title body-6">{{ $t(item.title) }}</p>
            <p class="description body-4">{{ $t(item.description) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/scss/components/home/advantages.scss'
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    advantages: {
      type: Array,
      required: true,
    },
    imageConfig: {
      type: Object,
      required: false,
    },
    imageAlt: {
      type: String,
      required: false,
      default: 'Image not available', 
    },
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale || 'default';
    },
    imageSrc() {
      return (
        this.imageConfig?.[this.currentLocale]?.image ||
        this.imageConfig?.default?.image ||
        null
      );
    },
  },
};
</script>
