<template>
    <div class="error">
        <div class="margin-general">
            <div class="content_main">
                <div class="conten_info">
                    <div class="text">
                        <span class="material-symbols-outlined" translate="no">sentiment_dissatisfied</span>
                        <h2>{{ $t('error.title') }}</h2>
                        <p class="body-6">{{ $t('error.descript') }}</p>
                    </div>
                    <div class="btn">
                        <NuxtLink :to="localPath('/')">
                            <button class="primary-button-medium">
                                {{ $t('error.home') }}
                            </button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
  const localPath = useLocalePath();

  useSeoMeta({
  title: '404 page not found',
  ogTitle: '404 page not found',
  twitterTitle: '404 page not found',
});
</script>

<style lang="scss">
@import '~/assets/scss/components/error.scss';
</style>