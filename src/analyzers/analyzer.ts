import { PageData } from '../types/pageData';
import { PerformanceMetrics } from '../types/analysisResult';
import { calculateMetrics } from './metricsCalculator';
import { logger } from '../utils/logger';

export async function analyzePage(pageData: PageData): Promise<PerformanceMetrics> {
  try {
    logger.info('Analyzing page data');
    
    const metrics = await calculateMetrics(pageData);
    return {
      ...metrics,
      pageSize: Buffer.byteLength(pageData.pageContent, 'utf8'),
      requests: 0, // todo
      domSize: pageData.pageContent.split('</').length - 1,
    } ;
  } catch (error) {
    logger.error(`Error during page analysis: ${(error as Error).message}`);
    throw error;
  }
}