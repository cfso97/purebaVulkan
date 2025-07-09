<template>
  <transition v-if="show" name="fade">
    <div class="preloader">
      <div class="preLogo">
        <img class="svgAnimated" src="/images/new_loader.gif" alt="" />
      </div>
      <!-- <div class="circles">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
         <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
      </div> -->
    </div>
  </transition>
</template>

<script>
export default {
  name: "Preloader",
  props: {
    manualTrigger: {
      type: Boolean,
      default: false, // Si es true, el preloader se activa manualmente
    },
    duration: {
      type: Number,
      default: 2900, // Duración en milisegundos antes de ocultarse
    },
  },
  data() {
    return {
      show: !this.manualTrigger, // Solo se muestra automáticamente si `manualTrigger` es false
    };
  },
  mounted() {
    if (!this.manualTrigger) {
      this.showToggle();
    }
  },
  methods: {
    showToggle() {
      setTimeout(() => {
        this.show = false;
      }, this.duration);
    },
    triggerPreloader() {
      this.show = true;
      this.showToggle();
    },
  },
};
</script>

<style scoped>
.preloader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000000d4;
  z-index: 99999;
  top: 0px;
  left: 0px;
}

.preloader .preLogo {
  display: flex;
  width: 100px;
  max-width: 100px;
  min-width: 100px;
  height: auto;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.preloader .preLogo .svgAnimated {
  max-width: 100px;
  max-height: 100px;
  margin-top: -40px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

