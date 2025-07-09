// plugins/loadScripts.client.ts

declare global {
  interface Window {
    fbq: any;
    clarity: any;
  }
}

export default defineNuxtPlugin(() => {
  window.addEventListener('load', () => {
    requestIdleCallback(() => {
      // Google Tag Manager
      const gtm = document.createElement('script');
      gtm.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-PPMG4PBP';
      gtm.async = true;
      document.head.appendChild(gtm);

      // Microsoft Clarity
      window.clarity = window.clarity || function() {
        (window.clarity.q = window.clarity.q || []).push(arguments);
      };
      const clarity = document.createElement('script');
      clarity.src = 'https://www.clarity.ms/tag/qci2mplxma';
      clarity.async = true;
      document.head.appendChild(clarity);

      // Facebook Pixel
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      fbq('init', '224527781081033'); 
      fbq('track', 'PageView');
    });
  });
});