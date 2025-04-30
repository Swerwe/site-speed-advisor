import { MainController } from './core/mainController';
import { logger } from './utils/logger';
import { handleError } from './utils/errorHandler';

async function main() {
  try {
    // Get URL from command line arguments
    const url = process.argv[2];
    
    if (!url) {
      logger.error('Please provide a URL as the first argument');
      process.exit(1);
    }
    
    const controller = new MainController(url);
    await controller.runAnalysis();
    
    process.exit(0);
  } catch (error:any) {
    handleError(error, 'main execution');
    process.exit(1);
  }
}

main();