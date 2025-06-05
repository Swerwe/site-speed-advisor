import { RecommendationObject } from "../recommendations/types";

export interface PerformanceMetrics {
  url: string;
  redirectTime: number;
  serverResponseTime: number;
  ttfb: number;
  domContentLoadedTime: number;
  tti?: number;
  fullyLoadedTime: number;
  

  firstPaint: number;
  firstContentfulPaint: number;
  

  pageSize: number;
  domSize: number;
  

  loadTime: number;
  domReadyTime: number;


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
  metricsObject? : Record<string, PerformanceMetrics>
  recommendationObject: RecommendationObject;
  screenshot?: Uint8Array | Buffer; // Универсальный тип для скриншотов
  timestamp?: number; // Дата создания отчета (timestamp)
  userAgent?: string; // Информация о браузере/устройстве
}
