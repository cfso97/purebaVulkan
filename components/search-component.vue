<template>
  <div
    class="content-search"
    :class="{ 'var-search': searchQuery && hasResults, 'no-search': searchQuery && !hasResults }"
  >
    <div class="search-container">
      <span class="material-symbols-outlined serch-icon" translate="no">search</span>
      <input v-model="searchQuery" :placeholder="placeholder" @input="onInput" />
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="close-button"
        aria-label="Clear search"
      >
        <span class="material-symbols-outlined" translate="no">close</span>
      </button>
    </div>

    <div v-if="errorMessage">{{ errorMessage }}</div>

    <client-only>
      <div class="results">
        <div class="cont-results">
          <!-- Iteramos sobre "filteredFAQs" (array de links) -->
          <a
            v-for="faq in filteredFAQs"
            :key="faq.id"
            :href="generateLink(faq.url)"
          >
            <!-- Título (texto) -->
            <h3 v-html="highlightText($t(faq.text))"></h3>

            <!-- Si hubiera contenido en 'faq.content' y detectamos coincidencias, mostramos -->
            <div v-show="hasContentMatches(faq)" class="hidden-content">
              <div
                v-for="(section, sectionIndex) in faq.content.sections"
                :key="sectionIndex"
              >
                <h4 v-html="highlightText($t(section.title))"></h4>

                <div
                  v-show="!section.collapsible || isSectionExpanded(sectionIndex)"
                  class="contet-general"
                >
                  <div
                    class="icon-text"
                    v-for="(iconTextItem, iconTextIndex) in section.iconText"
                    :key="iconTextIndex"
                    :class="{ disc: iconTextItem.disclaimer }"
                  >
                    <div
                      v-if="iconTextItem.icon || iconTextItem.number || iconTextItem.image"
                      :class="['cont-icon', iconTextItem.customClass]"
                    >
                      <span
                        class="material-symbols-outlined icon"
                        translate="no"
                        v-if="iconTextItem.icon"
                      >
                        {{ iconTextItem.icon }}
                      </span>
                      <div v-if="iconTextItem.number" class="list-number">
                        <span>{{ iconTextItem.number }}</span>
                      </div>
                      <div
                        v-if="iconTextItem.image && iconTextItem.image.src"
                        class="list-image"
                      >
                        <img
                          :src="iconTextItem.image.src"
                          :alt="iconTextItem.image.alt"
                          class="responsive-image"
                        />
                      </div>
                    </div>

                    <div class="cont-general">
                      <div
                        v-if="iconTextItem.contents && iconTextItem.contents.length"
                        class="sub-cont"
                      >
                        <template
                          v-for="(content, contentIndex) in iconTextItem.contents"
                          :key="contentIndex"
                        >
                          <p
                            class="body-4"
                            v-if="content.paragraphs && content.paragraphs.length"
                          >
                            <span
                              v-for="(paragraph, index) in content.paragraphs"
                              :key="index"
                              :class="paragraph.class"
                              v-html="highlightText(formatContent(content.paragraphs))"
                            ></span>
                          </p>

                          <picture
                            v-if="content.images"
                            v-for="(image, imgIndex) in content.images"
                            :key="imgIndex"
                          >
                            <source
                              v-if="image.mobile"
                              media="(max-width: 570px)"
                              :srcset="image.mobile"
                            />
                            <img
                              :src="image.desktop"
                              :alt="image.alt"
                              class="responsive-image"
                            />
                          </picture>

                          <div
                            v-if="content.buttons && content.buttons.length"
                            class="buttons sub-cont"
                          >
                            <template
                              v-for="(button, bIndex) in content.buttons"
                              :key="bIndex"
                            >
                              <a
                                v-if="
                                  button.link.startsWith('http://') ||
                                  button.link.startsWith('https://')
                                "
                                :href="button.link"
                                :class="button.wrapperClass"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button :class="button.buttonClass">
                                  {{ highlightText($t(button.text)) }}
                                </button>
                              </a>

                              <a
                                v-else
                                :href="localPath(button.link)"
                                :class="button.wrapperClass"
                                @click.prevent="reloadPage(button.link, button.tab)"
                              >
                                <button :class="button.buttonClass">
                                  {{ highlightText($t(button.text)) }}
                                </button>
                              </a>
                            </template>
                          </div>

                          <ul
                            v-if="content.list && content.list.length"
                            class="sub-cont"
                          >
                            <li
                              v-for="(listItem, liIndex) in content.list"
                              :key="liIndex"
                            >
                              <p class="body-4">
                                <span
                                  v-html="highlightText(formatContent(listItem))"
                                ></span>
                              </p>
                            </li>
                          </ul>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </client-only>

    <div class="no-results" v-if="!filteredFAQs.length">
      {{ $t('faq.no-result') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import dataSections from '~/assets/faqs.json' // <-- JSON con { title, icon, links[] }

// ---------------------------------------------------
// 1) Aplanar la estructura de secciones y links
// ---------------------------------------------------
const allFaqLinks = computed(() => {
  // "flatMap": por cada "section", retornamos "section.links"
  // cada link ya contiene: { id, text, url, content }
  return dataSections.flatMap(section => section.links)
})

// ---------------------------------------------------
// 2) Estado y props
// ---------------------------------------------------
const { t: $t } = useI18n()
const searchQuery = ref('')
const errorMessage = ref('')
const expandedSections = ref([])

const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
})

