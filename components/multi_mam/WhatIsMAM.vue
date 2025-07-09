<template>
  <div class="margin-general">
    <div class="what-is-content">
      <div class="what-is-left">
        <h2 v-html="titleWithHtml"></h2>
      </div>
      <div class="what-is-rigth">
        <div v-for="(block, index) in filteredContent" :key="index">
          <template v-if="block.length > 0 && block[0].type === 'list'">
            <ul v-if="!block[0].ordered">
              <li v-for="(item, itemIndex) in filterListItems(block[0].items)" :key="itemIndex" class="body-4">
                <strong v-if="item.strong">{{ item.text }}</strong>
                <span v-else>{{ item.text }}</span>
              </li>
            </ul>
            <ol v-else>
              <li v-for="(item, itemIndex) in filterListItems(block[0].items)" :key="itemIndex" class="body-4">
                <strong v-if="item.strong">{{ item.text }}</strong>
                <span v-else>{{ item.text }}</span>
              </li>
            </ol>
          </template>
          <p v-else class="body-4">
            <template v-for="(part, partIndex) in block" :key="partIndex">
              <strong v-if="part.strong">{{ part.text }}</strong>
              <span v-else>{{ part.text }}</span>
            </template>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import '~/assets/scss/components/services/multi_mam/what-is-mam.scss'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: Array,
    required: true
  }
});

const { locale } = useI18n();

const titleWithHtml = computed(() => {
  return props.title.replace(/\[br\]/g, '<br>');
});

const filteredContent = computed(() => {
  return props.content.map(blockOrParagraph => {
    if (blockOrParagraph.length > 0 && blockOrParagraph[0].type === 'list') {
      const listData = blockOrParagraph[0];
      if (listData.locale && listData.locale !== locale.value) {
        return []; 
      }
      return [listData];
    }
    return blockOrParagraph.filter(part => !part.locale || part.locale === locale.value);
  }).filter(blockOrParagraph => blockOrParagraph.length > 0); 
});

const filterListItems = (items) => {
  if (!items) return [];
  return items.filter(item => !item.locale || item.locale === locale.value);
};

</script>