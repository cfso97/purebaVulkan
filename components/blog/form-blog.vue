<template>
    <client-only>
      <div style="width: 100%">
        <!-- El spinner se muestra si isLoading es true y está fuera del div del formulario -->
        <div v-if="isLoading" class="form-loading">
          <span class="loading-spinner"></span>
        </div>
  
        <!-- Este div contendrá el formulario de HubSpot. Su min-height se ajusta si el spinner está activo. -->
        <div 
          :id="`hubspotForm-${currentLocale}`" 
          ref="formContainerDiv" 
          :style="{ 'min-height': isLoading ? '0px' : '50px' }" 
        >
          <!-- El contenido aquí será reemplazado por HubSpot. No debe haber spinner aquí. -->
        </div>
      </div>
    </client-only>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useNuxtApp } from '#app'; 
  import '~/assets/scss/components/form.scss'
  
  // --- Composables y Estado Reactivo ---
  const { locale } = useI18n();
  const { $regulationsVar } = useNuxtApp();
  
  const currentLocale = ref(locale.value);
  const formContainerDiv = ref(null);
  const formHasBeenVisible = ref(false);
  const isLoading = ref(true); // Inicialmente en true para mostrar el spinner
  let intersectionObserver = null;
  
  // --- IDs de Formularios HubSpot ---
  // ¡IMPORTANTE! Reemplaza estos placeholders con tus IDs de formulario reales de HubSpot.
  // Si un locale no tiene un formulario, dejarlo vacío resultará en un error o spinner persistente.
  const formIds = {
    'ko': '',
    'zh': '',
    'pt-br': '',
    'LATAM': '',
    'LTD': '',
    'en': '9e58d09f-d9fa-45a3-8925-1d4ad503c8b4',
    'es': '91ec5884-7bd2-475e-b67c-8331f88859a4', // Ejemplo: Reemplaza con tu ID real para 'es'
    'Default': '91ec5884-7bd2-475e-b67c-8331f88859a4' // Ejemplo: Reemplaza con tu ID por defecto
  };
  
  // --- Lógica para Obtener el ID del Formulario Correcto ---
  const getFormId = (localeToUse) => {
    const latamRegions = $regulationsVar?.LATAM || [];
    const ltdRegions = $regulationsVar?.LTD || [];
    
    if (formIds[localeToUse]) {
      return formIds[localeToUse];
    }
    
    if (latamRegions.includes(localeToUse) && formIds['LATAM']) {
      return formIds['LATAM'];
    }
    
    if (ltdRegions.includes(localeToUse) && formIds['LTD']) {
      return formIds['LTD'];
    }
    
    return formIds['Default'];
  };
  
  // --- Inicialización del Formulario ---
  const initializeForm = async () => {
    try {
      isLoading.value = true; // Mostrar spinner al iniciar la carga
      await nextTick(); // Asegurar que el DOM está actualizado y el spinner puede renderizarse
  
      if (!formContainerDiv.value) {
        isLoading.value = false;
        return;
      }
  
      const formId = getFormId(currentLocale.value);
      
      // VERIFICACIÓN MEJORADA: Asegurarse de que el formId sea una cadena no vacía
      if (!formId || formId === '') { 
        isLoading.value = false;
        // Mostrar un mensaje de error dentro del contenedor del formulario
        if (formContainerDiv.value) {
          formContainerDiv.value.innerHTML = `<p style="color: red; text-align: center;">Error: Formulario no disponible para el idioma (${currentLocale.value}). Por favor, contacte al soporte.</p>`;
        }
        return;
      }
  
      // Limpiar el contenedor *antes* de cargar el script y crear el formulario
      // Esto asegura que el spinner (que ahora está fuera) no sea borrado.
      formContainerDiv.value.innerHTML = ''; 
  
      // Cargar el script de HubSpot si no está ya cargado
      if (typeof window.hbspt === 'undefined' || typeof window.hbspt.forms === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://js.hsforms.net/forms/embed/v2.js';
          script.async = true;
          script.onload = () => {
            if (window.hbspt && window.hbspt.forms) {
              resolve();
            } else {
              reject(new Error('HubSpot script loaded but hbspt.forms object not found.'));
            }
          };
          script.onerror = (e) => {
            reject(new Error('Failed to load HubSpot script.'));
          };
          document.head.appendChild(script);
        });
      }
  
      // Crear el formulario de HubSpot
      await createHubSpotForm(formId);
      isLoading.value = false; // Ocultar spinner una vez que el formulario esté listo
    } catch (error) {
      isLoading.value = false; // Ocultar spinner en caso de error
      if (formContainerDiv.value) {
        formContainerDiv.value.innerHTML = `<p style="color: red; text-align: center;">Hubo un problema al cargar el formulario. Inténtelo de nuevo más tarde. (${error.message || error})</p>`;
      }
    }
  };
  
  const createHubSpotForm = async (formId) => {
    if (typeof window.hbspt === 'undefined' || typeof window.hbspt.forms === 'undefined') {
      throw new Error('HubSpot forms API not available before calling create method.');
    }
  
    return new Promise((resolve, reject) => {
      window.hbspt.forms.create({
        region: "na1", // Asegúrate de que esta sea la región correcta para tu cuenta de HubSpot
        portalId: "2464228", // Tu Portal ID de HubSpot
        formId: formId,
        target: `#hubspotForm-${currentLocale.value}`,
        onFormSubmitted: function($form) {
          const formContainer = document.getElementById(`hubspotForm-${currentLocale.value}`);
          if (formContainer) {
            const parentForms = formContainer.closest('.forms');
            if (parentForms) {
              parentForms.classList.add('center_items');
              setTimeout(() => {
                parentForms.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.scrollBy(0, -100);
              }, 100);
            }
          }
        },
        onFormReady: function() {
          resolve(); // Resuelve la promesa cuando el formulario esté listo
        },
        onFormError: function(err) {
          reject(new Error(`HubSpot form error: ${err.message || err}`));
        }
      });
    });
  };
  
  // --- Observador de Intersección ---
  const setupIntersectionObserver = () => {
    if (!formContainerDiv.value) {
      return;
    }
  
    intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !formHasBeenVisible.value) {
          formHasBeenVisible.value = true;
          initializeForm(); // Inicia la carga del formulario
          if (intersectionObserver && formContainerDiv.value) {
            intersectionObserver.unobserve(formContainerDiv.value); // Deja de observar una vez que el formulario ha sido visible y se está inicializando
          }
        }
      });
    }, {
      threshold: 0.1, // Carga cuando el 10% del elemento es visible
      rootMargin: '50px' // O antes de que entre al viewport, a 50px de distancia
    });
  
    intersectionObserver.observe(formContainerDiv.value);
  };
  
  // --- Lifecycle Hooks ---
  onMounted(async () => {
    // Asegurarse de que el div del contenedor esté disponible en el DOM antes de configurar el observador
    await nextTick(); 
    setupIntersectionObserver();
  });
  
  onUnmounted(() => {
    // Limpiar el observer cuando el componente se destruye
    if (intersectionObserver) {
      intersectionObserver.disconnect();
      intersectionObserver = null;
    }
  });
  
  // --- Watchers ---
  watch(() => locale.value, async (newLocale) => {
    currentLocale.value = newLocale;
    isLoading.value = true; // Mostrar spinner mientras se cambia de idioma y se recarga
    // Si el formulario ya había sido visible, reinicialízalo con el nuevo idioma
    if (formHasBeenVisible.value) {
      await initializeForm();
    } else {
      // Si no ha sido visible, resetear isLoading para que el spinner no quede si no se carga de inmediato
      isLoading.value = false;
    }
  });
  </script>
  
  <style lang="scss" scoped>
  .form-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px; /* Asegura que el spinner tenga espacio */
    width: 100%;
  }
  
  .loading-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>