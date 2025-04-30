export interface Config {
    puppeteer: {
      headless: boolean;
      slowMo: number;
      defaultViewport: {
        width: number;
        height: number;
      };
    };
    report: {
      outputPath: string;
      formats: ('html' | 'pdf')[];
    };
  }
  
  export const config: Config = {
    puppeteer: {
      headless: false,
      slowMo: 50,
      defaultViewport: {
        width: 1366,
        height: 768,
      },
    },
    report: {
      outputPath: './reports',
      formats: ['html', 'pdf'],
    },
  };