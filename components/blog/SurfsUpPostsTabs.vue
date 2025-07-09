<template>
  <div class="margin-general container-tabs">
    <div class="container">
      <h2 v-if="!useLinks">{{ $t('blog.tabs.title') }}</h2>

      <div v-if="error">
        <p>Error: {{ error }}</p>
      </div>

      <div v-else-if="loading">
        <Skeleton height="4rem" class="mb-5 mt-5" />
        <div class="flex gap-3 mb-4 cards">
          <Skeleton v-for="n in 3" :key="`top-${n}`" width="33.33%" height="30rem" borderRadius="18px" />
        </div>
        <div class="flex gap-4 cards">
          <Skeleton v-for="n in 3" :key="`bottom-${n}`" width="33.33%" height="30rem" borderRadius="18px" />
        </div>
        <div class="flex mt-4 justify-content-center">
          <Skeleton width="5rem" height="3rem" borderRadius="12px" />
        </div>
      </div>

      <div v-else-if="!categories.length">
        <p>No categories found.</p>
      </div>

      <div v-else class="cont-general" v-if="tabs.length">
        <div class="select-custom selectItem">
          <div class="select-content" :class="{ active: showSelectOptions }">
            <div class="select-toggle" @click.stop="toggleSelect">
              {{ activeTabLabel }}
              <span class="material-symbols-outlined" translate="no">
                {{ showSelectOptions ? 'expand_less' : 'expand_more' }}
              </span>
            </div>
            <div class="select-options" v-if="showSelectOptions">
              <template v-if="useLinks">
                <NuxtLink
                  v-for="tab in tabs"
                  :key="tab.value"
                  class="select-option"
                  :class="{ activeTab: selected === tab.value }"
                  :to="localPath(`/blog/${getCategorySlug(tab.value)}`)"
                  @click.stop="closeSelect()"
                >
                  {{ tab.label }}
                </NuxtLink>
              </template>
              <template v-else>
                <div
                  v-for="tab in tabs"
                  :key="tab.value"
                  class="select-option"
                  :class="{ activeTab: localSelected === tab.value }"
                  @click.stop="selectTab(tab.value); closeSelect()"
                >
                  {{ tab.label }}
                </div>
              </template>
            </div>
          </div>
          <searchcomponent :placeholder="$t('blog.search')" />
        </div>

        <div class="buttonsContainer" ref="buttonsContainer">
          <div class="buttons-cont">
            <template v-if="useLinks">
              <NuxtLink
                v-for="tab in tabs"
                :key="tab.value"
                class="buttonItem"
                :class="{ selected: selected === tab.value }"
                :to="localPath(`/blog/${getCategorySlug(tab.value)}`)"
              >
                {{ tab.label }}
              </NuxtLink>
            </template>
            <template v-else>
              <button
                v-for="tab in tabs"
                :key="tab.value"
                class="buttonItem"
                :class="{ selected: localSelected === tab.value }"
                @click="selectTab(tab.value)"
              >
                {{ tab.label }}
              </button>
            </template>
            <span class="selected-border" :style="borderStyle">
              <div class="border-style"></div>
            </span>
          </div>
          <searchcomponent :placeholder="$t('blog.search')" />
        </div>

        <template v-if="!useLinks">
          <Transition name="fade" mode="out-in">
            <div
              v-if="!loading && localSelected && Array.isArray(postsByCategory[localSelected]) && postsByCategory[localSelected].length > 0"
              class="links-article"
              :key="localSelected"
            >
              <ul>
                <li v-for="post in postsByCategory[localSelected].slice(0, 3)" :key="post.id">
                  <NuxtLink :to="postLink(localSelected, post.slug)">
                    <div
                      class="bg-image"
                      :style="{ backgroundImage: `url(${post.yoast_head_json?.og_image?.[0]?.url || ''})` }"
                      aria-label="Post Image"
                      role="img"
                    ></div>
                    <p class="heading-h4" v-html="post.title.rendered"></p>
                  </NuxtLink>
                </li>
              </ul>
              <NuxtLink
                class="button second-button-medium"
                :to="localPath(`/blog/${getCategorySlug(localSelected)}`)"
              >
              {{ $t('blog.tabs.btn') }}
              </NuxtLink>
            </div>

            <div
              v-else-if="!loading && localSelected && Array.isArray(postsByCategory[localSelected]) && postsByCategory[localSelected].length === 0"
              class="links-article"
              :key="localSelected + '-empty'"
            >
              <h2>{{ activeTabLabel }}</h2>
              <p>No articles found for this category.</p>
            </div>
          </Transition>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, watch, nextTick, computed } from 'vue';
import { useWordPress } from '~/composables/useWordPress';
import { useRoute, useLocalePath } from '#imports';
// import Skeleton from 'primevue/skeleton';
import searchcomponent from '~/components/blog/search-surfs-up.vue';

