import { PerformanceMetrics } from '../types/analysisResult';
import { DEFAULT_THRESHOLDS } from '../constants/defaultThresholds';

type MetricScore = {
  metric: string;
  value: number;
  score: number; // 0, 1, 2
  level: "ok" | "warning" | "error";
  message: string;
};

export type PerformanceScore = {
  totalScore: number;
  maxScore: number;
  percentage: number;
  details: MetricScore[];
};

function evaluateMetric(metric: string, value: number): MetricScore {
  const threshold = DEFAULT_THRESHOLDS[metric as keyof typeof DEFAULT_THRESHOLDS];
  if (!threshold) throw new Error(`Нет порогов для метрики: ${metric}`);

  let score = 2;
  let level: "ok" | "warning" | "error" = "ok";
  let message = "";

  if (value >= threshold.error) {
    score = 0;
    level = "error";
    message = threshold.errorText;
  } else if (value >= threshold.warning) {
    score = 1;
    level = "warning";
    message = threshold.warningText;
  }

  return { metric, value, score, level, message };
}

export function calculatePerformanceScore(data: PerformanceMetrics): PerformanceScore {
  const metrics: MetricScore[] = [
    evaluateMetric("ttfb", data.ttfb),
    evaluateMetric("tbt", data.tbt.value),
    evaluateMetric("lcp", data.lcp.value),
    evaluateMetric("firstPaint", data.firstPaint),
    evaluateMetric("firstContentfulPaint", data.firstContentfulPaint),
    evaluateMetric("loadTime", data.loadTime),
    evaluateMetric("domReadyTime", data.domReadyTime),
    evaluateMetric("pageSize", data.pageSize),
    evaluateMetric("domSize", data.domSize),
  ];

  const totalScore = metrics.reduce((sum, m) => sum + m.score, 0);
  const maxScore = metrics.length * 2;
  const percentage = Math.round((totalScore / maxScore) * 100);

  return { totalScore, maxScore, percentage, details: metrics };
}
