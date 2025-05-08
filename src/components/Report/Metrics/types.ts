import { lcpObject, tbtObject } from "../../../types/pageData";

export interface MetricsData {
    loadTime: number;
    domReadyTime: number;
    lcp: lcpObject;
    tbt: tbtObject;
    ttfb: number;
    firstPaint: number;
    firstContentfulPaint: number;
    pageSize: number;
    domSize: number;
  }
  
  export interface MetricsComponentProps {
    data: MetricsData;
  }