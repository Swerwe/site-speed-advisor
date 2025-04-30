import React from 'react';
import { Alert, Typography } from '@mui/material';
import { MetricAlertProps, AlertSeverity } from './types';

const MetricAlert: React.FC<MetricAlertProps> = ({
  name,
  value,
  unit = 'ms',
  thresholds,
  formatValue = (val:number) => val.toString(),
}) => {
  let severity: AlertSeverity = 'success';
  let message = '';
  
  if (thresholds) {
    if (value >= thresholds.error) {
      severity = 'error';
      message = thresholds.errorText || '';
    } else if (value >= thresholds.warning) {
      severity = 'warning';
      message = thresholds.warningText || '';
    }
  }

  const formattedValue = formatValue(value);

  return (
    <Alert 
      severity={severity} 
      sx={{ mb: 1, alignItems: 'flex-start' }}
    >
      <div>
        <Typography component="div" variant="body2">
          <strong>{name}:</strong> {formattedValue} {unit}
        </Typography>
        {message && (
          <Typography 
            component="div" 
            variant="caption" 
            sx={{ mt: 0.5 }}
          >
            {message}
          </Typography>
        )}
      </div>
    </Alert>
  );
};

export default MetricAlert;