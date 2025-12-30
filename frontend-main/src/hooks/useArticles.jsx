import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles.api";

// export default function useArticles() {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchArticles()
//       .then(setArticles)
//       .finally(() => setLoading(false));
//   }, []);

//   return { articles, loading };
// }
export default function useArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/data/competitors.json")
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  return { articles, loading: articles.length === 0 };
}
