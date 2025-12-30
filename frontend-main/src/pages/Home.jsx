import ArticlesPage from "../features/ArticlesPage"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">
        BeyondChats AI Content Analyzer
      </h1>
      <p className="text-gray-600 mb-8">
        Compare original articles with AI-enhanced versions.
      </p>

      <ArticlesPage />
    </div>
  );
}
