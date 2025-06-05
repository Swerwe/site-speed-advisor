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
import { PerformanceScore} from './PerformanceScore';
import { Description } from './Description';
import { OthersUrlsReport } from './OtherUrlsReport';

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
            <title>Отчет о производительности - {data.url}</title>
        </head>
        <body>
            <GlobalStyle>
            <Title style={{marginLeft: '15px'}}>Отчет о производительности</Title>
            <div style={{display:'flex', gap: '50px', alignItems: "start"}}>
              <div>
                <PerformanceScore performanceScore={data.recommendationObject.performanceScore} />
                <Recommendations recommendationObject={data.recommendationObject} />
              </div>
              <div>
                <Description url ={data.url} />
                <MetricsComponent data={data} />
              </div>

             {data.metricsObject &&<OthersUrlsReport metricsObject={data.metricsObject} />}
            </div>
            </GlobalStyle>
        </body>
        </html>
    </ThemeProvider>
  );
};