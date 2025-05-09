import { Page } from 'puppeteer';
import { PageData } from '../types/pageData';
import { launchBrowser } from './puppeteerHelper';
import { logger } from '../utils/logger';
import { config } from '../config/config';
import { getPerfMetrics, injectPerfObserver } from '../analyzers/getPerfMetrics';
export async function loadPage(url: string): Promise<PageData> {
    let browser;
    let page: Page;

    logger.info(`Loading page: ${url}`);

    browser = await launchBrowser();
    page = await browser.newPage();
    await page.setViewport(config.puppeteer.defaultViewport);

    injectPerfObserver(page)

    // Navigate to the page
    const response = await page.goto(url, {
        waitUntil: 'load',
        timeout: 30000,
    });

    if (!response || !response.ok()) {
        throw new Error(`Failed to load page: ${url}. Status: ${response?.status()}`);
    }
    // Collect performance metrics
    const performanceMetrics = await page.metrics();
    const timingMetrics = await page.evaluate(() => JSON.parse(JSON.stringify(window.performance.timing)));
    const lighthouseMetrics = await page.evaluate(() => {
        if ((window as any).lighthouse) {
        return (window as any).lighthouse;
        }
        return null;
    });
    console.log(lighthouseMetrics)
    const webVitals = await getPerfMetrics(page);
    console.log(webVitals.tbt)
    // Collect page content information
    const pageTitle = await page.title();
    const pageContent = await page.content();
    const screenshot = await page.screenshot({ fullPage: true });

    await browser.close();

    return {
        url,
        pageTitle,
        webVitals,
        pageContent,
        screenshot,
        performanceMetrics,
        timingMetrics,
        lighthouseMetrics,
    };

}