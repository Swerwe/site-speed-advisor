import { Page } from 'puppeteer';
import { PageData } from '../types/pageData';
import { launchBrowser } from './puppeteerHelper';
import { logger } from '../utils/logger';
import { config } from '../config/config';
import { getPerfMetrics, injectPerfObserver } from '../analyzers/getPerfMetrics';
export async function loadPage(url: string): Promise<PageData> {
    let browser;
    let page: Page;

    logger.info(`Загрузка страницы: ${url}`);

    browser = await launchBrowser();
    page = await browser.newPage();
    await page.setViewport(config.puppeteer.defaultViewport);

    injectPerfObserver(page)

    const response = await page.goto(url, {
        waitUntil: 'load',
        timeout: 90000,
    });

    if (!response || !response.ok()) {
        throw new Error(`Не удалось загрузить страницу: ${url}. Статус: ${response?.status()}`);
    }

    const timingMetrics = await page.evaluate(() => JSON.parse(JSON.stringify(window.performance.timing)));
    const webVitals = await getPerfMetrics(page);


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
        timingMetrics,
    };

}