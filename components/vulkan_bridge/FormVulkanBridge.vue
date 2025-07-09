<template>
  <div style="width: 100%">
    <div :id="`hubspotForm-${currentLocale}`"></div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { locale } = useI18n();
    const { $regulationsVar } = useNuxtApp();
    const currentLocale = ref(locale.value);
    const regulation = ref($regulationsVar.getRegulation(currentLocale.value));

    const formIds = {
      'ko': 'f2cf4427-0b01-413c-b7b9-6286869d0c9c',
      'zh': '1e757bce-ebc2-4783-a04c-e2ac3a6f95ca',
      'pt-br': '076b74f3-4f7e-441a-8f43-d456a2c4963f',
      'LATAM': '33ce5ef5-cf73-40d6-9816-1fe28c3493cf',
      'LTD': '47a6717e-b313-406c-aa86-703bdaee5fd2',
      'es': '33ce5ef5-cf73-40d6-9816-1fe28c3493cf',
      'Default': '47a6717e-b313-406c-aa86-703bdaee5fd2'
    };

    const getFormId = (locale) => {
      if (locale === 'ko') {
        return formIds['ko'];
      }
      if (locale === 'zh') {
        return formIds['zh'];
      }
      if (locale === 'pt-br') {
        return formIds['pt-br'];
      }
      if ($regulationsVar.LATAM.includes(locale)) {
        return formIds['LATAM'];
      }
      if ($regulationsVar.LTD.includes(locale)) {
        if (locale === 'es') {
          return formIds['es'];
        }
        return formIds['LTD'];
      }
      return formIds['Default'];
    };

    const loadHubSpotForm = () => {
      if (typeof window !== 'undefined') {
        const formContainer = document.getElementById(`hubspotForm-${currentLocale.value}`);
        if (formContainer) {
          formContainer.innerHTML = ''; // Limpiar el contenedor del formulario antes de cargar uno nuevo
        }

        // Eliminar cualquier script de HubSpot existente
        const existingScript = document.querySelector('script[src="https://js.hsforms.net/forms/v2.js"]');
        if (existingScript) {
          existingScript.remove();
        }

        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/v2.js';
        document.body.appendChild(script);

        script.onload = () => {
          if (window.hbspt) {
            window.hbspt.forms.create({
              portalId: '2464228',
              formId: getFormId(currentLocale.value),
              target: `#hubspotForm-${currentLocale.value}`,
              onFormSubmit: () => {
                const hubspotFormContainer = document.getElementById(`hubspotForm-${currentLocale.value}`);
                let parentGeneral = hubspotFormContainer;

                while (parentGeneral && !parentGeneral.classList.contains('cont-general')) {
                  parentGeneral = parentGeneral.parentElement;
                }

                let parentForms = hubspotFormContainer;
                while (parentForms && !parentForms.classList.contains('forms')) {
                  parentForms = parentForms.parentElement;
                }
                if (parentForms) {
                  parentForms.classList.add('center_items');
                  parentForms.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  window.scrollBy(0, -100); // Ajusta según necesidad
                }
              }
            });
          }
        };
      }
    };

    onMounted(() => {
      loadHubSpotForm(); // Cargar el formulario al montar el componente
    });

    watch(locale, (newLocale) => {
      currentLocale.value = newLocale;
      regulation.value = $regulationsVar.getRegulation(newLocale);
      loadHubSpotForm(); // Recargar formulario al cambiar el idioma
    }, { immediate: true });

    return {
      currentLocale,
    };
  }
}
</script>

<style scoped>
#hubspotForm {
    display: block;
}
</style>
