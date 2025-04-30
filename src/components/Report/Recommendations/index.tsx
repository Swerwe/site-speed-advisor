import React from "react";
import { RecommendationObject } from "../../../recommendations/types";
type Props = {
    recommendationObject: RecommendationObject;
  };
  
export const Recommendations: React.FC<Props> = ({ recommendationObject }) => {
const { recommendations, lcpRecommendations, tbtRecommendations } = recommendationObject;

return (
    <div className="space-y-6 p-4">
    {recommendations.length > 0 && (
        <section>
        <h2 className="text-xl font-semibold mb-2">Общие рекомендации</h2>
        <ul className="list-disc list-inside space-y-1">
            {recommendations.map((rec, i) => (
            <li key={`general-${i}`}>{rec}</li>
            ))}
        </ul>
        </section>
    )}

    {lcpRecommendations && (
        <section>
        <h2 className="text-xl font-semibold mb-2">Рекомендации по LCP</h2>
        {lcpRecommendations.mainMessage && (
            <p className="mb-2 text-gray-700">{lcpRecommendations.mainMessage}</p>
        )}
        <ul className="list-disc list-inside space-y-1">
            {lcpRecommendations.recommendations.map((rec, i) => (
            <li key={`lcp-${i}`}>{rec}</li>
            ))}
        </ul>
        </section>
    )}

    {tbtRecommendations && (
        <section>
        <h2 className="text-xl font-semibold mb-2">Рекомендации по TBT</h2>
        {tbtRecommendations.mainMessage && (
            <p className="mb-2 text-gray-700">{tbtRecommendations.mainMessage}</p>
        )}
        <ul className="list-disc list-inside space-y-1">
            {tbtRecommendations.recommendations.map((rec, i) => (
            <li key={`tbt-${i}`}>{rec}</li>
            ))}
        </ul>
        </section>
    )}
    </div>
);
};