const props = defineProps({
  useLinks: Boolean,
  allowedSlugs: {
    type: Array,
    default: () => []
  }
});

const localPath = useLocalePath();
const route = useRoute();
const { fetchAllowedCategories, fetchPostsOnlyTVM } = useWordPress();

const categories = ref([]);
const posts = ref([]);
const tabs = ref([]);
const localSelected = ref(null);
const loading = ref(true);
const error = ref(null);
const buttonsContainer = ref(null);
const selectedButtonIndex = ref(0);
const borderStyle = ref({});
const showSelectOptions = ref(false);

const selected = computed(() => {
  if (!props.useLinks) return null;
  const slug = (route.params.category || route.path.split('/').pop() || '').toString().trim().toLowerCase();
  const matched = categories.value.find(c => c.slug.trim().toLowerCase() === slug);
  return matched?.id || null;
});

// Watch para forzar selección si no hay coincidencia
watch([
  categories,
  () => route.params.category
], ([newCategories, newSlug]) => {
  if (!props.useLinks) return;
  const slug = (newSlug || route.path.split('/').pop() || '').toString().trim().toLowerCase();
  const matched = newCategories.find(c => c.slug.trim().toLowerCase() === slug);
  if (!matched && newCategories.length > 0) {
    // Si no hay coincidencia, selecciona el primero
    // No podemos modificar selected porque es computed, pero podemos redirigir
    // o sugerir al usuario el primero
    // Aquí podrías hacer un redirect automático si lo deseas
  }
});

const activeTabLabel = computed(() => {
  const id = props.useLinks ? selected.value : localSelected.value;
  const found = tabs.value.find(t => t.value === id);
  if (found) return found.label;
  if (tabs.value.length > 0) return tabs.value[0].label;
  return 'Selecciona una categoría';
});

const postsByCategory = computed(() => {
  const grouped = {};
  categories.value.forEach((cat) => {
    grouped[cat.id] = posts.value.filter(
      (p) => Array.isArray(p.categories) && p.categories.includes(cat.id)
    );
  });
  return grouped;
});

function selectTab(categoryId) {
  localSelected.value = categoryId;
  const found = tabs.value.find(tab => tab.value === categoryId);
  if (found) selectedButtonIndex.value = tabs.value.indexOf(found);
  nextTick(updateBorderBottomStyle);
}

function initializeBorderBottomStyle() {
  const button = buttonsContainer.value?.children[selectedButtonIndex.value];
  if (button) {
    borderStyle.value = {
      width: `${button.offsetWidth}px`,
      left: `${button.offsetLeft}px`
    };
  }
}

function updateBorderBottomStyle() {
  nextTick(() => {
    const activeElement = props.useLinks
      ? document.querySelector('.buttonsContainer .router-link-active.router-link-exact-active')
      : document.querySelector('.buttonsContainer .buttonItem.selected');

    if (activeElement) {
      borderStyle.value = {
        width: `${activeElement.offsetWidth}px`,
        left: `${activeElement.offsetLeft}px`
      };
    }
  });
}

function toggleSelect() {
  showSelectOptions.value = !showSelectOptions.value;
}

function closeSelect() {
  showSelectOptions.value = false;
}

const CUSTOM_ORDER = [
  'Most Recent'
];

function sortByCustomOrder(a, b) {
  const iA = CUSTOM_ORDER.indexOf(a.name);
  const iB = CUSTOM_ORDER.indexOf(b.name);
  if (iA !== -1 && iB !== -1) return iA - iB;
  if (iA !== -1) return -1;
  if (iB !== -1) return 1;
  return a.name.localeCompare(b.name);
}

onMounted(async () => {
  try {
    const categoriesData = await fetchAllowedCategories(props.allowedSlugs);
    categories.value = Array.isArray(categoriesData)
      ? categoriesData.sort(sortByCustomOrder)
      : [];

    const postsData = await fetchPostsOnlyTVM();
    posts.value = postsData || [];

    tabs.value = categories.value.map((cat) => ({
      label: cat.name,
      value: cat.id
    }));

    if (!props.useLinks && tabs.value.length > 0) {
      localSelected.value = tabs.value[0].value;
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    error.value = err.message || 'Error fetching data';
  } finally {
    loading.value = false;
  }

  initializeBorderBottomStyle();
  updateBorderBottomStyle();
  window.addEventListener('resize', updateBorderBottomStyle);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateBorderBottomStyle);
});

function getCategorySlug(categoryId) {
  const found = categories.value.find((c) => c.id === categoryId);
  return found ? found.slug : '';
}

function postLink(categoryId, postSlug) {
  const catSlug = getCategorySlug(categoryId);
  return localPath(`/blog/${catSlug}/${postSlug}`);
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
