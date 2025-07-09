<template>
  <div style="width: 100%">
    <div :id="`hubspotForm-${currentLocale}`"></div> <!-- Cambio para reflejar el idioma actual -->
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { locale } = useI18n();
    const currentLocale = ref(locale.value); 

    if (typeof window !== 'undefined') {
      const formIds = {
        en: 'db31cdb5-5bbb-4d41-bf7e-2196ed37b365',
        es: 'c3475b35-0fab-46d3-967d-1a6dda4e70d5', 
      };

      const loadHubSpotForm = () => {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
          if (window.hbspt) {
            window.hbspt.forms.create({
              portalId: '2464228',
              formId: formIds[currentLocale.value], 
              target: `#hubspotForm-${currentLocale.value}`,
              onFormSubmit: () => {
                // Usa el ID dinámico basado en el idioma actual para acceder al contenedor del formulario
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
                  window.scrollBy(0, -100); // Puedes ajustar esta cantidad según sea necesario
                }
              }
            });
          }
        });
      };

      watch(locale, (newLocale) => {
        currentLocale.value = newLocale; 
        loadHubSpotForm(); 
      }, { immediate: true });
    }

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
