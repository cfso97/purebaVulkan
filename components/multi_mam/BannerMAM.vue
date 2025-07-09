<template>
  <div class="banner-mam-content">
    <div class="margin-general">
      <div class="banner-mam-left">
        <h1>{{ $t("services.multiMAM.banner.title") }}</h1>
        <p class="text-1">{{ $t("services.multiMAM.banner.description-1") }}</p>
        <p class="text-2">{{ $t("services.multiMAM.banner.description-2") }}</p>
        <div class="btns-container">
          <a href="https://mamviewer.tradeviewforex.com/" target="_blank">
            <button class="primary-button-medium">
              {{ $t("services.multiMAM.link1") }}
            </button>
          </a>
          <NuxtLink :to="localPath('/accounts/register')">
            <button class="second-button-medium">
              {{ $t("services.multiMAM.link2") }}
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="banner-mam-right">
        <img
          src="/images/multi_mam/02.MAM-Img2.png"
          alt="laptop with multiMAM charts"
        />
        <!-- <img class="" src="/images/multi_mam/logo-multiman.svg" alt="logo with multiMAM charts"> -->
      </div>
      <div class="btns-container">
        <a href="https://mamviewer.tradeviewforex.com/" target="_blank">
            <button class="primary-button-medium">
              {{ $t("services.multiMAM.link1") }}
            </button>
          </a>
        <NuxtLink :to="localPath('/accounts/register')">
          <button class="second-button-medium">
            {{ $t("services.multiMAM.link2") }}
          </button>
        </NuxtLink>
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
