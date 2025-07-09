<template>
  <div class="blog-article">
    <div class="margin-general">
      <NuxtLink :to="localPath('/blog/')" class="back-link body-4-bold">
        <span class="material-symbols-outlined" translate="no">chevron_left</span>
        Blog
      </NuxtLink>
    </div>
  </div>

  <div class="pad-top category" :style="degrade">
    <div class="margin-general container-tabs categorys">
      <!-- Mostramos solo los tabs, ya no los posts -->
      <SurfsUpPosts 
        :use-links="true" 
        :allowed-slugs="[
          'most-recent'
        ]" />

      <div class="container">
        <div class="title">
          <h2 v-if="category">{{ category.name }}</h2>
        </div>

        <div class="cont-general">
          <div class="links-article">
            <ul v-if="filteredPosts.length > 0">
              <li v-for="post in filteredPosts" :key="post.id">
                <NuxtLink :to="localPath(`/blog/${category.slug}/${post.slug}`)">
                  <div
                    :class="{ 'bg-image': true }"
                    :style="{ backgroundImage: `url(${post.yoast_head_json?.og_image?.[0]?.url || ''})` }"
                    aria-label="Post Image"
                    role="img"
                  ></div>
                  <p class="heading-h4" v-html="post.title.rendered"></p>
                </NuxtLink>
              </li>
            </ul>
            <p v-else>No articles found for this category.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import { ref, computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useWordPress } from '~/composables/useWordPress';
  import { useAsyncData, useSeoMeta, useLocalePath } from '#imports';
  import SurfsUpPosts from '~/components/blog/SurfsUpPostsTabs.vue';

  const nuxtImg = useImage();

  const degradadeImageUrl = '/images/blog/gradient-category.png';

  const optimizedDegrade = nuxtImg(degradadeImageUrl, {
    quality: 80,
    format: 'webp',
  });

  const degrade = computed(() => {
    return {
      '--degrade': `url('${optimizedDegrade}')`,
    };
  });
  
  const route = useRoute();
  const localPath = useLocalePath();
  const { fetchCategories, fetchPostsOnlyTVM } = useWordPress();
  
  const categorySlug = route.params.categorySlug;
  const category = ref(null);
  const posts = ref([]);
  
  const { data: categories, error: categoriesError } = await useAsyncData(
    'categories',
    fetchCategories
  );
  
  if (categoriesError.value) {
    console.error('Error fetching categories:', categoriesError.value);
  } else {
    category.value = categories.value?.find(
      (cat) => cat.slug.trim().toLowerCase() === categorySlug.trim().toLowerCase()
    );
  
    if (category.value) {
      const allPosts = await fetchPostsOnlyTVM();
      posts.value = allPosts || [];
    } else {
      console.error(`Category with slug "${categorySlug}" not found.`);
    }
  }
  
  const filteredPosts = computed(() => {
    if (!category.value || !posts.value.length) return [];
    return posts.value.filter(post =>
      Array.isArray(post.categories) && post.categories.includes(category.value.id)
    );
  });
  
  function decodeHtmlEntities(text) {
    if (!text) return '';
    if (typeof document === 'undefined') return text;
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }
  
  watch(
    () => category.value,
    (newCategory) => {
      if (!newCategory) return;
      try {
        if (newCategory.yoast_head_json) {
          useSeoMeta({
            title: decodeHtmlEntities(newCategory.yoast_head_json.title || newCategory.name),
            description: decodeHtmlEntities(newCategory.yoast_head_json.description || ''),
            ogTitle: decodeHtmlEntities(newCategory.yoast_head_json.title || newCategory.name),
            ogDescription: decodeHtmlEntities(newCategory.yoast_head_json.description || ''),
            ogImage: 'https://www.vulkanbrokersolutions.com/images/seo/SU-Link-preview.jpg',
            twitterTitle: decodeHtmlEntities(newCategory.yoast_head_json.title || newCategory.name),
            twitterDescription: decodeHtmlEntities(newCategory.yoast_head_json.description || ''),
            twitterImage: 'https://www.vulkanbrokersolutions.com/images/seo/SU-Link-preview.jpg',
          });
        } else {
          useSeoMeta({
            title: decodeHtmlEntities(newCategory.name || 'Category'),
            description: 'Explore the latest articles and updates in this category.',
          });
        }
      } catch (error) {
        console.error('Error configuring SEO:', error);
      }
    },
    { immediate: true }
  );
</script>