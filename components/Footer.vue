<template>
  <div class="footer">
    <div class=" margin-general">
      <div class="grid-container-links">
        <div class="grid-item">
          <NuxtLink :to="localPath('/')" class="caption-1">
            {{ $t("menu.home") }}
          </NuxtLink>
          <NuxtLink :to="localPath('/services/vulkan/')" class="caption-1">
            {{ $t("menu.vulkanBridge") }}
          </NuxtLink>
          <NuxtLink :to="localPath('/services/communitraders/')" class="caption-1">
            {{ $t("menu.communiTraders") }}
          </NuxtLink>
        </div>
        <div class="grid-item">
          <NuxtLink :to="localPath('/services/multimam/')" class="caption-1">
            {{ $t("menu.MultiMAA") }}
          </NuxtLink>
          <NuxtLink :to="localPath('/services/risk-monitor/')" class="caption-1">
            {{ $t("menu.riskmonitor") }}
          </NuxtLink>
          <NuxtLink :to="localPath('/about/')" class="caption-1">
            {{ $t("menu.about") }}
          </NuxtLink>
        </div>

        <div class="grid-item last-item">
          <div>
            <NuxtLink
            :to="localPath('/contact/')"
            class="title-item body-3-bold"
            style="display: block; text-decoration: none"
            >{{ $t(contanctUs.title) }}</NuxtLink
            >
            <!-- <p class="title-item body-3-bold">{{ $t(contanctUs.title) }}</p> -->
            <ul class="social-media-group">
              <li
                class="social-media-circle"
                v-for="(item, index) in contanctUs.subHyperlinks"
                :key="index"
              >
                <a :href="item.path" target="_blank" rel="noopener noreferrer">
                  <img
                    :src="item.icon"
                    preload
                    width="24"
                    height="24"
                    :alt="item.alt"
                  />
                </a>
              </li>
            </ul>
          </div>
          <img
            src="/images/home/logo-footer.svg"
            class="logo-footer"
            :alt="$t('menu.altlogo')"
            width="234px"
            height="54px"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="legal-info">
    <div class="grid-container-info margin-general">
      <div class="cont-disclaimer">
        <p class="caption-2" >{{ $t("footer.text1") }}</p>
        <p class="caption-2" v-html="formatContent('footer.text2', $t, localPath)"></p>
        <p class="caption-2" v-html="formatContent('footer.text3', $t, localPath)"></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatContent } from '~/utils/formatContent';
// import Dropdown from "./../components/utils/dropdown/Dropdown.vue";

const localPath = useLocalePath();

const socialMediaLinks = [
  { name: "footer.contactUsLinkedin", icon: "/images/linkedin.svg", alt: "Linkedin", path: "https://www.linkedin.com/company/vulkan-prime/" },
  // { name: "footer.contactUsInstagram", icon: "/images/instagram.svg", alt: "Instagram", path: "https://www.instagram.com/tradeviewmarkets?igsh=Z3ZtZGtpYnI0MXJx" },
];

const contanctUs = computed(() => {
  return {
    title: "footer.contactUsTitle", 
    subHyperlinks: socialMediaLinks, 
  };
});

</script>

<style lang="scss">
  @import '~/assets/scss/components/footer.scss';
</style>
