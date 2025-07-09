<template>
  <div class="dropdown-languages">
    <div class="dropdown-toggle" @click.stop="toggleDropdown" id="dropdown">
      <img :src="selectedOption.image" class="dropdown-option-image" :alt="selectedOption.alt" sizes="100px"/>
      <span class="dropdown-option-label">{{ selectedOption.label }}</span>
      <span class="material-symbols-outlined" translate="no">expand_more</span>
    </div>
    <transition name="fade" mode="out-in">
      <div class="opt-languages" v-show="isDropdownOpen" id="subpages-opt">
        <ul class="dropdown-menu">
          <NuxtLink  v-for="option in options" :key="option.value" :to="switchLocalePath(option.value)">
            <img :src="option.image" class="dropdown-option-image" :alt="option.alt" sizes="100px"/>
            <span class="dropdown-option-label">{{ option.label }}</span>
          </NuxtLink>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { locale } = useI18n();

const switchLocalePath = useSwitchLocalePath()
const route = useRoute();
const router = useRouter();
const isDropdownOpen = ref(false);

const options = [
  { label: "ENG", image: "/icons/USA.svg", alt: "English", value: "en" },
  { label: "ESP", image: "/icons/Spain.svg", alt: "Español", value: "es" },
  // { label: "POR", image: "/icons/Brazil.svg", alt: "Portuguese", value: "pt-BR" },
  // { label: "JPN", image: "/icons/Japan.svg", alt: "Japanese", value: "ja-JP" }
];

const selectedOption = ref(options[0]);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    document.addEventListener('click', handleDocumentClick);
  } else {
    document.removeEventListener('click', handleDocumentClick);
  }
};

const handleDocumentClick = (e) => {
  if (!e.target.closest("#dropdown") && !e.target.closest("#subpages-opt")) {
    isDropdownOpen.value = false;
    document.removeEventListener('click', handleDocumentClick);
  }
};

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
});

watchEffect(() => {
  const languagePrefix = route.path.split('/')[1];
  const matchedOption = options.find((option) => option.value === languagePrefix);
  if (matchedOption) {
    selectedOption.value = matchedOption;
    locale.value = matchedOption.value;
  } else {
    selectedOption.value = options[0];
    locale.value = 'en';
  }
});
</script>
