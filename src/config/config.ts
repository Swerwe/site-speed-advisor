export interface Config {
    puppeteer: {
      headless: boolean;
      slowMo: number;
      defaultViewport: {
        width: number;
        height: number;
      };
    };
    crawling: boolean;
    report: {
      outputPath: string;
      formats: ('html' | 'pdf' | 'json')[];
    };
  }
  
  export const config: Config = {
    puppeteer: {
      headless: true,
      slowMo: 50,
      defaultViewport: {
        width: 1366,
        height: 768,
      },
    },
    crawling: true,
    report: {
      outputPath: './reports',
      formats: ['html', 'pdf'],
    },
  };