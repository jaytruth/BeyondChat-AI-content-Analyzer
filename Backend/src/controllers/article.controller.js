import {
    readArticle,
    writeArticle
} from "../services/article.service.js"

export async function getAllArticles(req,res){
    const articles = await readArticle()
    res.json(articles)
}
export async function getArticleById(req,res) {
    const articles = await readArticle()
    const article = articles.find(a => a.id === Number(req.params.id))
    if(!article){
        return res.status(404).json({error : "Article Not found"})

    }
    res.json(article)
}
export async function createArticle(req, res) {
  const articles = await readArticle();
  const newArticle = {
    id: Date.now(),
    ...req.body
  };

  articles.push(newArticle);
  await writeArticles(articles);

  res.status(201).json(newArticle);
}

// update
export async function updateArticle(req, res) {
  const articles = await readArticles();
  const index = articles.findIndex(a => a.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Article not found" });
  }

  articles[index] = { ...articles[index], ...req.body };
  await writeArticle(articles);

  res.json(articles[index]);
}

// DELETE
export async function deleteArticle(req, res) {
  let articles = await readArticles();
  articles = articles.filter(a => a.id !== Number(req.params.id));

  await writeArticle(articles);
  res.json({ success: true });
}