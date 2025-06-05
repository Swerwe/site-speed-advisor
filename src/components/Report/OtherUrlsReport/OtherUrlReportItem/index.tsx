import { PerformanceMetrics } from "../../../../types/analysisResult";
import { PerformanceScoreChart } from "../../../Report/PerformanceScore/PerformanceScoreChart";
import { DEFAULT_THRESHOLDS } from "../../../../constants/defaultThresholds";
type OtherUrlReportItemProps = {
    url: string;
    performanceScore: number;
    metrics: PerformanceMetrics;
    
} 

const getStatus = (key: string, value: number) => {
    const threshold = DEFAULT_THRESHOLDS[key as keyof typeof DEFAULT_THRESHOLDS];
    if (!threshold) return null;
  
    if (value >= threshold.error) return "error";
    if (value >= threshold.warning) return "warning";
    return null;
  };
  
  const METRIC_KEYS: { key: keyof PerformanceMetrics | "lcp" | "tbt"; label: string; unit?: string }[] = [
    { key: "ttfb", label: "TTFB", unit: "ms" },
    { key: "firstPaint", label: "FP", unit: "ms" },
    { key: "firstContentfulPaint", label: "FCP", unit: "ms" },
    { key: "loadTime", label: "Load", unit: "ms" },
    { key: "domReadyTime", label: "DOM", unit: "ms" },
    { key: "pageSize", label: "Size", unit: "KB" },
    { key: "domSize", label: "DOM Size", unit: "nodes" },
    { key: "lcp", label: "LCP", unit: "ms" },
    { key: "tbt", label: "TBT", unit: "ms" }
  ];
  
  export const OtherUrlReportItem: React.FC<OtherUrlReportItemProps> = ({
    url,
    performanceScore,
    metrics
  }) => {
    const warningOrErrorMetrics = METRIC_KEYS.map(({ key, label }) => {
      const value =
        key === "lcp" ? metrics.lcp?.value :
        key === "tbt" ? metrics.tbt?.value :
        (metrics as any)[key];
  
      const status = typeof value === "number" ? getStatus(key, value) : null;
  
      return status ? { label, status, value } : null;
    }).filter(Boolean) as { label: string; status: "warning" | "error"; value: number }[];
    const maxLength = 75;

    const displayUrl = url.length > maxLength
      ? url.slice(0, maxLength) + "..."
      : url;
    return (
      <div style={{ display: "flex", gap: 16, padding: 8, flexDirection: 'column' }}>
        <div style={{ display: "flex", alignItems: 'center', gap: 10 }}>
            URL: 
            <div style={{ maxWidth: 350, wordBreak: 'break-all', overflowWrap: 'break-word', whiteSpace: 'normal', fontWeight: 600 }}>
            {displayUrl}
            </div>
            <PerformanceScoreChart percentage={performanceScore} size={60} />
        </div>
        <div>Метрики, превышающие оптимальные значения:</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
          gap: "4px",
          maxWidth: 240
        }}>
            {warningOrErrorMetrics.map(({ label, status, value }, idx) => {
            const { unit } = METRIC_KEYS[idx]; // получаем единицу измерения
            return (
                <div
                key={label}
                title={`${label}: ${value} ${unit ?? ""}`}
                style={{
                    backgroundColor: status === "error" ? "#ff4d4f" : "#faad14",
                    color: "#fff",
                    fontSize: 11,
                    padding: "3px 4px",
                    borderRadius: 4,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}
                >
                {label}: {Math.round(value)}{unit ? ` ${unit}` : ""}
                </div>
            );
            })}

        </div>
      </div>
    );
  };