<template>
    <div class="blog-article article" v-cloak :style="degrade">
      <Transition name="fade" mode="out-in">
        <component
          :is="!showContent ? PostSkeleton : PostContent"
          :key="!showContent ? 'skeleton' : 'content'"
          v-bind="showContent ? { post, slug, postCategorySlug, onOpenModal: openModal2 } : {}"
        />
      </Transition>
    </div>
</template>
  
<script setup>
    import { ref, onMounted, nextTick } from 'vue';
    import { useRoute } from 'vue-router';
    import { useWordPress } from '~/composables/useWordPress';
    import PostContent from '~/components/blog/PostContent.vue';
    import PostSkeleton from '~/components/blog/PostSkeleton.vue';

    import { useImage } from '#imports'; 

    const nuxtImg = useImage();

    const degradadeImageUrl = '/images/blog/Vista-Articulos-gradient-1.png';

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
    const slug = route.params.slug;
    const postCategorySlug = ref(route.params.categorySlug);
    const { getPostBySlugFromLocalStorage, fetchPostBySlug } = useWordPress();
    
    const post = ref(null);
    const showContent = ref(false);
    const openLangModal2 = ref(false);
    const preloader = ref(null);
    
    onMounted(async () => {
        const local = getPostBySlugFromLocalStorage(slug);
    
        if (local) {
        await nextTick();
        post.value = local;
        showContent.value = true;
        } else {
        const fetched = await fetchPostBySlug(slug);
        post.value = fetched;
        showContent.value = true;
        }
    
        if (post.value) {
        useSeoMeta({
            title: decodeHtmlEntities(post.value.yoast_head_json?.title || post.value.title.rendered),
            description: decodeHtmlEntities(post.value.yoast_head_json?.og_description || ''),
            ogTitle: decodeHtmlEntities(post.value.yoast_head_json?.title || ''),
            ogDescription: decodeHtmlEntities(post.value.yoast_head_json?.og_description || ''),
            ogImage: post.value.yoast_head_json?.og_image?.[0]?.url || '',
            twitterTitle: decodeHtmlEntities(post.value.yoast_head_json?.title || ''),
            twitterDescription: decodeHtmlEntities(post.value.yoast_head_json?.og_description || ''),
            twitterImage: post.value.yoast_head_json?.og_image?.[0]?.url || '',
        });
    
        useHead({
            link: [
            { rel: 'canonical', href: `https://www.vulkanbrokersolutions.com/blog/${postCategorySlug.value}/${slug}` }
            ]
        });
        }
    });
    
    function decodeHtmlEntities(text) {
        if (!text || typeof document === 'undefined') return text;
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
    
    function openModal2() {
        preloader.value?.triggerPreloader();
        openLangModal2.value = true;
    }
    
    definePageMeta({
        key(route) {
        return route.fullPath;
        },
    });
</script>
  
<style lang="scss">
    @import '~/assets/scss/pages/blog-article.scss';

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s ease;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
    
    [v-cloak] {
        display: none;
    }
</style>