// ---------------------------------------------------
// 3) Filtrado por "searchQuery"
// ---------------------------------------------------
const onInput = (event) => {
  searchQuery.value = event.target.value
  if (searchQuery.value.length >= 1) {
    // Reaplica el filtro
    filteredFAQs.value = filterFaqs(searchQuery.value)
  }
}

// Función de filtrado
function filterFaqs(query) {
  const lowerQuery = query.toLowerCase()

  return allFaqLinks.value.filter(faq => {
    const faqTextMatches = $t(faq.text).toLowerCase().includes(lowerQuery)
    const contentMatches = searchInContent(lowerQuery, faq.content)
    return faqTextMatches || contentMatches
  })
}

// Reutilizada en "filteredFAQs" y en "onInput"
function searchInContent(query, content) {
  const lowerQuery = query.toLowerCase()

  // 'content.sections' es un array. Revisamos si algo coincide
  return content.sections.some(section => {
    // Si "title" existe, convertimos a minúsculas
    const sectionTitle = section.title || ''
    const sectionTitleMatches =
      sectionTitle.toLowerCase().includes(lowerQuery)

    // iconText:
    const iconTextMatches =
      section.iconText &&
      section.iconText.some(iconItem => {
        // Podríamos verificar paragraphs, list, buttons, etc. 
        // En tu JSON actual, 'sections' están vacíos. 
        // Ajusta según necesites.
        return false 
      })

    return sectionTitleMatches || iconTextMatches
  })
}

// Computed principal: si no hay "searchQuery", muestra todo
const filteredFAQs = computed(() => {
  if (!searchQuery.value) {
    return allFaqLinks.value
  }
  return filterFaqs(searchQuery.value)
})

// ---------------------------------------------------
// 4) Lógica adicional de UI
// ---------------------------------------------------
const hasContentMatches = (faq) => {
  return searchInContent(searchQuery.value.toLowerCase(), faq.content)
}

const hasResults = computed(() => filteredFAQs.value.length > 0)

const localPath = useLocalePath()

const generateLink = (href) => {
  // 1) Elimina posibles slashes iniciales en "href"
  const cleanHref = href.replace(/^\/+/, '')
  
  // 2) Ahora compón la ruta con "/faq/"
  //    Quedará "/faq/manage-my-account/how-do-i-fund-my-account/"
  const fullPath = `/faq/${cleanHref}`
  
  // 3) useLocalePath() agregará el prefijo de idioma (por ejemplo "/en/")
  return useLocalePath()(fullPath)
}

const highlightText = (text) => {
  if (!searchQuery.value) return text
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}

const clearSearch = () => {
  searchQuery.value = ''
}

const isSectionExpanded = (sectionIndex) => {
  return expandedSections.value.includes(sectionIndex)
}

// Ejemplo de "formatContent", se ajusta a tu lógica de parse / br / strong
const formatContent = (paragraphs) => {
  if (!Array.isArray(paragraphs)) return ''
  return paragraphs
    .map(paragraph => {
      const textKey = paragraph.text
      if (typeof textKey !== 'string') return ''
      try {
        const translatedText = $t(textKey)
        return translatedText
          .replace(/\[br\]/g, '<br>')
          .replace(/\[strong\](.*?)\[\/strong\]/g, '<strong>$1</strong>')
      } catch (error) {
        return ''
      }
    })
    .join('')
}

// Si necesitas recargar la página al hacer clic en un link interno:
function reloadPage(link, tab) {
  window.location.href = localPath(link) + (tab ? `?tab=${tab}` : '')
}
</script>

<style>
.search-container {
  display: flex;
  align-items: center;
}
.close-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
}
.hidden-content {
  display: none; /* Ocultar contenido adicional por defecto */
}
</style>
