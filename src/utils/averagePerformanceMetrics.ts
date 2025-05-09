import { PerformanceMetrics } from "../types/analysisResult";

export function averagePerformanceMetrics(metricsArray: Array<PerformanceMetrics | null>): PerformanceMetrics {
    const count = metricsArray.length;
  
    const sum = {
      redirectTime: 0,
      serverResponseTime: 0,
      ttfb: 0,
      domContentLoadedTime: 0,
      tti: 0,
      fullyLoadedTime: 0,
      firstPaint: 0,
      firstContentfulPaint: 0,
      pageSize: 0,
      domSize: 0,
      loadTime: 0,
      domReadyTime: 0,
      tbtValue: 0,
      tbtMainThreadBlocks: 0,
      lcpValue: 0,
    };
  
    let ttiCount = 0;
  
    for (const m of metricsArray) {
        if (m === null) continue;
        sum.redirectTime += m.redirectTime;
        sum.serverResponseTime += m.serverResponseTime;
        sum.ttfb += m.ttfb;
        sum.domContentLoadedTime += m.domContentLoadedTime;
    
        if (m.tti !== undefined) {
            sum.tti += m.tti;
            ttiCount++;
        }
    
        sum.fullyLoadedTime += m.fullyLoadedTime;
        sum.firstPaint += m.firstPaint;
        sum.firstContentfulPaint += m.firstContentfulPaint;
        sum.pageSize += m.pageSize;
        sum.domSize += m.domSize;
        sum.loadTime += m.loadTime;
        sum.domReadyTime += m.domReadyTime;
    
        sum.tbtValue += m.tbt.value;
        sum.tbtMainThreadBlocks += m.tbt.mainThreadBlocks;
        sum.lcpValue += m.lcp.value;
    }
  
    const avg = {
      redirectTime: Math.round(sum.redirectTime / count),
      serverResponseTime: Math.round(sum.serverResponseTime / count),
      ttfb: Math.round(sum.ttfb / count),
      domContentLoadedTime: Math.round(sum.domContentLoadedTime / count),
      tti: ttiCount ? Math.round(sum.tti / ttiCount) : undefined,
      fullyLoadedTime: Math.round(sum.fullyLoadedTime / count),
      firstPaint: Math.round(sum.firstPaint / count),
      firstContentfulPaint: Math.round(sum.firstContentfulPaint / count),
      pageSize: Math.round(sum.pageSize / count),
      domSize: Math.round(sum.domSize / count),
      loadTime: Math.round(sum.loadTime / count),
      domReadyTime: Math.round(sum.domReadyTime / count),
      tbt: {
        value: Math.round(sum.tbtValue / count),
        longTasks: [],
        scripts: { withDefer: 0, withAsync: 0, total: 0 },
        mainThreadBlocks: Math.round(sum.tbtMainThreadBlocks / count),
      },
      lcp: {
        value: Math.round(sum.lcpValue / count),
        lcpElementType: null,
        lcpElementTag: null,
        lcpElementUrl: null,
        isPreloaded: undefined,
        isModernFormat: undefined,
      },
    };
  
    return avg;
  }
  