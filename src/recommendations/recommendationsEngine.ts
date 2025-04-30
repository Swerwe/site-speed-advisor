// src/recommendations/recommendationsEngine.ts
import { PerformanceMetrics } from '../types/analysisResult';
import { logger } from '../utils/logger';
import { analyzeLCP } from './helpers/analyzeLCP';
import { analyzeTBT } from './helpers/analyzeTBT';
import { RecommendationObject } from './types';

export async function generateRecommendations(
  analysis: PerformanceMetrics,
): Promise<RecommendationObject> {
  try {
    logger.info('Генерация рекомендаций');

    const recommendationObject: RecommendationObject = {
      lcpRecommendations: null,
      tbtRecommendations: null,
      recommendations: [],
    };
    const lcpRecommendations = analyzeLCP(analysis.lcp);
    recommendationObject.lcpRecommendations = lcpRecommendations;
    const tbtRecommendations = analyzeTBT(analysis.tbt);
    recommendationObject.tbtRecommendations = tbtRecommendations;
    // Рекомендации по временным метрикам
    if (analysis.redirectTime > 500) {
      recommendationObject.recommendations.push(
        'Сократите количество редиректов. Цепочка редиректов занимает слишком много времени: ' +
          `${analysis.redirectTime}мс. Устраните или минимизируйте редиректы между страницами.`,
      );
    }

    if (analysis.serverResponseTime > 600) {
      recommendationObject.recommendations.push(
        'Улучшите время ответа сервера. Текущее время до первого байта (TTFB): ' +
          `${analysis.ttfb}мс. Оптимизируйте серверный код, используйте CDN или включите кэширование.`,
      );
    }

    if (analysis.firstContentfulPaint > 2000) {
      recommendationObject.recommendations.push(
        'Оптимизируйте First Contentful Paint (сейчас ' +
          `${analysis.firstContentfulPaint}мс). Удалите блокирующие ресурсы, оптимизируйте загрузку CSS.`,
      );
    }

    if (analysis.tti && analysis.tti > 3500) {
      recommendationObject.recommendations.push(
        'Улучшите Time to Interactive (сейчас ' +
          `${analysis.tti}мс). Сократите время выполнения JavaScript и разбивайте длинные задачи.`,
      );
    }

    if (analysis.fullyLoadedTime > 5000) {
      recommendationObject.recommendations.push(
        'Сократите полное время загрузки (сейчас ' +
          `${analysis.fullyLoadedTime}мс). Отложите загрузку некритичных ресурсов и используйте ленивую загрузку изображений.`,
      );
    }

    // Рекомендации по ресурсам
    if (analysis.pageSize > 1024 * 1024) {
      const pageSizeMB = (analysis.pageSize / (1024 * 1024)).toFixed(2);
      recommendationObject.recommendations.push(
        `Оптимизируйте размер страницы (сейчас ${pageSizeMB} МБ). ` +
          'Сжимайте изображения, используйте современные форматы (WebP/AVIF), включите сжатие Brotli.',
      );
    }

    if (analysis.domSize > 1500) {
      recommendationObject.recommendations.push(
        `Уменьшите размер DOM (сейчас ${analysis.domSize} элементов). ` +
          'Избегайте глубоко вложенных узлов, используйте CSS вместо DOM-элементов где возможно.',
      );
    }

    if (analysis.requests > 50) {
      recommendationObject.recommendations.push(
        `Сократите количество запросов (сейчас ${analysis.requests}). ` +
          'Объедините CSS/JS файлы, используйте спрайты для изображений, задействуйте мультиплексирование HTTP/2.',
      );
    }

    // Рекомендации для обратной совместимости
    if (analysis.loadTime > 3000) {
      recommendationObject.recommendations.push(
        'Оптимизируйте общее время загрузки (сейчас ' +
          `${analysis.loadTime}мс). Смотрите конкретные рекомендации выше.`,
      );
    }

    // Общие рекомендации
    if (analysis.requests > 0) {
      recommendationObject.recommendations.push(
        'Убедитесь, что для всех статических ресурсов правильно настроены заголовки кэширования.',
      );
      recommendationObject.recommendations.push(
        'Рассмотрите возможность предзагрузки критических ресурсов с помощью <link rel="preload">.',
      );
    }

    if (recommendationObject.recommendations.length === 0) {
      recommendationObject.recommendations.push(
        'Производительность страницы в порядке! Продолжайте мониторить возможные ухудшения.',
      );
    } else {
      recommendationObject.recommendations.unshift(
        'Обнаружены возможности для оптимизации производительности:',
      );
    }

    return recommendationObject;
  } catch (error) {
    logger.error(`Ошибка при генерации рекомендаций: ${(error as Error).message}`);
    throw error;
  }
}

