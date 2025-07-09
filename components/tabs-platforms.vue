<template>
  <div class="tools-content margin-general">
   <h2 v-if="generalTitleKey">{{ $t(generalTitleKey) }}</h2>
 
   <client-only> <!-- AGREGADO: Envuelve SelectCustom en client-only -->
     <SelectCustom
      v-if="tabs && tabs.length > 0"
      class="selectItem"
      :options="tabs"
      v-model="selected"
      @update:modelValue="selectTab($event)"
     />
   </client-only>
 
   <!-- Nuevo wrapper para el contenedor de botones y los indicadores de scroll -->
   <div v-if="tabs && tabs.length > 0" class="tabs-wrapper">
     <div class="buttonsContainer" ref="buttonsContainerRef">
          <button
     v-for="(tab, index) in tabs"
     :key="tab.value || index"
     class="buttonItem"
     :class="{ selected: selected === tab.value }"
     @click="selectTab(tab.value)"
    >
     {{ $t(tab.label) }}
    </button>
    <span class="selected-border" :style="borderStyle">
     <div class="border-style"></div>
    </span>
   </div>
   <!-- Indicador de desplazamiento izquierdo -->
   <div v-if="isMobile" class="scroll-indicator scroll-indicator-left" :class="{ 'fade-out': !showLeftScrollIndicator }" @click="scrollLeftBy">
      <span class="material-symbols-outlined">chevron_left</span>
   </div>
   <!-- Indicador de desplazamiento derecho -->
   <div v-if="isMobile" class="scroll-indicator scroll-indicator-right" :class="{ 'fade-out': !showRightScrollIndicator }" @click="scrollRightBy">
      <span class="material-symbols-outlined">chevron_right</span>
   </div>
  </div>
 
   <div
    v-for="(section, index) in currentContentSections"
    :key="section.id || `section-${index}`"
    class="card-content"
   >
     <h3 v-if="section.desktopTitleKey && isMobile" class="mobile">{{ $t(section.desktopTitleKey) }}</h3>
     
    <nuxt-img v-if="section.imgSrc"
      :src="section.imgSrc"
      class="img-banner"
      :alt="$t(section.imgAltKey || section.desktopTitleKey || 'images.defaultAltText')" 
      :width="section.width"
      :height="section.height"
      format="avif, webp"
      quality="85"
      loading="lazy"
      decoding="async"
     />
 
    <div class="content do-for-you-content">
       <h3 v-if="section.desktopTitleKey && !isMobile" class="title">{{ $t(section.desktopTitleKey) }}</h3>
 
       <div v-if="section.cards && section.cards.length > 0" class="do-for-you-right">
      <div v-for="(card, cardIndex) in section.cards" :key="card.id || `card-${cardIndex}`" class="card">
       <div class="img-content">
         <div class="img-box">
          <span v-if="card.icon" class="material-symbols-outlined" translate="no">{{ card.icon }}</span>
         </div>
        </div>
        <div class="text-content">
         <p v-if="card.descriptionKey" class="description" v-html="formatContent(card.descriptionKey, $t, localPath)"></p>
        </div>
      </div>
     </div>
 
     <template v-if="section.descriptionHtmlKeys && section.descriptionHtmlKeys.length > 0">
      <div class="texts">
       <p
        v-for="(descKey, pIndex) in section.descriptionHtmlKeys"
        :key="`desc-${pIndex}`"
        class="description body-4"
        v-html="formatContent(descKey, $t, localPath)"
       >
       </p>
      </div>
     </template>
 
     <template v-if="section.button">
      <NuxtLink v-if="section.button.type === 'internal' && section.button.to" :to="localPath(section.button.to)">
       <button :class="section.button.class || 'primary-button-medium'">
        {{ $t(section.button.text) }}
       </button>
      </NuxtLink>
      <a v-else-if="section.button.type === 'external' && section.button.href" :href="section.button.href" target="_blank" rel="noopener noreferrer">
       <button :class="section.button.class || 'primary-button-medium'">
        {{ $t(section.button.text) }}
       </button>
      </a>
     </template>
    </div> 
   </div> 
 
   <p v-if="globalFooterConfig && globalFooterConfig.textKey" class="body-4 footer-global">
          <template v-if="globalFooterConfig.link && globalFooterConfig.link.textKey">
     <NuxtLink
      v-if="globalFooterConfig.link.type === 'internal' && globalFooterConfig.link.to"
      :to="localPath(globalFooterConfig.link.to)"
      class="footer-link"
     >
      {{ $t(globalFooterConfig.link.textKey) }}
     </NuxtLink>
 
     <a
      v-else-if="globalFooterConfig.link.type === 'external' && globalFooterConfig.link.href"
      :href="globalFooterConfig.link.href"
      target="_blank"
      rel="noopener noreferrer"
      class="footer-link"
     >
      {{ $t(globalFooterConfig.link.textKey) }}
     </a>
 
     <a
      v-else-if="globalFooterConfig.link.type === 'action' && typeof globalFooterConfig.link.onClick === 'function'"
      href="#"
      @click.prevent="globalFooterConfig.link.onClick"
      role="button"
      class="footer-link"
     >
      {{ $t(globalFooterConfig.link.textKey) }}
     </a>
 
     <a
      v-else-if="globalFooterConfig.link.type === 'scroll' && globalFooterConfig.link.targetId"
      href="#"
      @click.prevent="scrollToSection(globalFooterConfig.link.targetId)" role="button"
      class="footer-link"
     >
      {{ $t(globalFooterConfig.link.textKey) }}
     </a>
 
     <span v-if="$t(globalFooterConfig.textKey).length > 0">&nbsp;</span>
    </template>
    <span v-html="$t(globalFooterConfig.textKey)"></span>
   </p>
  </div>
 </template>

