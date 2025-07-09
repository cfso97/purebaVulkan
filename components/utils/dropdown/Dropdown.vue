<template>
  <div class="dropdown">
    <div class="dropdown-header" @click="toggleDropdown()">
      <p class="title body-4-bold">{{ title }}</p>
      <div class="close">
        <img src="/images/expand_more.svg" :class="{ rotate: showDropdown }" />
      </div>
    </div>
    <div v-if="showDropdown" class="dropdown-content">
      <div
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
      >
        <p class="option body-4" v-if="!option.path">{{ $t(option.name) }}</p>
        <NuxtLink
          v-if="option.path"
          :to="localPath(option.path)"
          style="padding: 0"
          ><p class="option body-4">{{ $t(option.name) }}</p></NuxtLink
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const localPath = useLocalePath();
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
});

const showDropdown = ref(false);
const selectedOption = ref(null);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function selectOption(option) {
  // Add your logic here
}
</script>
