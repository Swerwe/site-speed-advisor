import { loadPage } from '../loaders/pageLoader';
import { analyzePage } from '../analyzers/analyzer';
import { generateRecommendations } from '../recommendations/recommendationsEngine';
import { generateReport } from '../reports/reportGenerator';
import { config } from '../config/config';
import { logger } from '../utils/logger';
import { crawlDomain } from '../loaders/crawlDomain';
import { averagePerformanceMetrics } from '../utils/averagePerformanceMetrics';

export class MainController {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async runAnalysis(): Promise<void> {
    try {
      logger.info(`Starting analysis for URL: ${this.url}`);

      if (config.crawling){
        const { pageDataArray } = await crawlDomain(this.url, 100);

        const analysisResultArray = await Promise.all(pageDataArray.map(async (pageData) => {
          const pageMetrics = await analyzePage(pageData);
          if (pageMetrics.domContentLoadedTime < 0 || pageMetrics.loadTime < 0) return null
          return pageMetrics
        }));
        const {averageAnalysisResult, metricsObject} = averagePerformanceMetrics(analysisResultArray);
        
        const pageData = await loadPage(this.url);

        // Step 2: Analyze collected data
        const  analysisResult = await analyzePage(pageData);
        // Step 3: Generate recommendations
        const recommendationObject = await generateRecommendations(analysisResult);
        await generateReport({
          ...analysisResult,
          metricsObject,
          url: this.url,
          recommendationObject,
        });
        



      }else{
        const pageData = await loadPage(this.url);

        // Step 2: Analyze collected data
        const  analysisResult = await analyzePage(pageData);
        // Step 3: Generate recommendations
        const recommendationObject = await generateRecommendations(analysisResult);
              // Step 4: Generate report
        // await generateReport({
        //   ...analysisResult,
        //   url: this.url,
        //   recommendationObject,
        // });

      }



      logger.info('Analysis completed successfully');
    } catch (error: any) {
      logger.error(`Error during analysis: ${error.message}`);
      throw error;
    }
  }
}