<script setup>
  import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
  import SelectCustom from '~/components/utils/select/SelectCustom.vue';

  const localPath = useLocalePath();

  const props = defineProps({
  generalTitleKey: {
    type: String,
    default: ''
  },
  tabs: {
    type: Array,
    default: () => [],
    validator: (tabs) => Array.isArray(tabs) && tabs.every(tab => tab.label && tab.value)
  },
  contentData: {
    type: Object,
    default: () => ({})
  },
  globalFooterConfig: {
    type: Object,
    default: () => ({
    })
  },
  });

  const emit = defineEmits(['tabSelected']);

  const buttonsContainerRef = ref(null);
  const borderStyle = ref({});
  const selectedButtonIndex = ref(0);
  const selected = ref(props.tabs.length > 0 ? props.tabs[0].value : '');
  const showLeftScrollIndicator = ref(false); // Nuevo ref para el indicador izquierdo
  const showRightScrollIndicator = ref(true); // Nuevo ref para el indicador derecho

  // ---- START: Added for screen size detection ----
  const isMobile = ref(false);
  const breakpoint = 768; // Define your breakpoint in pixels

  const checkScreenSize = () => {
  if (typeof window !== 'undefined') { // Ensure window is defined (for SSR safety)
    isMobile.value = window.innerWidth < breakpoint;
  }
  };
  // ---- END: Added for screen size detection ----

  const currentContentSections = computed(() => {
  return props.contentData[selected.value] || [];
  });

  const updateBorderStyle = () => {
  if (!buttonsContainerRef.value || !props.tabs.length) {
  borderStyle.value = { left: '0px', width: '0px' };
  return;
  }
  nextTick(() => {
  const container = buttonsContainerRef.value;
  if (selectedButtonIndex.value >= 0 && selectedButtonIndex.value < container.children.length) {
    const button = container.children[selectedButtonIndex.value];
    // Asegurarse de que `button` exista y tenga las propiedades `offsetLeft` y `offsetWidth`
    if(button && typeof button.offsetLeft !== 'undefined' && typeof button.offsetWidth !== 'undefined') {
      borderStyle.value = {
        left: `${button.offsetLeft}px`,
        width: `${button.offsetWidth}px`,
      };
      // Desplazar el contenedor para centrar el botón seleccionado si está fuera de vista
      const containerScrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;

      if (buttonLeft < containerScrollLeft || (buttonLeft + buttonWidth) > (containerScrollLeft + containerWidth)) {
        // Calcular la posición para centrar el botón
        const newScrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth'
        });
      }
    } else {
      console.warn("Button element not found or lacks properties for border style calculation.");
      borderStyle.value = { left: '0px', width: '0px' };
    }
  } else {
    borderStyle.value = { left: '0px', width: '0px' };
  }
  });
  };

  const selectTab = (tabValue) => {
  const newIndex = props.tabs.findIndex((tab) => tab.value === tabValue);
  if (newIndex !== -1 && selected.value !== tabValue) {
  selected.value = tabValue;
  selectedButtonIndex.value = newIndex;
  updateBorderStyle();
  emit('tabSelected', selected.value);
  } else if (newIndex !== -1) {
  updateBorderStyle();
  }
  };

  const scrollAmount = 150; // Cantidad de píxeles a desplazar

  const scrollLeftBy = () => {
  if (buttonsContainerRef.value) {
    buttonsContainerRef.value.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }
  };

  const scrollRightBy = () => {
  if (buttonsContainerRef.value) {
    buttonsContainerRef.value.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
  };

  const handleScroll = () => {
  if (buttonsContainerRef.value) {
    const { scrollWidth, clientWidth, scrollLeft } = buttonsContainerRef.value;
    const atEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) < 1; // Un pequeño umbral para la detección del final

    showLeftScrollIndicator.value = scrollLeft > 0;
    showRightScrollIndicator.value = (scrollWidth > clientWidth) && !atEnd;
  }
  };

  onMounted(() => {
  checkScreenSize(); // Check initial size
  window.addEventListener('resize', checkScreenSize);

  const initialIndex = props.tabs.findIndex(tab => tab.value === selected.value);
  if (initialIndex !== -1) {
    selectedButtonIndex.value = initialIndex;
  }
  updateBorderStyle();

  nextTick(() => {
    handleScroll();
  });

  if (buttonsContainerRef.value) {
    buttonsContainerRef.value.addEventListener('scroll', handleScroll);
  }

  watch(() => props.tabs, () => {
    const currentIndex = props.tabs.findIndex(tab => tab.value === selected.value);
    if (currentIndex !== -1) {
      selectedButtonIndex.value = currentIndex;
    } else {
      selected.value = props.tabs.length > 0 ? props.tabs[0].value : '';
      selectedButtonIndex.value = props.tabs.length > 0 ? 0 : -1;
    }
    updateBorderStyle();
    nextTick(() => {
      handleScroll();
    });
  }, { deep: true });

  watch(isMobile, (newVal) => {
    if (newVal) {
      nextTick(() => {
        handleScroll();
      });
    } else {
      // Cuando no es móvil, ambos indicadores deben ocultarse o establecerse según el comportamiento deseado de escritorio
      showLeftScrollIndicator.value = false;
      showRightScrollIndicator.value = false;
    }
  });
  });

  onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkScreenSize);
  }
  if (buttonsContainerRef.value) {
    buttonsContainerRef.value.removeEventListener('scroll', handleScroll);
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
  const duration = 1000; 
  let startTime = null;

  const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  const animationStep = (currentTime) => {
  if (startTime === null) startTime = currentTime;
  const timeElapsed = currentTime - startTime;
  const progress = Math.min(timeElapsed / duration, 1);
  const easedProgress = easeInOutCubic(progress);
  window.scrollTo(0, startPosition + distance * easedProgress);
  if (timeElapsed < duration) requestAnimationFrame(animationStep);
  };

  requestAnimationFrame(animationStep);
  };
</script>

<style lang="scss">
  @import '~/assets/scss/components/partners/tools.scss';
</style>