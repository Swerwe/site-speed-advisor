import React from "react";
import { PerformanceScoreChart } from "./PerformanceScoreChart";
interface PerformanceScore {
    performanceScore: number;
}
export const PerformanceScore: React.FC<PerformanceScore> = ({ performanceScore }) => {
    return <div style={{display: "flex", alignItems: "center", marginLeft: "15px"}}>
        <PerformanceScoreChart percentage={performanceScore} />
        <span style={{ fontWeight: 600, fontSize: "24px", maxWidth: "220px", paddingLeft: "20px"}}>Общая производительность</span>
    </div>
}