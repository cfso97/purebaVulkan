<template>
  <div class="your-opportunity">
    <div class="margin-general">
      <div class="container">
        <div class="text-content">
          <h2 v-if="titleKey">{{ $t(titleKey) }}</h2>
          <p v-if="descKey" class="text-1 body-4">{{ $t(descKey) }}</p>

          <div class="buttons" v-if="buttons && buttons.length > 0">
            <template v-for="(button, index) in buttons" :key="`btn-${index}`">
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

              <button v-else-if="button.type === 'scroll' && button.targetId" @click="() => scrollToSection(button.targetId)" :class="button.class || 'primary-button-medium'">
                  {{ $t(button.text) }}
                </button>
            </template>
          </div>
        </div>

        <div class="text-content">
          <p v-if="desc2Key" class="text-1 body-4">{{ $t(desc2Key) }}</p>

          <div class="card-desc">
            <ul v-if="listItems && listItems.length > 0" class="card">
              <li v-for="(itemKey, index) in listItems" :key="`li-${itemKey}-${index}`" class="body-4">
                {{ $t(itemKey) }}
                </li>
            </ul>
          </div>

          <div class="buttons btn-movil" v-if="buttons && buttons.length > 0">
            <template v-for="(button, index) in buttons" :key="`btn-${index}`">
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

              <button v-else-if="button.type === 'scroll' && button.targetId" @click="() => scrollToSection(button.targetId)" :class="button.class || 'primary-button-medium'">
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
import '~/assets/scss/components/trading/accounts/your-opportunity.scss'

const localPath = useLocalePath();

const props = defineProps({
  titleKey: { 
    type: String,
    default: ''
  },
  descKey: { 
    type: String,
    default: ''
  },
  desc2Key: { 
    type: String,
    default: ''
  },
  buttons: { 
    type: Array,
    default: () => []
  },
  listItems: { 
    type: Array,
    default: () => [], 
    validator: (value) => value.every(item => typeof item === 'string')
  }
});

const scrollToSection = (targetId = 'formulario') => {
  const element = document.getElementById(targetId);
  if (!element) {
    console.warn(`Scroll target element with ID "${targetId}" not found.`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offset = 80;
  const targetPosition = elementPosition - offset;

  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 1500; 
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