<template>
  <div class="select-custom">
    <label>{{ label }}</label>
    <div class="select-content" :class="{ active: isDropdownOpen }" @mouseleave="closeDropdown">
      <div class="select-toggle" @click="toggleDropdown">
        <!-- Muestra el placeholder o la opción seleccionada -->
        {{ selectedOption ? $t(selectedOption.label) : $t(placeholder) }}
        <span v-if="isDropdownOpen" class="material-symbols-outlined active" translate="no">expand_less</span>
        <span v-else class="material-symbols-outlined" translate="no">expand_more</span>
      </div>
      <transition name="fade">
        <div v-show="isDropdownOpen" class="select-options" @mouseenter="openDropdown" @mouseleave="closeDropdown">
          <div v-for="option in options" :key="option.value" @click="selectOption(option)" :class="{ active: selectedOption && selectedOption.value === option.value }">
            {{ $t(option.label) }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    options: Array,
    modelValue: String,
    label: String,
    placeholder: {
      type: String,
      default: 'Select an option',
    },
    noDefaultSelection: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['update:modelValue', 'change'],  // Asegúrate de emitir un evento 'change'
  setup(props, { emit }) {
    const isDropdownOpen = ref(false);
    const selectedOption = ref(props.options.find(option => option.value === props.modelValue) || null);

    watch(() => props.modelValue, (newValue) => {
      selectedOption.value = props.options.find(option => option.value === newValue) || null;
      emit('change', newValue);  // Emite el evento 'change' cada vez que cambia el modelo
    });

    const selectOption = (option) => {
      selectedOption.value = option;
      isDropdownOpen.value = false;
      emit('update:modelValue', option.value);
      emit('change', option.value);  // También emite aquí al seleccionar
    };

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const openDropdown = () => {
      isDropdownOpen.value = true;
    };

    const closeDropdown = () => {
      isDropdownOpen.value = false;
    };

    return {
      isDropdownOpen,
      selectedOption,
      toggleDropdown,
      selectOption,
      openDropdown,
      closeDropdown,
    };
  },
};
</script>

<style lang="scss">
@import '~/assets/scss/components/utils/selectCustom/selectCustom.scss';
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>