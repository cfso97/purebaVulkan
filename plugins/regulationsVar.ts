export const LTD = ['en', 'es'];
export const LATAM = ['es-ar', 'es-mx', 'es-co', 'es-cl', 'es-pe', 'pt-br', 'zh', 'ko'];
export const MENA = ['ar-en'];

function getRegulation(locale: string) {
  if (LTD.includes(locale)) return 'LTD';
  if (LATAM.includes(locale)) return 'LATAM';
  if (MENA.includes(locale)) return 'MENA';
  return 'Default Regulation';
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('regulationsVar', {
    LTD,
    LATAM,
    MENA,
    getRegulation
  });
});
