import { LCPRecommendations } from "../types";

export const analyzeLCP = (lcp: {
    value: number; 
    lcpElementType?: string | null;
    lcpElementTag?: string | null;
    lcpElementUrl?: string | null;
    isPreloaded?: boolean;
    isModernFormat?: boolean;
}): LCPRecommendations => {
    const lcpRecommendations: LCPRecommendations = {
        mainMessage: null,
        recommendations: []
    }
    if (lcp.value > 2500) {
        lcpRecommendations.mainMessage = 'Улучшите Largest Contentful Paint (сейчас ' + 
          `${lcp.value}мс). Оптимизируйте загрузку самого большого элемента (обычно это изображение или текст). ` +
          'Используйте предзагрузку для критических ресурсов, сжимайте изображения, настройте приоритетную загрузку.'
      }
    if (lcp.lcpElementTag === 'img'){
        lcpRecommendations.recommendations.push(`Используйте <img loading="eager"> для главного изображения  ${lcp.lcpElementUrl}`)
        if (!lcp.isModernFormat) lcpRecommendations.recommendations.push('"Конвертируйте в WebP/AVIF (sharp, squoosh)"')
    }
    if (!lcp.isPreloaded) lcpRecommendations.recommendations.push(`"Предзагрузите шрифты через <link rel="preload">"`)

    return lcpRecommendations;
}
