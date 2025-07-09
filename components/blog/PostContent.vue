<template>
    <div class="margin-general" :style="degrade">
        <NuxtLink :to="localPath('/blog/')" class="back-link body-4-bold">
            <span class="material-symbols-outlined" translate="no">chevron_left</span>
            Home
        </NuxtLink>
        <div class="cont-general">
            <div class="min-width title-cont" :style="degrade2">
                <span class="date">{{ formatDate(post.yoast_head_json?.article_published_time) }}</span>
                <h1 v-html="post.title.rendered"></h1>
            </div>
            <img
                :src="post.yoast_head_json?.og_image?.[0]?.url || ''"
                alt="Post Image"
            />
            <div class="min-width cont-general" :style="backbanner">
                <div v-html="post.content.rendered"></div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { useLocalePath } from '#imports';

    import { useImage } from '#imports'; 

    const nuxtImg = useImage();

    const degradadeImageUrl = '/images/blog/Vista-Articulos-gradient-4.png';
    const degradade2ImageUrl = '/images/blog/Vista-Articulos-gradient-3.png';
    const degradade3ImageUrl = '/images/blog/Vista-Articulos-gradient-2.png';
    const back2ImageUrl = '/images/blog/BG-Para frase-mobile.jpg';
    const back1ImageUrl = '/images/blog/BG-Para-frase.jpg';

    const optimizedDegrade = nuxtImg(degradadeImageUrl, {
        quality: 80,
        format: 'webp',
    });
    const optimizedDegrade2 = nuxtImg(degradade2ImageUrl , {
        quality: 80,
        format: 'webp',
    });
    const optimizedDegrade3 = nuxtImg(degradade3ImageUrl , {
        quality: 80,
        format: 'webp',
    });
    const backImageUrl2 = nuxtImg(back2ImageUrl , {
        quality: 75,
        format: 'webp',
    });
    const backImageUrl = nuxtImg(back1ImageUrl, {
        quality: 75,
        format: 'webp',
    });

    const degrade = computed(() => {
        return {
            '--degrade2': `url('${optimizedDegrade}')`,
            '--degrade3': `url('${optimizedDegrade2}')`,
        };
    });
    const degrade2 = computed(() => {
        return {
            '--degrade4': `url('${optimizedDegrade3}')`,
        };
    });
    const backbanner = computed(() => {
        return {
            '--back2': `url('${backImageUrl2}')`,
            '--back': `url('${backImageUrl}')`,
        };
    });

    const props = defineProps({
        post: Object,
        externalUrl: String
    });
    const emit = defineEmits(['openModal']);
    const localPath = useLocalePath();

    function formatDate(dateString) {
        if (!dateString) return 'Fecha no disponible';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        }).format(date);
    }
</script>