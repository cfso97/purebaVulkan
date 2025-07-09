<template>
  <div :class="['accordeon', styleOption]" > 
    <div class="accordeon-box">
      <div
        v-for="(item, index) in options"
        :key="index"
        class="box"
        :class="activeIndex === index ? 'activeOption' : ''"
      >
        <div class="box-content" @click="setActive(index)">
          <div class="box-icon" v-if="activeIndex === index && (item.icon || item.image)">
            <div class="icon">
              <span
                class="material-symbols-outlined"
                translate="no"
                v-if="item.icon && !item.image"
              >
                {{ item.icon }}
              </span>
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.iconAlt || 'Icon image'"
                class="item-image"
              />
            </div>
          </div>

          <div class="box-text" :class="{ 'hide-title-icon': hasSingleAccordion }">
            <div class="title-icon">
              <div class="box-icon">
                <div class="icon" v-if="item.icon || item.image">
                  <span
                    class="material-symbols-outlined"
                    translate="no"
                    v-if="item.icon && !item.image"
                  >
                    {{ item.icon }}
                  </span>
                  <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.iconAlt || 'Icon image'"
                    class="item-image"
                  />
                </div>
              </div>
              <p class="title body-6" v-if="item.title" >{{ $t(item.title) }}</p>
              <div class="arrow">
                <span class="material-symbols-outlined" translate="no" v-if="!useAlternateIcons && activeIndex !== index">
                  expand_more
                </span>
                <span class="material-symbols-outlined" translate="no" v-if="!useAlternateIcons && activeIndex === index">
                  expand_less
                </span>
                <span class="material-symbols-outlined" translate="no" v-if="useAlternateIcons && activeIndex !== index">
                  arrow_right_alt
                </span>
              </div>
            </div>

            <div v-if="activeIndex === index" class="accordion-content">
              <!-- Renderización dinámica de varios textos y enlaces -->
              <div v-if="item.texts && item.texts.length" class="cont-text-link">
                <p
                  v-for="(text, textIndex) in item.texts"
                  :key="'text-' + textIndex"
                  class="body-4"
                  v-html="formatContent(text, $t, localPath)"
                >
                </p>
              </div>

              <div v-if="item.links && item.links.length">
                <a
                  v-for="(link, linkIndex) in item.links"
                  :key="'link-' + linkIndex"
                  :href="link.url"
                  class="body-4 link"
                  rel="noopener noreferrer"
                >
                  {{ $t(link.text) || $t('Go to link') }}
                </a>
              </div>

              <div class="tabs" v-if="item.tabs">
                <div class="tabs-container">
                  <!-- Botones para los tabs -->
                  <div class="tabs-buttons">
                    <button
                      v-for="(tab, tabIndex) in item.tabs"
                      :key="tabIndex"
                      @click="setActiveTab(tab, item.title)"
                      :class="{ activeTab: activeTab && activeTab.text === tab.text }"
                      class="tab-button"
                    >
                      {{ $t(tab.text) }}
                    </button>
                  </div>

                  <!-- Select personalizado -->
                  <div class="select-custom selectItem" @click="toggleSelect">
                    <label></label>
                    <div class="select-content" :class="{ active: showSelectOptions }">
                      <div class="select-toggle">
                        <!-- Muestra el placeholder o la opción seleccionada -->
                        {{ activeTab ? $t(activeTab.text) : 'Select a tab' }} 
                        <span class="material-symbols-outlined" translate="no">
                          {{ showSelectOptions ? 'expand_less' : 'expand_more' }}
                        </span>
                      </div>
                      <div class="select-options" v-if="showSelectOptions">
                        <div
                          v-for="(tab, tabIndex) in item.tabs"
                          :key="tabIndex"
                          @click.stop="setActiveTab(tab, item.title); closeSelect()"
                          class="select-option"
                          :class="{ activeTab: activeTab && activeTab.text === tab.text }"
                        >
                          {{ $t(tab.text) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contenido del tab seleccionado -->
              <div v-if="activeTab" class="content-main-tab movil">
                <!-- Renderizamos las secciones dinámicamente -->
              <div v-for="(section, sectionIndex) in activeTab.content.sections" :key="sectionIndex">
                
                <!-- Si la sección es colapsable, renderizamos el <h3> -->
                <h3 v-if="section.collapsible" @click="toggleSection(sectionIndex)">
                  <button>
                    <template v-for="(part, partIndex) in section.titleParts" :key="partIndex">
                      <span v-bind:class="part.classes || []" v-html="formatContent(part, $t, localPath)"></span>
                    </template>
                    <span class="material-symbols-outlined" translate="no">expand_more</span>
                  </button>
                </h3>
                
                <div v-show="!section.collapsible || isSectionExpanded(sectionIndex)" class="contet-general">
                  <!-- Título dentro del contenido (h4) -->
                  <h4>{{ $t(section.title) }}</h4> <!-- Título de la sección -->
                  
                  <div class="icon-text" v-for="(iconTextItem, iconTextIndex) in section.iconText" :key="iconTextIndex" :class="{ disc: iconTextItem.disclaimer }">
                    <div 
                      v-if="iconTextItem.icon || iconTextItem.number || iconTextItem.image" 
                      :class="['cont-icon', iconTextItem.customClass]">
                      <!-- Icon -->
                      <span class="material-symbols-outlined icon" translate="no" v-if="iconTextItem.icon">
                        {{ iconTextItem.icon }}
                      </span>

                      <!-- Number -->
                      <div v-if="iconTextItem.number" class="list-number">
                        <span>{{ iconTextItem.number }}</span>
                      </div>

                      <!-- Image -->
                      <div v-if="iconTextItem.image && iconTextItem.image.src" class="list-image">
                        <img :src="iconTextItem.image.src" :alt="iconTextItem.image.alt" class="responsive-image" />
                      </div>
                    </div>
                    
                    <div class="cont-general">
                      <div v-if="iconTextItem.contents && iconTextItem.contents.length" class="sub-cont">
                        <template v-for="(content, contentIndex) in iconTextItem.contents" :key="contentIndex">
                          <p class="body-4" v-if="content.paragraphs && content.paragraphs.length">
                            <span 
                              v-for="(paragraph, index) in content.paragraphs" 
                              :key="index" 
                              :class="paragraph.class" 
                              v-html="formatContent(paragraph, $t, localPath)">
                            </span>
                          </p>

                          <!-- <picture v-if="content.images" v-for="(image, imgIndex) in content.images" :key="imgIndex" :class="image.class || ''">
                            <source v-if="image.mobile" media="(max-width: 570px)" :srcset="image.mobile" />
                            <img :src="image.desktop" :alt="image.alt" class="responsive-image"  />
                          </picture> -->

                          <div v-if="content.buttons && content.buttons.length" class="buttons sub-cont">
                          <template v-for="(button, bIndex) in content.buttons" :key="bIndex">
                            <a v-if="button.link.startsWith('http://') || button.link.startsWith('https://')"
                              :href="getLocalizedUrl(button)"
                              :class="button.wrapperClass"
                              target="_blank"
                              rel="noopener noreferrer">
                              <button :class="button.buttonClass">
                                {{ $t(button.text) }}
                              </button>
                            </a>
                            <a v-else 
                              :href="localPath(button.link)"
                              :class="button.wrapperClass"
                              @click.prevent="reloadPage(button.link, button.tab)">
                              <button :class="button.buttonClass">
                                {{ $t(button.text) }}
                              </button>
                            </a>
                          </template>
                        </div>

                          <ul v-if="content.list && content.list.length" class="sub-cont">
                            <li v-for="(listItemGroup, groupIndex) in content.list" :key="groupIndex">
                              <p v-for="(listItem, liIndex) in listItemGroup" :key="liIndex" class="body-4">
                                <span v-html="formatContent(listItem, $t, localPath)"></span>
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
              
            </div>
          </div>

          <div class="arrow">
            <span class="material-symbols-outlined" translate="no" v-if="!useAlternateIcons && activeIndex !== index">
              expand_more
            </span>
            <span class="material-symbols-outlined" translate="no" v-if="!useAlternateIcons && activeIndex === index">
              expand_less
            </span>
            <span class="material-symbols-outlined" translate="no" v-if="useAlternateIcons && activeIndex !== index">
              arrow_right_alt
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido del tab seleccionado -->
    <div v-if="activeTab" class="content-main-tab destock">
      <div class="tab-content">
        <!-- Renderizamos las secciones dinámicamente -->
        <div v-for="(section, sectionIndex) in activeTab.content.sections" :key="sectionIndex">
          
          <!-- Si la sección es colapsable, renderizamos el <h3> -->
          <h3 v-if="section.collapsible" @click="toggleSection(sectionIndex)">
            <button>
              <template v-for="(part, partIndex) in section.titleParts" :key="partIndex">
                <span v-bind:class="part.classes || []" v-html="formatContent(part, $t, localPath)"></span>
              </template>
              <span class="material-symbols-outlined" translate="no">expand_more</span>
            </button>
          </h3>
          
          <div v-show="!section.collapsible || isSectionExpanded(sectionIndex)" class="contet-general">
            <!-- Título dentro del contenido (h4) -->
            <h4>{{ $t(section.title) }}</h4> <!-- Título de la sección -->
            
            <div class="icon-text" v-for="(iconTextItem, iconTextIndex) in section.iconText" :key="iconTextIndex" :class="{ disc: iconTextItem.disclaimer }">
              <div 
                v-if="iconTextItem.icon || iconTextItem.number || iconTextItem.image" 
                :class="['cont-icon', iconTextItem.customClass]">
                <!-- Icon -->
                <span class="material-symbols-outlined icon" translate="no" v-if="iconTextItem.icon">
                  {{ iconTextItem.icon }}
                </span>

                <!-- Number -->
                <div v-if="iconTextItem.number" class="list-number">
                  <span>{{ iconTextItem.number }}</span>
                </div>

                <!-- Image -->
                <div v-if="iconTextItem.image && iconTextItem.image.src" class="list-image">
                  <img :src="iconTextItem.image.src" :alt="iconTextItem.image.alt" class="responsive-image" />
                </div>
              </div>
              
              <div class="cont-general">
                <div v-if="iconTextItem.contents && iconTextItem.contents.length" class="sub-cont">
                  <template v-for="(content, contentIndex) in iconTextItem.contents" :key="contentIndex">
                    <p class="body-4" v-if="content.paragraphs && content.paragraphs.length">
                      <span 
                        v-for="(paragraph, index) in content.paragraphs" 
                        :key="index" 
                        :class="paragraph.class" 
                        v-html="formatContent(paragraph, $t, localPath)">
                      </span>
                    </p>

                    <!-- <picture v-if="content.images" v-for="(image, imgIndex) in content.images" :key="imgIndex" :class="image.class || ''">
                      <source v-if="image.mobile" media="(max-width: 570px)" :srcset="image.mobile" />
                      <img :src="image.desktop" :alt="image.alt" class="responsive-image"  />
                    </picture> -->

                    <div v-if="content.buttons && content.buttons.length" class="buttons sub-cont">
                    <template v-for="(button, bIndex) in content.buttons" :key="bIndex">
                      <a v-if="button.link.startsWith('http://') || button.link.startsWith('https://')"
                        :href="getLocalizedUrl(button)"
                        :class="button.wrapperClass"
                        target="_blank"
                        rel="noopener noreferrer">
                        <button :class="button.buttonClass">
                          {{ $t(button.text) }}
                        </button>
                      </a>
                      <a v-else 
                        :href="localPath(button.link)"
                        :class="button.wrapperClass"
                        @click.prevent="reloadPage(button.link, button.tab)">
                        <button :class="button.buttonClass">
                          {{ $t(button.text) }}
                        </button>
                      </a>
                    </template>
                  </div>

                    <ul v-if="content.list && content.list.length" class="sub-cont">
                      <li v-for="(listItemGroup, groupIndex) in content.list" :key="groupIndex">
                        <p v-for="(listItem, liIndex) in listItemGroup" :key="liIndex" class="body-4">
                          <span v-html="formatContent(listItem, $t, localPath)"></span>
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
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { formatContent } from '~/utils/formatContent';

export default {
  props: {
    options: Array,
    styleOption: {
      type: String,
      default: '',
    },
    enableScrollToTop: {
      type: Boolean,
      default: false,
    },
    useAlternateIcons: {
      type: Boolean,
      default: false,
    },
    initialOpenTabs: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const activeIndex = ref(props.initialOpenTabs ? 0 : -1);
    const activeTab = ref(null);
    const route = useRoute();
    const router = useRouter();
    const showSelectOptions = ref(false);
    const expandedSections = ref([]);

    const hasSingleAccordion = ref(props.options.length === 1);
    const hasSingleAccordionWithTabs = ref(
      props.options.length === 1 && props.options[0].tabs?.length > 0
    );

    const toggleSection = (sectionIndex) => {
      if (expandedSections.value.includes(sectionIndex)) {
        expandedSections.value = expandedSections.value.filter(index => index !== sectionIndex);
      } else {
        expandedSections.value.push(sectionIndex);
      }
    };

    const isSectionExpanded = (sectionIndex) => {
      return expandedSections.value.includes(sectionIndex);
    };

    const toggleSelect = () => {
      showSelectOptions.value = !showSelectOptions.value;
    };

    const closeSelect = () => {
      showSelectOptions.value = false;
    };

    const scrollToTop = (shouldScroll = true) => {
      if (props.enableScrollToTop && shouldScroll) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    };

    const setActive = (index) => {
      if (activeIndex.value === index) {
        if (props.options[index]?.tabs?.length) {
          return;
        }
        activeIndex.value = -1;
      } else {
        activeIndex.value = index;

        if (props.options[index]?.tabs?.length) {
          activeTab.value = props.options[index].tabs[0];
        } else {
          activeTab.value = null;
        }

        updateUrl();
      }

      scrollToTop();
    };

    const setActiveTab = (tab) => {
      activeTab.value = tab;
      updateUrl();
      scrollToTop();
    };

    const updateUrl = () => {
      const currentAccordion = props.options[activeIndex.value] || null;
      const currentTab = activeTab.value || null;

      if (hasSingleAccordionWithTabs.value) {
        const hash = currentTab?.urlTitle || ''; 
        window.location.hash = hash;
      } else if (currentAccordion) {
        const accordionHash = currentAccordion.urlTitle || ''; 
        const tabHash = currentTab?.urlTitle || ''; 
        const hash = `${accordionHash}${tabHash ? `/${tabHash}` : ''}`;
        window.location.hash = hash;
      }
    };

    const setActiveFromUrl = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const [accordionHash, tabHash] = hash.includes('/')
          ? hash.split('/')
          : [null, hash]; 

        if (accordionHash) { 
          const accordionIndex = props.options.findIndex(option => option.urlTitle === accordionHash);
          if (accordionIndex !== -1) {
            activeIndex.value = accordionIndex;

            if (tabHash) {
              const tab = props.options[accordionIndex].tabs?.find(t => t.urlTitle === tabHash);
              activeTab.value = tab || props.options[accordionIndex].tabs?.[0] || null;
            } else {
              activeTab.value = props.options[accordionIndex].tabs?.[0] || null;
            }
            return;
          }
        }
        if (!accordionHash && hasSingleAccordionWithTabs.value) {
          const singleAccordion = props.options[0];
          const tab = singleAccordion.tabs?.find(t => t.urlTitle === tabHash);
          if (tab) {
            activeIndex.value = 0;
            activeTab.value = tab;
            return;
          }
        }
      }
      if (props.options.length > 0) {
        activeIndex.value = 0;
        activeTab.value = props.options[0].tabs?.[0] || null;
      }
    };

    onMounted(() => {
      setActiveFromUrl();

      if (!window.location.hash && props.options.length > 0) {
        const firstAccordion = props.options[0] || null;
        const firstTab = firstAccordion?.tabs?.[0]?.urlTitle || '';

        const accordionHash = firstAccordion?.urlTitle || '';
        const hash = `${accordionHash}${firstTab ? `/${firstTab}` : ''}`;
        window.location.hash = hash;
      }

      if (!props.initialOpenTabs) {
        activeIndex.value = -1;
        activeTab.value = null;
      }

      window.addEventListener('hashchange', () => {
        setActiveFromUrl();
      });
    });

    const getLocalizedUrl = (button) => {
      const language = useI18n().locale.value;

      const urlMap = {
        en: button.urls?.en || button.link,
        es: button.urls?.es || button.link,
        'es-co': button.urls?.es || button.link,
        'es-ar': button.urls?.es || button.link,
        'es-cl': button.urls?.es || button.link,
        'es-pe': button.urls?.es || button.link,
        'es-mx': button.urls?.es || button.link,
        'pt-br': button.urls?.pt || button.link,
        zh: button.urls?.zh || button.link,
        ko: button.urls?.ko || button.link,
      };

      return urlMap[language];
    };

    const localPath = useLocalePath();

    return {
      activeIndex,
      activeTab,
      setActive,
      setActiveTab,
      toggleSection,
      isSectionExpanded,
      toggleSelect,
      closeSelect,
      showSelectOptions,
      localPath,
      scrollToTop,
      getLocalizedUrl,
      hasSingleAccordion,
      hasSingleAccordionWithTabs,
    };
  },
  methods: {
    reloadPage(link, tab) {
      const url = this.localPath(link) + (tab ? `?tab=${tab}` : ''); 
      window.location.href = url;
    },
  },
};
</script>

<style lang="scss">
  @import '~/assets/scss/components/accordeon.scss';
.tab-button {
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.box {
  padding: 20px;
}


</style>