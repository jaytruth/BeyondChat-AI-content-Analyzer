import { useState } from "react";
import useArticles from "../hooks/useArticles";
import ArticleList from "./ArticleList";

export default function ArticlesPage() {
  const { articles, loading } = useArticles();
  const [selected, setSelected] = useState(null);
   
  if (loading) return <p>Loading...</p>;
  if (!loading && articles.length === 0) {
  return (
    <div className="text-center mt-20 text-gray-500">
      <p className="text-xl font-semibold">No articles found</p>
      <p className="mt-2">
        Add articles to <code>articles.json</code> to begin analysis
      </p>
    </div>
  );
}


  if (selected) {
    const missingTopics = selected.gaps?.missingTopics ?? [];
    const suggestions = selected.gaps?.suggestions ?? [];

    return (
      <div className="max-w-4xl mx-auto p-6">
        <button onClick={() => setSelected(null)} className="text-blue-600 mb-4">
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-4">{selected.article}</h2>

        {/* GAPS */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Content Gaps</h3>

          {missingTopics.length === 0 ? (
            <p className="text-green-600">No major gaps found 🎉</p>
          ) : (
            <ul className="list-disc pl-5">
              {missingTopics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          )}
        </div>
        

        {/* SUGGESTIONS */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">AI Suggestions</h3>

          {suggestions.length === 0 ? (
            <p className="text-gray-500">No suggestions available</p>
          ) : (
            <ul className="list-disc pl-5">
              {suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </div>

        {/* COMPETITORS */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Competitor Comparison</h3>

          <div className="space-y-4">
            {selected.competitors?.map((c, i) => (
              <div key={i} className="border p-4 rounded">
                <p className="font-semibold">{c.title}</p>
                <p className="text-sm text-gray-600">
                  Relevance score: {c.score}
                </p>
                <div className="text-blue-600 mb-4">
                <a href={c.link} target="_blank" rel="noreferrer">
                  View source
                </a>
                 
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  

  return <ArticleList articles={articles} onSelect={setSelected} />;
}