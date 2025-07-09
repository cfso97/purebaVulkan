<template>
    <div class="build">
        <div class="margin-general">
            <div class="container">
                <h2 class="title">Artículos destacados:</h2>
                <div class="cont">
                    <NuxtLink 
                        v-for="(card, index) in cards" 
                        :key="index"
                        :to="localPath(card.url)"
                        class="card"
                        :style="{ 'background-image': `url(${getImage(card)})` }"
                    >
                        <div class="text">
                            <p class="heading-h4">{{ card.title }}</p>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useImage } from '#imports';

const nuxtImg = useImage();
const localPath = useLocalePath();

const originalCards = [
    {
        image: '/images/blog/Articulo1-Preview.jpg',
        title: 'Cómo lanzar un broker online en 2025: requisitos y herramientas',
        url: '/blog/forex/understanding-forex-trading-basics/'
    },
    {
        image: '/images/blog/Articulo2-Preview.jpg',
        title: 'White Label vs Plataforma propia: qué conviene a un broker nuevo',
        url: '/blog/recent/exploring-rise-communitraders/'
    },
    {
        image: '/images/blog/Articulo1-Preview.jpg',
        title: '¿Qué es un sistema MAM y cómo se usa con MultiMan?',
        url: '/blog/exploring-rise-communitraders/'
    },
];

const cards = ref([]);

onMounted(() => {
  cards.value = originalCards.map(card => ({
    ...card,
    optimizedImage: nuxtImg(card.image, { quality: 80, format: 'webp' }),
  }));
});

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);

const getImage = (card) => {
  if (!card) return '';
  return card.optimizedImage;
};
</script>

<style lang="scss">
  @import '~/assets/scss/components/build.scss';
</style>