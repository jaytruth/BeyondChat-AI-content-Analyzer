export function gapAnalysis(articleTitle, competitorAnalyses) {
  const titleWords = articleTitle
    .toLowerCase()
    .split(" ")
    .filter(w => w.length > 4);

  const competitorTopics = new Set();

  competitorAnalyses.forEach(c => {
    c.analysis?.topics?.forEach(t => competitorTopics.add(t));
  });

  const missingTopics = [...competitorTopics].filter(
    t => !titleWords.some(w => t.includes(w))
  );

  return {
    missingTopics: missingTopics.slice(0, 5),
    suggestions: missingTopics.slice(0, 5).map(t =>
      `Add a dedicated section on "${t}"`
    )
  };
}
