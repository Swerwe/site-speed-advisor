import { PerformanceScore } from "../utils/performanceScore";

// src/recommendations/types.ts
export type LCPRecommendations = {
    mainMessage: string | null;
    recommendations: string[];
}
export type TBTRecommendations = {
    mainMessage: string | null;
    recommendations: string[];
}
export type RecommendationObject = {
    lcpRecommendations: LCPRecommendations | null;
    tbtRecommendations: TBTRecommendations | null;
    recommendations: string[];
    performanceScore: number;
}
