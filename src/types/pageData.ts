import { Metrics } from "puppeteer";

export interface PageData {
  url: string;
  pageTitle: string;
  pageContent: string;
  screenshot?: Uint8Array<ArrayBufferLike>;
  performanceMetrics: Metrics;
  webVitals: {
    tbt: tbtObject;
    lcp: lcpObject;
  };
  timingMetrics: TimingMetrics;
  lighthouseMetrics: any | null;
}

export interface TimingMetrics {
  navigationStart: number;
  loadEventEnd: number;
  domLoading: number;
  domComplete: number;
  responseStart: number;
  domContentLoadedEventStart: number;
  [key: string]: number;
}
export interface tbtObject {
    value: number,
    longTasks: { duration: number, startTime: number, name: string }[];
    scripts: { withDefer: number, withAsync: number, total: number };
    mainThreadBlocks: number;
};
export interface lcpObject {
    value: number; 
    lcpElementType?: string | null;
    lcpElementTag?: string | null;
    lcpElementUrl?: string | null;
    isPreloaded?: boolean;
    isModernFormat?: boolean;
}