import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

export function useLocaleRedirection() {
  const { setLocale } = useI18n();
  const router = useRouter();
  
  let countryCode = ref('');
  let globalMapping = ref([]);
  let localeMapping = ref([]);

  const redirectToLocale = async () => {
    // Default locale based on geolocation
    let detectedLocale = 'en';

    try {
      const response = await fetch('https://dcsz5gywka2h4.cloudfront.net/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      countryCode.value = await response.text();
      console.log(countryCode.value);
      

      localeMapping.value = {
        'AR': 'es-ar',
        'MX': 'es-mx',
        'CO': 'es-co',
        'CL': 'es-cl',
        'PE': 'es-pe',
        'BR': 'pt-br',
        'JP': 'ja',
        'ZH': 'zh',
        'KR': 'ko'
      };

      globalMapping.value = {
        'en': 'en',
        'es': 'es',
        'es-ar': 'es-ar',
        'es-mx': 'es-mx',
        'es-co': 'es-co',
        'es-cl': 'es-cl',
        'es-pe': 'es-pe',
        'pt-br': 'pt-br',
        'ja': 'ja',
        'zh': 'zh',
        'ko': 'ko'
      };

      const currentLocale = router.currentRoute.value.path.split('/')[1];
      const routeEn = globalMapping.value[currentLocale] || 'en';
      

      if (routeEn !== 'en' && localeMapping.value[countryCode.value]) {
        detectedLocale = localeMapping.value[countryCode.value];
        console.log(detectedLocale);
      } else {
        detectedLocale = globalMapping.value[countryCode.value];        
      }

      if (currentLocale !== detectedLocale && detectedLocale !== 'en') {
        let newPath = ref('')

        if (detectedLocale === undefined) {
          newPath = `${router.currentRoute.value.path}`
        } else {
          newPath = detectedLocale === '' ? `${detectedLocale}${router.currentRoute.value.path}` : `/${detectedLocale}${router.currentRoute.value.path.replace(/^\/[^/]+/, '')}`;
        }
        console.log('Redirecting to locale path:', newPath);
        await setLocale(detectedLocale);
        await router.push(newPath);
      }
    } catch (error) {
      console.error('Error fetching user location:', error);
      detectedLocale = 'en';
    }
  };

  return {
    redirectToLocale
  };
}