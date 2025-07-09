
<template>
  <div class="benefits-content margin-general">
    <div class="benefits-left">
      <h2>{{ $t("services.multiMAM.benefits.title") }}</h2>
    </div>
    <div class="benefits-right">
      <div class="benefits-content">
        <div v-for="(item, index) in cards" :key="index" class="card">
          <div class="img-content">
            <div class="img-box">
              <span class="material-symbols-outlined" translate="no">{{ item.icon }}</span>
            </div>
          </div>
          <div class="text-content">
            <p>{{ $t(item.text) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cards: [
        {
          icon: "finance_mode",
          text: 'services.multiMAM.benefits.text-1'
        },
        {
          icon: "manage_accounts",
          text: 'services.multiMAM.benefits.text-2'
        },
        {
          icon: "arrow_selector_tool",
          text: 'services.multiMAM.benefits.text-3'
        },
        {
          icon: "acute",
          text: 'services.multiMAM.benefits.text-4'
        },
        {
          icon: "settings_alert",
          text: 'services.multiMAM.benefits.text-5'
        },
        
      ],
    };
  },
};
</script>
