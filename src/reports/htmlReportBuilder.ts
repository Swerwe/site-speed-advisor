import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Report } from '../components/Report';
import { ReportData } from '../types/analysisResult';
import fs from 'fs';
import { logger } from '../utils/logger';
import puppeteer from 'puppeteer';
import path from 'path';
import os from 'os';

export async function generateHtmlReport(data: ReportData, outputPath: string): Promise<void> {
  try {
    logger.debug(`Generating HTML report at ${outputPath}`);

    const reportElement = React.createElement(Report, { data });

    // Render to static markup
    const html = ReactDOMServer.renderToStaticMarkup(reportElement);
    const completeHtml = `<!DOCTYPE html>${html}`;

    // Save HTML to file
    await fs.promises.writeFile(outputPath, completeHtml);

    // Generate PDF as well
    const pdfPath = outputPath.replace(/\.html?$/, '.pdf');
    const tempHtmlPath = path.join(os.tmpdir(), `temp_report_${Date.now()}.html`);
    await fs.promises.writeFile(tempHtmlPath, completeHtml);

    logger.debug(`Generating PDF report at ${pdfPath}`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle0' });
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });

    await browser.close();
    await fs.promises.unlink(tempHtmlPath);
  } catch (error) {
    logger.error(`Error generating report: ${(error as Error).message}`);
    console.error(error)
    throw error;
  }
}
