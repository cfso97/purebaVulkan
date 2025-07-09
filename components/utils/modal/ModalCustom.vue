<template>
  <div class="modal-custom" v-if="isVisible">
    <div class="modal-custom-content">
      <div class="modal-header">
        <div class="close-container">
          <img
            class="close-button"
            src="/images/close.svg"
            @click="closeModal"
          />
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style lang="scss">
@import '~/assets/scss/components/utils/ModalCustom/ModalCustom.scss';
</style>
