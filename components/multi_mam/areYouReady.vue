<template>
  <div class="areYouReady-MAM" style="background-image: url(/images/multi_mam/mam-investment.png);">
    <div class="margin-general">
      <h3>{{ $t("services.multiMAM.investment") }}</h3>
      <p class="subtitle-4">{{ $t("services.multiMAM.descInvestment") }}</p>
      <div class="content-btn">
        <a href="https://mamviewer.tradeviewforex.com/" target="_blank"
          ><button class="primary-button-medium">
            {{ $t("services.multiMAM.link1") }}
          </button></a
        >
        <NuxtLink :to="localPath('/accounts/register')"
          ><button class="second-button-medium">
            {{ $t("services.multiMAM.link2") }}
          </button></NuxtLink
        >
      </div>
    </div>
  </div>
</template>
<script setup>
const localPath = useLocalePath();

const handleLearnMoreClick = () => {
  // Accede al elemento con la clase 'forms' y cambia su estilo
  const formsElement = document.querySelector(".forms");
  if (formsElement) {
    // Cambia el estilo a 'flex'
    formsElement.style.display = "flex";

    // Realiza un scroll hasta el elemento
    formsElement.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
