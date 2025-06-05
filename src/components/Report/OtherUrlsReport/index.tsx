import { calculatePerformanceScore } from "../../../utils/performanceScore";
import { PerformanceMetrics } from "../../../types/analysisResult"
import { OtherUrlReportItem } from "./OtherUrlReportItem";

type OthersUrlsReportProps = {
    metricsObject: Record<string, PerformanceMetrics>;
}
export const OthersUrlsReport: React.FC<OthersUrlsReportProps> = ({ metricsObject }) => {

    return (
        <div style={{display: 'flex', flexDirection: 'column'}} >
            <span>Список обойденных ресурсов:</span>
            { Object.entries(metricsObject).map(([url, performanceMetrics]) => {
                const { percentage } = calculatePerformanceScore(performanceMetrics)
                return <OtherUrlReportItem key={url}  {...{ url, performanceMetrics, performanceScore: percentage, metrics: performanceMetrics }} />
            }) }
        </div>
    )
} 