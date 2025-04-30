import { logger } from './logger';

export function handleError(error: Error, context?: string): void {
  const message = context 
    ? `Error in ${context}: ${error.message}`
    : `Error: ${error.message}`;
  
  logger.error(message);
  
  // Here you could add additional error handling like:
  // - Sending error to monitoring service
  // - Graceful shutdown procedures
  // - etc.
}