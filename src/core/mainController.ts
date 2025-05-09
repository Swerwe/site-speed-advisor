import { Page } from 'puppeteer';
import { PageData } from '../types/pageData';
// import { AnalysisResult } from '../types/analysisResult';
import { loadPage } from '../loaders/pageLoader';
import { analyzePage } from '../analyzers/analyzer';
import { generateRecommendations } from '../recommendations/recommendationsEngine';
import { generateReport } from '../reports/reportGenerator';
import { config } from '../config/config';
import { logger } from '../utils/logger';
import { crawlDomain } from '../loaders/crawlDomain';
import { averagePerformanceMetrics } from '../utils/averagePerformanceMetrics';
// import { calculatePerformanceScore } from '../utils/performanceScore';
export class MainController {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async runAnalysis(): Promise<void> {
    try {
      logger.info(`Starting analysis for URL: ${this.url}`);

      // Step 1: Load page and collect raw data

      const pageData = await loadPage(this.url);
      // const pageDataArray = await crawlDomain(this.url, 3);
      // console.log(pageDataArray.map(data => data.timingMetrics))
      // const analysisResultArray = await Promise.all(pageDataArray.map(async (pageData) => {
      //   const pageMetrics = await analyzePage(pageData);
      //   if (pageMetrics.domContentLoadedTime < 0 || pageMetrics.loadTime < 0) return null
      //   return pageMetrics

      // }));
      // Step 2: Analyze collected data
      const  analysisResult = await analyzePage(pageData);
      // const analysisResult = averagePerformanceMetrics(analysisResultArray);
      // Step 3: Generate recommendations
      const recommendationObject = await generateRecommendations(analysisResult);

      // Step 4: Generate report
      await generateReport({
        url: this.url,
        ...analysisResult,
        recommendationObject,
      });

      logger.info('Analysis completed successfully');
    } catch (error: any) {
      logger.error(`Error during analysis: ${error.message}`);
      throw error;
    }
  }
}