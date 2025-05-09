import React from "react";
import { RecommendationObject } from "../../../recommendations/types";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Props = {
  recommendationObject: RecommendationObject;
};

export const Recommendations: React.FC<Props> = ({ recommendationObject }) => {
  const { recommendations, lcpRecommendations, tbtRecommendations } = recommendationObject;

  const renderList = (items: string[], prefix: string) => (
    <List>
      {items.map((rec, i) => (
        <ListItem key={`${prefix}-${i}`} disablePadding>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <CheckCircleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={rec} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2, maxWidth: "700px" }}>
      {recommendations.length > 0 && (
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Общие рекомендации
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {renderList(recommendations, "general")}
          </CardContent>
        </Card>
      )}

      {lcpRecommendations && (
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Рекомендации по уменьшению Largest Contentful Paint
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {lcpRecommendations.mainMessage && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {lcpRecommendations.mainMessage}
              </Typography>
            )}
            {renderList(lcpRecommendations.recommendations, "lcp")}
          </CardContent>
        </Card>
      )}

      {tbtRecommendations && (
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Рекомендации по уменьшению Total Blocking Time
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {tbtRecommendations.mainMessage && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {tbtRecommendations.mainMessage}
              </Typography>
            )}
            {renderList(tbtRecommendations.recommendations, "tbt")}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
