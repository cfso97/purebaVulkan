<template>
    <div 
      class="content-search" 
      :class="{ 'var-search': searchQuery && hasResults, 'no-search': searchQuery && !hasResults }"
    >
      <div 
        class="search-container" 
        :class="{ 'search-active': enableDynamicClass && isSearchActive }"
      >
        <span 
          class="material-symbols-outlined serch-icon" 
          translate="no" 
          @click="toggleSearch"
        >
          search
        </span>
        <input v-model="searchQuery" :placeholder="placeholder" @input="onInput" />
        <button 
          v-if="isSearchActive || searchQuery" 
          @click="clearSearch" 
          class="close-button" 
          aria-label="Clear search"
        >
          <span class="material-symbols-outlined" translate="no">close</span>
        </button>
      </div>
  
      <div v-if="errorMessage">{{ errorMessage }}</div>
  
      <client-only>
        <div class="results">
          <div class="cont-results">
            <a v-for="post in filteredPosts" :key="post.id" :href="postLink(post.categories[0], post.slug)">
              <h3 v-html="highlightText(post.title.rendered)"></h3>
              <div v-if="post.content?.rendered" class="hidden-content">
                <div v-html="highlightText(post.content.rendered)"></div>
              </div>
            </a>
          </div>
        </div>
      </client-only>
  
      <div class="no-results" v-if="searchQuery && !filteredPosts.length">
        {{ $t('faq.no-result') }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useWordPress } from '~/composables/useWordPress';
  
  const { fetchPostsOnlyTVM  } = useWordPress();
  const { t: $t } = useI18n();
  const searchQuery = ref('');
  const errorMessage = ref('');
  const allPosts = ref([]);
  const isSearchActive = ref(false);
  
  const props = defineProps({
    placeholder: {
      type: String,
      required: true,
    },
    enableDynamicClass: {
      type: Boolean,
      default: false,
    }
  });
  
  onMounted(async () => {
    try {
      allPosts.value = await fetchPostsOnlyTVM ();
    } catch (error) {
      errorMessage.value = "Error fetching posts: " + error.message;
    }
  });
  
  const onInput = (event) => {
    searchQuery.value = event.target.value;
    
    // Si la opción dinámica está activada, no desactivar isSearchActive
    if (!event.target.value && !props.enableDynamicClass) {
      isSearchActive.value = false;
    }
  };
  
  const filteredPosts = computed(() => {
    if (!searchQuery.value) {
      return [];
    }
  
    const lowerQuery = searchQuery.value.toLowerCase();
    return allPosts.value.filter(post => {
      const titleMatch = post.title.rendered.toLowerCase().includes(lowerQuery);
      const contentMatch = post.content?.rendered ? post.content.rendered.toLowerCase().includes(lowerQuery) : false;
      return titleMatch || contentMatch;
    });
  });
  
  const hasResults = computed(() => filteredPosts.value.length > 0);
  
  const localPath = useLocalePath();
  
  const highlightText = (text) => {
    if (!searchQuery.value) return text;
    const regex = new RegExp(`(${searchQuery.value})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  };
  
  const toggleSearch = () => {
    isSearchActive.value = true;
  };
  
  const clearSearch = () => {
    searchQuery.value = '';
    isSearchActive.value = false;
  };
  
  const categories = ref([]);
  const { fetchCategories } = useWordPress();
  
  onMounted(async () => {
    try {
      categories.value = await fetchCategories();
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  });
  
  function getCategorySlug(categoryId) {
    const found = categories.value.find(c => c.id === categoryId);
    return found ? found.slug : '';
  }
  
  function postLink(categoryId, postSlug) {
    const catSlug = getCategorySlug(categoryId);
    return localPath(`/blog/${catSlug}/${postSlug}`);
  }
  </script>
  
<style lang="scss">
  @import '~/assets/scss/components/search.scss';

  .search-container {
    display: flex;
    align-items: center;
  }
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 8px;
  }
  .hidden-content {
    display: none; 
  }
</style>