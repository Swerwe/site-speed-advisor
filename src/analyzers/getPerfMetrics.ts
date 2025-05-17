import { Page } from 'puppeteer';
import { lcpObject, tbtObject } from '../types/pageData';

export async function injectPerfObserver(page: Page): Promise<void> {
  await page.evaluateOnNewDocument(() => {
    (window as any).__perfMetrics = { 
      lcp: {
        value: 0
      }, 
      tbt: {
        value: 0,
        longTasks: [],
        scripts: {
          withDefer: 0,
          withAsync: 0,
          total: 0
        },
        mainThreadBlocks: 0
      },

    };
    // Отслеживание долгих задач (>50ms)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          (window as any).__perfMetrics.tbt.longTasks.push({
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name
          });
        }
      }
    });


    observer.observe({ entryTypes: ['longtask'] });

    // Анализ скриптов на странице
    document.addEventListener('DOMContentLoaded', () => {
      const scripts = document.getElementsByTagName('script');
      (window as any).__perfMetrics.tbt.scripts.total = scripts.length;
      
      for (const script of scripts) {
        if (script.defer) (window as any).__perfMetrics.scripts.withDefer++;
        if (script.async) (window as any).__perfMetrics.scripts.withAsync++;
      }
    });

    // Простое отслеживание блокировок основного потока
    let lastTime = performance.now();
    setInterval(() => {
      const now = performance.now();
      const delta = now - lastTime;
      if (delta > 100) { // Если интервал между вызовами значительно больше, чем должен быть
        (window as any).__perfMetrics.tbt.mainThreadBlocks++;
      }
      lastTime = now;
    }, 50);

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as PerformanceEntry[];
      const lastEntry = entries[entries.length - 1] as any; // LCP entry
      (window as any).__perfMetrics.lcp.value = lastEntry.startTime;
      // Определяем тип элемента LCP
      if (lastEntry) {
        (window as any).__perfMetrics.lcp.lcpElementType = lastEntry.entryType;
        (window as any).__perfMetrics.lcp.lcpElementTag =
          lastEntry.element?.tagName?.toLowerCase() || null;

        // Для изображений и видео
        if (['img', 'image', 'video'].includes(lastEntry.element?.tagName?.toLowerCase())) {
          (window as any).__perfMetrics.lcp.lcpElementUrl =
            lastEntry.element?.src || lastEntry.element?.currentSrc || null;

          // Проверяем preload
          const linkElements = Array.from(document.querySelectorAll('link[rel="preload"]'));
          (window as any).__perfMetrics.lcp.isPreloaded = linkElements.some(
            (link: any) =>
              link.as === 'image' && link.href === (window as any).__perfMetrics.lcp.lcpElementUrl,
          );

          // Проверяем современные форматы
          if ((window as any).__perfMetrics.lcp.lcpElementUrl) {
            const url = (window as any).__perfMetrics.lcp.lcpElementUrl.toLowerCase();
            (window as any).__perfMetrics.isModernFormat =
              url.endsWith('.webp') || url.endsWith('.avif');
          }
        }

        // Для текстовых блоков
        if (
          ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'].includes(
            lastEntry.element?.tagName?.toLowerCase(),
          )
        ) {
          (window as any).__perfMetrics.lcp.lcpElementType = 'text';
        }
      }
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Collect Total Blocking Time (TBT) from Long Tasks
    const longTaskObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const task = entry as any; // LongTask entry
        if (task.duration > 50) {
          (window as any).__perfMetrics.tbt.value += task.duration - 50;
        }
      }
    });
    longTaskObserver.observe({ type: 'longtask', buffered: true });
  });
}

export async function getPerfMetrics(page: Page): Promise<{ 

    tbt: tbtObject;
    lcp: lcpObject;
  }> {
    return page.evaluate(() => {
      return (window as any).__perfMetrics;
    });
  }