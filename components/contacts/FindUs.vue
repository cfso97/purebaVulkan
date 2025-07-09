<template>
  <div class="find-us">
    <div class="margin-general container">
      <div class="title">
        <h3 class="heading-h3">{{ $t(findus.title) }}</h3>
        <p class="body-4">{{ $t(findus.description) }}</p>
      </div>
      <div class="cont-card">
        <div
          v-for="card in findus.cards"
          :key="card.id"
          class="card-find"
          :class="{ 'has-iframe': card.iframe }"
        >
          <div class="text-cont">
            <p class="body-6-bold">{{ $t(card.title) }}</p>
            <p class="body-4">
              {{ $t(card.country) }} 
            </p>
            <p class="body-4">
              <strong>{{ $t(findus.Headquartersstrong) }}</strong>
              {{ $t(card.headquarters) }}
            </p>
            <p class="body-4">
              <strong>{{ $t(findus.websitestrong) }}</strong>
              <a :href="card.link" target="_blank" class="link-4">
                {{ card.nameLink }}
              </a>
            </p>
          </div>
          <!-- Aquí agregamos la opción del iframe -->
          <div v-if="card.iframe" class="cont-location">
            <iframe
              :src="card.iframe"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const findus = {
  title: "contacts.findus.title",
  description: "contacts.findus.description",
  Headquartersstrong: "contacts.findus.Headquartersstrong",
  websitestrong: "contacts.findus.websitestrong",
  cards: [
    {
      id: 1,
      title: "contacts.findus.titlecard1",
      country: "contacts.findus.country1",
      countrybr: "contacts.findus.countrybr1",
      headquarters: "contacts.findus.Headquarters1",
      nameLink: "www.tradeview.eu",
      link: "https://www.tradeview.eu/",
      iframe: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12926.132990737991!2d14.5061212!3d35.9094456!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e45dc7de8b5f5%3A0xc54d65b06e4e914a!2sTradeview%20Europe%20Ltd.!5e0!3m2!1sen!2sco!4v1726591664564!5m2!1sen!2sco",
    },
  ],
  linkstexts: "findus.linkstext",
};
</script>

<style lang="scss">
  @import '~/assets/scss/components/contacts/findus.scss';
.card-find {
  /* Estilos generales de las tarjetas */
}

.has-iframe {
  /* Estilos adicionales si la tarjeta tiene iframe */
  border: 2px solid blue;
}
</style>
