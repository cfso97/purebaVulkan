<template>
  <div class="unlock-power-content margin-general">
    <div class="unlock-power-text">
      <h2 class="unlock-power-title">
        {{ $t("services.vulkan.unlock-power.title") }}
      </h2>
      <p class="unlock-power-description">
        {{ $t("services.vulkan.unlock-power.description") }}
      </p>
      <div class="unlock-power-video">
        <video
          ref="video"
          class="video"
          autoplay
          loop
          muted
          playsinline
        >
          <source src="/images/vulkan_bridge/video.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="unlock-power-box">
        <div
          v-for="(item, index) in cards"
          :key="index"
          class="box"
          :class="activeIndex === index ? 'active' : ''"
        >
          <div v-if="activeIndex === index" class="box-img">
            <span class="material-symbols-outlined" translate="no">{{ item.icon }}</span>
          </div>
          <div class="box-body">
            <div class="box-title" @click="setActive(index)">
              <p class="title body-3">{{ $t(item.title) }}</p>
              <img
                src="/images/small-down.svg"
                alt=""
                :class="activeIndex === index ? 'rotated' : ''"
              />
            </div>
            <div v-if="activeIndex === index" class="box-text">
              <p v-for="(item2, index2) in item.texts" :key="index2">
                {{ $t(item2) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="unlock-power-video">
      <video
        ref="video"
        class="video desktop"
        autoplay
        loop
        muted
        playsinline
      >
        <source src="/images/vulkan_bridge/video.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    setActive(index) {
      this.activeIndex = index;
    },
  },
  data() {
    return {
      activeIndex: 0,
      cards: [
        {
          icon: "arrow_selector_tool",
          title: "services.vulkan.unlock-power.title-1",
          texts: ["services.vulkan.unlock-power.text-1"],
        },
        {
          icon: "layers",
          title: "services.vulkan.unlock-power.title-2",
          texts: ["services.vulkan.unlock-power.text-2"],
        },
        {
          icon: "error",
          title: "services.vulkan.unlock-power.title-3",
          texts: ["services.vulkan.unlock-power.text-3"],
        },
        {
          icon: "headset_mic",
          title: "services.vulkan.unlock-power.title-4",
          texts: ["services.vulkan.unlock-power.text-4"],
        },
        {
          icon: "acute",
          title: "services.vulkan.unlock-power.title-5",
          texts: ["services.vulkan.unlock-power.text-5"],
        },
        {
          icon: "fullscreen_exit",
          title: "services.vulkan.unlock-power.title-6",
          texts: ["services.vulkan.unlock-power.text-6"],
        },
      ],
    };
  },
};
</script>
