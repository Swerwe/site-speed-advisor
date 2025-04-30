import { AlertProps } from '@mui/material';

export interface MetricAlertProps {
  name: string;
  value: number;
  unit?: string;
  thresholds?: {
    warning: number;
    error: number;
    warningText?: string;
    errorText?: string;
  };
  formatValue?: (value: number) => string;
}

export type AlertSeverity = AlertProps['severity'];