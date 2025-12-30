import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
