import { RecommendationObject } from "../recommendations/types";

export interface PerformanceMetrics {
  // Основные метрики производительности
  redirectTime: number;
  serverResponseTime: number;
  ttfb: number; // Time to First Byte
  domContentLoadedTime: number;
  tti?: number; // Time to Interactive (опционально, так как может быть сложно вычислить)
  fullyLoadedTime: number;
  
  // Дополнительные метрики
  firstPaint: number;
  firstContentfulPaint: number;
  
  // Ресурсные метрики
  pageSize: number; // Общий размер страницы в байтах
  domSize: number; // Размер DOM (количество элементов)
  
  // Дополнительные метрики для обратной совместимости
  loadTime: number;
  domReadyTime: number;

  // WebVitals
  tbt: {
    value: number,
    longTasks: { duration: number, startTime: number, name: string }[];
    scripts: { withDefer: number, withAsync: number, total: number };
    mainThreadBlocks: number;
  };
  lcp: {
    value: number; 
    lcpElementType?: string | null;
    lcpElementTag?: string | null;
    lcpElementUrl?: string | null;
    isPreloaded?: boolean;
    isModernFormat?: boolean;
}

}

export interface ReportData extends PerformanceMetrics {
  url: string;
  recommendationObject: RecommendationObject;
  screenshot?: Uint8Array | Buffer; // Универсальный тип для скриншотов
  timestamp?: number; // Дата создания отчета (timestamp)
  userAgent?: string; // Информация о браузере/устройстве
}
