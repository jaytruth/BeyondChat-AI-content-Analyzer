export default function ArticleCard({ article, onSelect }) {
  return (
    <div
      onClick={() => onSelect(article)}
      className="cursor-pointer rounded-xl bg-white p-5 shadow hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold">{article.article}</h3>
      <p className="text-gray-500 mt-2">Click to analyze content gaps and AI suggestions</p>
    </div>
  );
}
