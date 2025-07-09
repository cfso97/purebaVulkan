<template>
  <client-only>
    <div
      class="navbar-mobile"
      v-if="isMobile"
      :class="{ 'fixed-element': isFixed }"
    >
      <div class="menu-header">
        <NuxtLink :to="localPath('/')" class="link-logo"
          ><img src="/images/logo-main-mobile.svg" :alt="$t('menu.altlogo')" class="logo" width="29" height="30"
        /></NuxtLink>
        <div class="secound-column">
          <LanguagesModal />
          <div
            @click="toggleMenu"
            class="hamburger-icon"
            :class="{ active: isMenuOpen }"
          >
            <span class="material-symbols-outlined" translate="no" v-if="isMenuOpen">close</span>
            <span class="material-symbols-outlined" translate="no" v-if="!isMenuOpen">menu</span>
          </div>
        </div>
      </div>

      <div v-if="isMenuOpen" class="menu-items" ref="menuItems">
        <div
          v-for="(item, index) in navItems"
          :key="index"
          class="menu-item"
          :class="item.class"
        >
          <NuxtLink
            v-if="!item.subpages"
            :to="localPath(item.link)"
            @click="closeDropdowns"
            class="title-sub-menu"
          >
            <p>{{ $t(item.text) }}</p>
          </NuxtLink>
          <span
            v-else
            @click="toggleSubmenu(index)"
            class="title-sub-menu"
            :class="item.showSubmenu ? 'caption-bold' : ''"
            :style="item.showSubmenu ? 'color: #15202A;' : ''"
          >
            {{ $t(item.text) }}
            <span
              class="material-symbols-outlined" translate="no"
              :class="{ 'arrow-rotate': item.showSubmenu }"
              >expand_more</span
            >
          </span>
          <!-- first dropdown -->
          <div v-if="item.subpages && item.showSubmenu" class="sub-menu">
            <div
              v-for="(subpage, subIndex) in item.subpages"
              :key="subIndex"
              class="subpage"
            >
              <NuxtLink
                v-if="!subpage.subsubpage"
                :to="localPath(subpage.link)"
                @click="closeDropdowns"
                class="title-sub-menu"
              >
                <p>{{ $t(subpage.text) }}</p>
              </NuxtLink>
              <span
                v-else
                @click="toggleSubmenu2(index, subIndex)"
                class="title-sub-menu"
                :class="subpage.showSubmenu2 ? 'caption-bold' : ''"
                :style="
                  subpage.showSubmenu2
                    ? 'background: rgba(164, 176, 189, 0.25);'
                    : ''
                "
              >
                {{ $t(subpage.text) }}
                <span
                  class="material-symbols-outlined"
                  :class="{ 'arrow-rotate': subpage.showSubmenu2 }"
                  >expand_more</span
                >
              </span>
              <!-- secound dropdown -->
              <div
                v-if="subpage.subsubpage && subpage.showSubmenu2"
                class="sub-menu"
              >
                <div
                  v-for="(subsubpage, subsubIndex) in subpage.subsubpage"
                  :key="subsubIndex"
                  class="subpage"
                >
                  <NuxtLink
                    :to="localPath(subsubpage.link)"
                    @click="closeDropdowns"
                    class="subsubpage"
                  >
                    {{ $t(subsubpage.text) }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </client-only>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import LanguagesModal from "@/components/defaultLayout/LanguagesModal.vue";

const localPath = useLocalePath();
const isMenuOpen = ref(false);
const isFixed = ref(false);
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
      },
      {
        text: "menu.communiTraders",
        link: "/services/communitraders/",
      },
      {
        text: "menu.MultiMAA",
        link: "/services/multimam/",
      },
      {
        text: "menu.riskmonitor",
        link: "/services/risk-monitor/",
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
const route = useRoute();
const router = useRouter();

const closeAllMenus = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = ""; // Restablecer el desbordamiento del cuerpo
  navItems.value.forEach((item) => {
    item.showSubmenu = false;
    if (item.subpages) {
      item.subpages.forEach((subpage) => {
        subpage.showSubmenu2 = false;
      });
    }
  });
};

watch(
  () => route.path,
  () => {
    closeAllMenus();
  }
);

const menuItemsRef = ref(null);

const toggleSubmenu = (index) => {
  closeOtherSubmenus(index, 1);
  navItems.value[index].showSubmenu = !navItems.value[index].showSubmenu;
};

const toggleSubmenu2 = (itemIndex, subIndex) => {
  navItems.value[itemIndex].subpages[subIndex].showSubmenu2 = !navItems.value[itemIndex].subpages[subIndex].showSubmenu2;

  // Cerrar otros sub-submenús abiertos en el mismo submenú
  navItems.value[itemIndex].subpages.forEach((subpage, index) => {
    if (index !== subIndex) {
      subpage.showSubmenu2 = false;
    }
  });
};

const closeOtherSubmenus = (index, level) => {
  const navItemsArray = navItems.value;

  if (level === 1) {
    navItemsArray.forEach((item, itemIndex) => {
      if (itemIndex !== index && item.showSubmenu) {
        item.showSubmenu = false;
        if (item.subpages) {
          item.subpages.forEach((subpage) => {
            subpage.showSubmenu2 = false;
          });
        }
      }
    });
  } else if (level === 2) {
    const currentItem = navItemsArray[index];
    if (currentItem.subpages) {
      currentItem.subpages.forEach((subpage, subIndex) => {
        if (subIndex !== index && subpage.showSubmenu2) {
          subpage.showSubmenu2 = false;
        }
      });
    }
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Toggle body overflow
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeDropdowns = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = ""; // Asegurar que el estilo de desbordamiento del cuerpo se restablece
  if (menuItemsRef.value) {
    navItems.value.forEach((item) => {
      if (item.showSubmenu) {
        item.showSubmenu = false;
      }
      if (item.subpages) {
        item.subpages.forEach((subpage) => {
          if (subpage.showSubmenu2) {
            subpage.showSubmenu2 = false;
          }
        });
      }
    });
  }
};

// Detección de tamaño de pantalla
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUpdated(() => {
  if (menuItemsRef.value) {
    menuItemsRef.value.addEventListener("blur", closeDropdowns);
  }
});
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
  if (menuItemsRef.value) {
    menuItemsRef.value.removeEventListener("blur", closeDropdowns);
  }
});

const gotToRegister = () => {
  router.push(localPath("/accounts/register"));
  closeDropdowns();
};

const gotToLogin = () => {
  router.push(localPath("/cabinet/login"));
  closeDropdowns();
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const alturaUmbral = 50;
  let scrollY = window.scrollY;

  isFixed.value = scrollY >= alturaUmbral;
};
</script>

<style lang="scss">
  @import '~/assets/scss/components/navbar-mobile.scss';

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
</style>