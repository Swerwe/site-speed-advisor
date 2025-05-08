import React from 'react';
import { ReportData } from '../../types/analysisResult';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './theme';
import {
  GlobalStyle,
  Title,
  Metric,
  MetricName,
  RecommendationsContainer,
  Recommendation,
  ScreenshotImage
} from './styles';
import MetricsComponent from './Metrics';
import { Recommendations } from './Recommendations';
import { PerformanceScoreChart } from './PerformanceScore';

interface ReportProps {
  data: ReportData;
}

export const Report: React.FC<ReportProps> = ({ data }) => {
  return (
    <ThemeProvider theme={appTheme}>
        <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Performance Report - {data.url}</title>
        </head>
        <body>
            <GlobalStyle>
            <Title>Performance Report</Title>
            <p>
                <strong>URL:</strong> {data.url}
            </p>
            <p>
                <strong>Date:</strong> {new Date().toLocaleString()}
            </p>
            <PerformanceScoreChart percentage={data.recommendationObject.performanceScore} />
            <div style={{display:'flex', gap: '20px'}}>
                <MetricsComponent data={data} />
                <Recommendations recommendationObject={data.recommendationObject} />
            </div>

            {data.screenshot && (
                <>
                <h2>Screenshot</h2>
                <ScreenshotImage
                    src={`data:image/png;base64,${data.screenshot.toString('base64')}`}
                    alt="Page screenshot"
                />
                </>
            )}
            </GlobalStyle>
        </body>
        </html>
    </ThemeProvider>
  );
};