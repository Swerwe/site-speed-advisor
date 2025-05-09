import { URL } from 'url';
import { loadPage } from './pageLoader';
import { PageData } from '../types/pageData';
import { launchBrowser } from './puppeteerHelper';
import { config } from '../config/config';
import { logger } from '../utils/logger';

export async function crawlDomain(url: string, maxLinks: number = 10): Promise<PageData[]> {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setViewport(config.puppeteer.defaultViewport);

    logger.info(`Crawling root page: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Извлекаем до 10 ссылок из <nav> или всех ссылок на странице
    const links: string[] = await page.evaluate(() => {
        const navLinks = Array.from(document.querySelectorAll('nav a[href]')) as HTMLAnchorElement[];
        const allLinks = navLinks.length > 0 ? navLinks : Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[];
        const hrefs = allLinks.map(link => link.href);
        return Array.from(new Set(hrefs)); // уникальные
    });

    const baseDomain = new URL(url).hostname;

    // Фильтруем только ссылки с тем же доменом
    const sameDomainLinks = links.filter(link => {
        try {
            const linkHost = new URL(link).hostname;
            return linkHost === baseDomain;
        } catch {
            return false;
        }
    }).slice(0, maxLinks);

    await browser.close(); // Закрываем начальный browser — дальше будет по одному на страницу

    // Анализируем главную и дополнительные страницы
    const urlsToLoad = [url, ...sameDomainLinks];
    const results: PageData[] = [];

    for (const pageUrl of urlsToLoad) {
        try {
            const data = await loadPage(pageUrl);
            results.push(data);
        } catch (err) {
            logger.warn(`Failed to analyze page: ${pageUrl}`, err);
        }
    }

    return results;
}
