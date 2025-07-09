<template>
  <div class="tailored-solution-content margin-general">
    <div class="tailored-solution-text">
      <div class="tailored-solution-text-content">
        <h2>{{ $t("services.vulkan.tailored-solution.title") }}</h2>
        <p>{{ $t("services.vulkan.tailored-solution.description") }}</p>
        <NuxtLink @click="handleLearnMoreClick">
          <button>{{ $t("services.vulkan.button.use") }}</button>
        </NuxtLink>
      </div>
    </div>
    <div class="tailored-solution-carousel">
      <swiper
        :spaceBetween="20"
        :slidesPerView="1.5"
        :loop="true"
        :navigation="false"
        :pagination="{ clickable: true }"
        :modules="modules"
        class="swiper with-icons"
        :breakpoints="{
          '768': {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          '750': {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          '581': {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          '375': {
            slidesPerView: 1.3,
            spaceBetween: 20,
          },
          '100': {
            slidesPerView: 1.1,
            spaceBetween: 20,
          },
        }"
      >
        <swiper-slide class="content-slide">
          <div class="img-box">
            <img src="/images/vulkan_bridge/logo-1.svg" alt="Ultimate broker solution"/>
          </div>
          <p class="title">
            {{ $t("services.vulkan.tailored-solution.card-1.title") }}
          </p>
          <p class="description">
            {{ $t("services.vulkan.tailored-solution.card-1.description") }}
          </p>
          <ul>
            <li>{{ $t("services.vulkan.tailored-solution.card-1.text-1") }}</li>
            <li>{{ $t("services.vulkan.tailored-solution.card-1.text-2") }}</li>
            <li>{{ $t("services.vulkan.tailored-solution.card-1.text-3") }}</li>
          </ul>
        </swiper-slide>
        <swiper-slide class="content-slide">
          <div class="img-box">
            <img src="/images/vulkan_bridge/logo-2.svg" alt="Dedicated bridge service"/>
          </div>
          <p class="title">
            {{ $t("services.vulkan.tailored-solution.card-2.title") }}
          </p>
          <p class="description">
            {{ $t("services.vulkan.tailored-solution.card-2.description") }}
          </p>
          <ul>
            <li>{{ $t("services.vulkan.tailored-solution.card-2.text-1") }}</li>
            <li>{{ $t("services.vulkan.tailored-solution.card-2.text-2") }}</li>
          </ul>
        </swiper-slide>
        <swiper-slide class="content-slide">
          <div class="img-box">
            <img src="/images/vulkan_bridge/logo-3.svg" alt="Liquidity provider services"/>
          </div>
          <p class="title">
            {{ $t("services.vulkan.tailored-solution.card-3.title") }}
          </p>
          <p class="description">
            {{ $t("services.vulkan.tailored-solution.card-3.description") }}
          </p>
          <ul>
            <li>{{ $t("services.vulkan.tailored-solution.card-3.text-1") }}</li>
            <li>{{ $t("services.vulkan.tailored-solution.card-3.text-2") }}</li>
          </ul>
        </swiper-slide>
        <NuxtLink @click="handleLearnMoreClick">
          <button>{{ $t("services.vulkan.button.use") }}</button>
        </NuxtLink>
      </swiper>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
  methods: {
  handleLearnMoreClick() {
    // Accede al elemento con la clase 'forms' y cambia su estilo
    const formsElement = document.querySelector('.forms');
    if (formsElement) {
      // Cambia el estilo a 'flex'
      formsElement.style.display = 'flex';

      // Realiza un scroll hasta el elemento
      formsElement.scrollIntoView({ behavior: 'smooth' });
    }
  },
}, 
};
</script>
