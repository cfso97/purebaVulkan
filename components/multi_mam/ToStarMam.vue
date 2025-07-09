<template>
  <div class="to-start">
    <div class="content margin-general">
      <div class="content-text">
        <div>
          <h3>{{ title }}</h3>
          <p class="body-4">{{ desc }}</p>
        </div>
        <div class="card">
          <template v-for="(item, index) in itemsList" :key="index">
            <!-- Renderiza un párrafo si el tipo es 'paragraph' -->
            <p v-if="item.type === 'paragraph'" class="body-4">
              <span v-for="(segment, sIndex) in item.content" :key="`segment-${sIndex}`">
                <strong v-if="segment.strong">{{ segment.text }}</strong>
                <template v-else>{{ segment.text }}</template>
                <!-- Añadir espacio después de cada segmento excepto el último -->
                <template v-if="sIndex !== item.content.length - 1">&nbsp;</template>
              </span>
            </p>

            <!-- Renderiza una lista si el tipo es 'list' -->
            <ul v-else-if="item.type === 'list'">
              <li class="body-4" v-for="(listItem, listIndex) in item.content" :key="`list-${listIndex}`">
                <span v-for="(segment, sIndex) in listItem.value" :key="`segment-${sIndex}`">
                  <strong v-if="segment.strong">{{ segment.text }}</strong>
                  <template v-else>{{ segment.text }}</template>
                  <!-- Añadir espacio después de cada segmento excepto el último -->
                  <template v-if="sIndex !== listItem.value.length - 1">&nbsp;</template>
                </span>
              </li>
            </ul>
          </template>
        </div>
      </div>
      <div class="content-img">
        <h3>{{ title }}</h3>
        <img :src="imageSrc" :alt="imageAlt" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    desc: String,
    imageSrc: String,
    imageAlt: String,
    itemsList: Array
  },
};
</script>

<style lang="scss">
// Estilos aquí
</style>
