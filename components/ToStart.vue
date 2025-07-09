<template>
   <div class="to-start">
    <div class="content margin-general">
     <div class="content-text">
      <div>
       <h2>{{ $t("risk-monitors.toStart.title") }}</h2>
      </div>
      <div class="card">
       <ul>
        <li class="body-4" v-for="(item, index) in itemsList" :key="index">
         {{ $t(item.value) }}
        </li>
       </ul>
      </div>
     </div>
     <div class="content-img">
      <h2>{{ $t("risk-monitors.toStart.title") }}</h2>
      <NuxtImg
        :src="img" :alt="alt_img"
      />
     </div>
    </div>
   </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';

  const props = defineProps({
    img: String,
    alt_img: String,
  });
  
  const itemsList = ref([
   { value: "risk-monitors.toStart.item1" },
   { value: "risk-monitors.toStart.item2" },
   { value: "risk-monitors.toStart.item3" },
  ]);
  </script>

<style lang="scss"d>
  @import '~/assets/scss/components/trading/accounts/toStart.scss';
</style>