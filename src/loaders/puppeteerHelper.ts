import puppeteer from 'puppeteer';
import { config } from '../config/config';
import { logger } from '../utils/logger';

export async function launchBrowser() {
  try {
    logger.debug('Launching browser instance');
    return await puppeteer.launch({
      headless: config.puppeteer.headless,
      slowMo: config.puppeteer.slowMo,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });
  } catch (error:any) {
    logger.error(`Failed to launch browser: ${error.message}`);
    throw error;
  }
}