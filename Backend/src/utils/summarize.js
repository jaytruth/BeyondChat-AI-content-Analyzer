export function summarizePage(pageData) {
  if (!pageData || pageData.error) return null;

  const summary = [];
  const topics = new Set();

  // Extract from headings
  pageData.headings?.forEach(h => {
    topics.add(h.toLowerCase());
  });

  // Extract from paragraphs
  pageData.content?.forEach(p => {
    summary.push(p.slice(0, 160));
    const words = p.split(" ");
    if (words.length > 6) {
      topics.add(words.slice(0, 4).join(" ").toLowerCase());
    }
  });

  return {
    summary: summary.slice(0, 5),
    topics: Array.from(topics).slice(0, 6)
  };
}
