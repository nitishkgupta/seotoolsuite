/**
 * Get color hex code based on score.
 */
export function getDifficultyColor(score: number): string {
  if (score <= 14) return "#1ba005";
  if (score <= 29) return "#AADA2B";
  if (score <= 49) return "#ffbe02";
  if (score <= 69) return "#ef7a24";
  if (score <= 84) return "#bd462e";
  return "red";
}

/**
 * Get difficulty text based on score.
 */
export function getDifficultyText(score: number): string {
  if (score <= 14) return "Very Easy";
  if (score <= 29) return "Easy";
  if (score <= 49) return "Medium";
  if (score <= 69) return "Hard";
  if (score <= 84) return "Very Hard";
  return "Extremely Hard";
}
