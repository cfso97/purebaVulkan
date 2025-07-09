<template>
    <div class="post-skeleton margin-general">
        <div class="cont-general">
            <div class="min-width">
            <Skeleton width="10rem" height="1.5rem" class="mb-3" borderRadius="5px" />
            <Skeleton height="4rem" class="mb-4" borderRadius="8px" />
            </div>
    
            <div class="gap-4 mb-5 cards">
            <Skeleton height="28rem" width="100%" borderRadius="18px" />
            </div>
    
            <div class="min-width mb-4">
            <Skeleton height="2rem" width="70%" class="mb-2" />
            <Skeleton height="2rem" width="90%" class="mb-2" />
            <Skeleton height="2rem" width="60%" class="mb-4" />
    
            <Skeleton height="1.2rem" class="mb-2" v-for="n in 6" :key="n" />
            </div>
    
            <div class="btns mt-6">
            <Skeleton height="3rem" width="14rem" borderRadius="12px" class="mr-4" />
            <Skeleton height="3rem" width="14rem" borderRadius="12px" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import Skeleton from 'primevue/skeleton';
</script>
  
<style scoped>
    .post-skeleton {
        min-height: 100vh;
    }
    .cards {
        display: flex;
        justify-content: center;
    }
    .btns {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
</style>