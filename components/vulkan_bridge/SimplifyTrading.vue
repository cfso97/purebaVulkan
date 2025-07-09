<template>
  <div class="simplify-trading-content margin-general">
    <h2 v-if="title">{{ $t(title) }}</h2>
    <p v-if="description">{{ $t(description) }}</p>

    <div v-if="steps && steps.length > 0" class="simplify-trading-steps">
      <div v-for="(step, index) in steps" :key="index" class="step">
        <div class="title-step">
          <div class="box-img">
            <span v-if="step.icon" class="material-symbols-outlined" translate="no">{{ step.icon }}</span>
            <img v-else-if="step.imgSrc" :src="step.imgSrc" :alt="step.imgAlt || ''" />
          </div>
          <p v-if="step.title">
            {{ $t(step.title) }}
          </p>
        </div>
        <span v-if="step.description" class="text-step body-4">
          {{ $t(step.description) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import '~/assets/scss/components/services/vulkan_bridge/simplify-trading.scss'

const props = defineProps({
  imgBannerGradient: String,
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  steps: {
    type: Array,
    required: false,
    default: () => [],
  },
});
</script>