import { PageData } from '../types/pageData';

export async function calculateMetrics(pageData: PageData) {
  const timing = pageData.timingMetrics;
  
  if (!timing) {
    throw new Error('No timing metrics available');
  }
  // webWitals
  const {lcp, tbt} = pageData.webVitals;

  // Основные метрики
  const navigationStart = timing.navigationStart;
  const redirectTime = timing.redirectEnd - timing.redirectStart;
  const serverResponseTime = timing.responseEnd - timing.requestStart;
  const ttfb = timing.responseStart - timing.requestStart;
  const domContentLoadedTime = timing.domContentLoadedEventEnd - navigationStart;
  const domCompleteTime = timing.domComplete - navigationStart;
  const loadTime = timing.loadEventEnd - navigationStart;
  // Расчет Time to Interactive (TTI) - может потребоваться дополнительная логика
  // В простейшем случае можно использовать domInteractive
  const tti = timing.domInteractive ? timing.domInteractive - navigationStart : null;

  return {
    url: pageData.url,
    redirectTime,
    serverResponseTime,
    ttfb,
    domContentLoadedTime,
    tti: tti !== null ? tti : undefined,
    fullyLoadedTime: loadTime,
    lcp,
    tbt,
    // Дополнительные метрики для обратной совместимости
    loadTime,
    domReadyTime: timing.domComplete - timing.domLoading,
    firstPaint: timing.responseStart - navigationStart,
    firstContentfulPaint: timing.domContentLoadedEventStart - navigationStart,
  };
}