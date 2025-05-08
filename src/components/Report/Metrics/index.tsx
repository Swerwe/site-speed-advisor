import React from 'react';
import MetricAlert from './MetricAlert';
import { MetricsComponentProps } from './types';
import { DEFAULT_THRESHOLDS } from '../../../constants/defaultThresholds';

const MetricsComponent: React.FC<MetricsComponentProps> = ({ data }) => {
  return (
    <div>
        <h2>Метрики производительности веб-приложения:</h2>
        <MetricAlert name="Load Time" value={data.loadTime} thresholds={DEFAULT_THRESHOLDS.loadTime} />
        <MetricAlert name="DOM Ready Time" value={data.domReadyTime} thresholds={DEFAULT_THRESHOLDS.domReadyTime} />
        <MetricAlert 
        name="Largest Contentful Paint" 
        value={data.lcp.value} 
        thresholds={DEFAULT_THRESHOLDS.lcp} 
        />
        <MetricAlert 
        name="Total Blocking Time" 
        value={data.tbt.value} 
        thresholds={DEFAULT_THRESHOLDS.tbt} 
        />
        <MetricAlert 
        name="Time to First Byte (TTFB)" 
        value={data.ttfb} 
        thresholds={DEFAULT_THRESHOLDS.ttfb} 
        />
        <MetricAlert 
        name="First Paint" 
        value={data.firstPaint} 
        thresholds={DEFAULT_THRESHOLDS.firstPaint} 
        />
        <MetricAlert 
        name="First Contentful Paint" 
        value={data.firstContentfulPaint} 
        thresholds={DEFAULT_THRESHOLDS.firstContentfulPaint} 
        />
        <MetricAlert 
        name="Page Size" 
        value={data.pageSize / 1024} 
        unit="KB" 
        formatValue={(val) => val.toFixed(2)}
        thresholds={DEFAULT_THRESHOLDS.pageSize} 
        />
        <MetricAlert name="DOM Size" value={data.domSize} thresholds={DEFAULT_THRESHOLDS.domSize} />
    </div>
  );
};

export default MetricsComponent;
