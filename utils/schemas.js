import { useI18n } from 'vue-i18n'; // Esta línea será eliminada en la siguiente edición.
import { useRoute } from 'vue-router'; // Esta línea será eliminada en la siguiente edición.

// Las funciones ahora aceptan 't' como argumento
const createMainOrganizationSchema = (t, currentLocale) => {
    return {
        "@type": "Organization",
        "name": t('organization.name'),
        "url": "https://www.vulkanbrokersolutions.com/",
        "logo": "https://www.vulkanbrokersolutions.com/logo.png",
        "description": t('organization.description'),
        "foundingDate": "2025",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": t('address.city'),
            "addressRegion": t('address.region'),
            "addressCountry": t('address.countryCode')
        },
        "contactPoint": {
            "name": "General Contact",
            "@type": "ContactPoint",
            "telephone": "+34-600-000-000",
            "contactType": t('contact.type'),
            "areaServed": t('contact.areaServed'),
            "availableLanguage": [
                { "@type": "Language", "name": t('language.spanish') },
                { "@type": "Language", "name": t('language.english') }
            ]
        },
        "sameAs": [
            "https://www.linkedin.com/company/vulkanbrokersolutions",
            "https://twitter.com/vulkanbrokers"
        ]
    };
};

const createWebPageSchema = (t, currentLocale, route) => {
    // const currentUrl = `https://www.vulkanbrokersolutions.com${route.fullPath}`; // Ejemplo URL dinámica
    const currentUrl = "https://www.vulkanbrokersolutions.com/"; // URL estática
    
    return {
        "@type": "WebPage",
        "name": t('webpage.name'),
        "description": t('webpage.description'),
        "inLanguage": currentLocale,
        "url": currentUrl,
        "publisher": {
            "@type": "Organization",
            "name": t('organization.name'),
            "url": "https://www.vulkanbrokersolutions.com/",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.vulkanbrokersolutions.com/logo.png"
            }
        }
    };
};

const createServicesItemListSchema = (t) => {
    const organizationName = t('organization.name');
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": t('services.itemListTitle'),
        "itemListElement": [
            {
                "@type": "Service",
                "name": t('services.platformDevelopment.name'),
                "description": t('services.platformDevelopment.description'),
                "provider": {
                    "@type": "Organization",
                    "name": organizationName
                }
            },
            {
                "@type": "Service",
                "name": t('services.strategicConsulting.name'),
                "description": t('services.strategicConsulting.description'),
                "provider": {
                    "@type": "Organization",
                    "name": organizationName
                }
            },
            {
                "@type": "Service",
                "name": t('services.technicalSupport.name'),
                "description": t('services.technicalSupport.description'),
                "provider": {
                    "@type": "Organization",
                    "name": organizationName
                }
            },
            {
                "@type": "Service",
                "name": t('services.riskManagement.name'),
                "description": t('services.riskManagement.description'),
                "provider": {
                    "@type": "Organization",
                    "name": organizationName
                }
            }
        ]
    };
};

// usePageSchema ahora acepta 't', 'locale' y 'route' como argumentos
export const usePageSchema = (t, locale, route) => {
    const organizationSchema = createMainOrganizationSchema(t, locale.value);
    const webPageSchema = createWebPageSchema(t, locale.value, route);
    const servicesSchema = createServicesItemListSchema(t);

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            organizationSchema,
            webPageSchema,
            servicesSchema
        ]
    };

    return schema;
};