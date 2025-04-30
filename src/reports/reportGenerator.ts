import { ReportData } from '../types/analysisResult';
import { generateHtmlReport } from './htmlReportBuilder';
// import { generatePdfReport } from './pdfReportBuilder';
import { config } from '../config/config';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';

export async function generateReport(data: ReportData): Promise<void> {
  try {
    logger.info('Generating report');
    
    // Ensure output directory exists
    if (!fs.existsSync(config.report.outputPath)) {
      fs.mkdirSync(config.report.outputPath, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const baseFilename = `report-${timestamp}`;
    
    for (const format of config.report.formats) {
      const filename = `${baseFilename}.${format}`;
      const filePath = path.join(config.report.outputPath, filename);
      
      switch (format) {
        case 'html':
          await generateHtmlReport(data, filePath);
          break;
        // case 'pdf':
        //   await generatePdfReport(data, filePath);
        //   break;
        default:
          logger.warn(`Unsupported report format: ${format}`);
      }
      
      logger.info(`Report generated: ${filePath}`);
    }
  } catch (error:any) {
    logger.error(`Error generating report: ${error.message}`);
    throw error;
  }
}