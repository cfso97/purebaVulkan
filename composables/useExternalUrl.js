export const useExternalUrl = () => {
    const { locale } = useI18n(); 
    
    const getExternalUrl = (path) => {
        const baseUrls = {
            en: "https://cabinet.tvmarkets.com/en",
            es: "https://cabinet.tvmarkets.com/es",
            "es-co": "https://cabinet.tvmarkets.com/es",
            "es-ar": "https://cabinet.tvmarkets.com/es",
            "es-cl": "https://cabinet.tvmarkets.com/es",
            "es-pe": "https://cabinet.tvmarkets.com/es",
            "es-mx": "https://cabinet.tvmarkets.com/es",
            "pt-br": "https://cabinet.tvmarkets.com/pt",
            zh: "https://cabinet.tvmarkets.com/zh",
            ko: "https://cabinet.tvmarkets.com/ko",
            ja: "https://cabinet.tvmarkets.com/jp",
        };
        
        return `${baseUrls[locale.value]}${path}`;
    };
    
    return { getExternalUrl };
};