<template>
  <nav class="navbar" :class="{ 'fixed-element': isFixed }">
    <div class="navbar-container">
      <div class="logo">
        <NuxtLink :to="localPath('/')">
          <img src="/images/logo-main.svg" :alt="$t('menu.altlogo')" width="270" height="34" :loading="isMobile ? 'lazy' : undefined"/>
        </NuxtLink>
        <NuxtLink :to="localPath('/')">
          <img src="/images/logo-main-mobile.svg" :alt="$t('menu.altlogo')" class="tablet" width="29" height="30" />
        </NuxtLink>
      </div>
      <div class="options" id="options">
        <ul>
          <li
            v-for="(item, index) in navItems"
            :key="index"
            class="itemMenu"
          >
            <template v-if="!item.subpages">
              <NuxtLink
                :to="localPath(item.link)"
                class="nav-link"
                @click="closeMenu"
              >
                {{ $t(item.text) }}
              </NuxtLink>
            </template>
            <template v-else>
              <span
                @click.prevent="handleItemClick(item, $event)"
                class="menu-link"
              >
                {{ $t(item.text) }}
                <span
                  v-if="item.subpages"
                  class="material-symbols-outlined"
                  translate="no"
                  :class="{
                    'arrow-rotate': insNavbarOpen && itemSelected === item.text,
                  }"
                >
                  expand_more
                </span>
              </span>
            </template>
          </li>
        </ul>
        <div class="opt">
          <LanguagesModal />
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        class="subpages"
        ref="submenuContent"
        v-show="insNavbarOpen"
        id="subpages"
        @mouseleave="closeMenu"
      >
        <div class="content-mayor">
          <div
            class="content-items"
            ref="contentItems"
          >
            <div
              v-for="(item, i) in navItems"
              :key="i"
              :class="item.class"
              class="group-items"
            >
              <div v-for="(sub, j) in item.subpages" :key="j">
                <div v-if="itemSelected === item.text">
                  <p>
                    <NuxtLink
                      class="nav-link"
                      :class="sub.class ? sub.class : ''"
                      :to="localPath(sub.link)"
                      @click="insNavbarOpen = false"
                    >
                      {{ $t(sub.text) }}
                    </NuxtLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import LanguagesModal from "@/components/defaultLayout/LanguagesModal.vue";
// import '~/assets/scss/components/navbar.scss'

const { locale } = useI18n();
const localPath = useLocalePath();
const isFixed = ref(false);
const insNavbarOpen = ref(false);
const itemSelected = ref("");
const submenuContent = ref(null);
const contentItems = ref(null);
const isMobile = ref(false);
const navItems = ref([
  {
    text: "menu.home",
    link: "/",
  },
  {
    text: "menu.services",
    class: "services",
    subpages: [
      {
        text: "menu.vulkanBridge",
        link: "/services/vulkan/",
        class: "body-4",
      },
      {
        text: "menu.communiTraders",
        link: "/services/communitraders/",
        class: "body-4",
      },
      {
        text: "menu.MultiMAA",
        link: "/services/multimam/",
        class: "body-4",
      },
      {
        text: "menu.riskmonitor",
        link: "/services/risk-monitor/",
        class: "body-4",
      },
    ],
  },
  {
    text: "menu.about",
    link: "/about/",
  },
  {
    text: "menu.blog",
    link: "/blog/",
  },
  {
    text: "menu.contact",
    link: "/contact/",
  },
]);
const openMenu = (menuText, event) => {
  const menuItem = event.currentTarget;

  if (insNavbarOpen.value && itemSelected.value === menuText) {
    insNavbarOpen.value = false;
    itemSelected.value = "";
  } else {
    insNavbarOpen.value = true;
    itemSelected.value = menuText;

    // Calcula la posición `left` del ítem seleccionado
    const menuLeftPosition = menuItem.getBoundingClientRect().left;

    // Aplica la posición al contenedor `content-items`
    if (contentItems.value) {
      contentItems.value.style.left = `${menuLeftPosition}px`;
    }
  }
};

const closeMenu = () => {
  insNavbarOpen.value = false;
  itemSelected.value = "";
};

const handleItemClick = (item, event) => {
  if (item.subpages) {
    openMenu(item.text, event);
  } else {
    closeMenu();
  }
};

const handleScroll = () => {
  const alturaUmbral = 50;
  let scrollY = window.scrollY;

  isFixed.value = scrollY >= alturaUmbral;
};

// Función para verificar el tamaño de la pantalla
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  checkMobile(); // Llama al inicio para establecer el valor inicial
  window.addEventListener("resize", checkMobile); // Agrega el listener para cambios de tamaño
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", checkMobile); // Elimina el listener
});
</script>

<style lang="scss">
  @import '~/assets/scss/components/navbar.scss';

.menu-items {
  overflow-y: auto;
  max-height: calc(100vh - 96px);
  overflow-x: hidden;
}
.fixed-element {
  position: fixed;
  top: 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.content-items {
transition: left 0.3s ease;
}
</style>