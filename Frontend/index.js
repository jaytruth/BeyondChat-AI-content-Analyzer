import dotenv from "dotenv";
dotenv.config({path : "../.env"});
import fs from "fs/promises";
import axios from "axios";
import { searchGoogle } from "./googleSearch.js";
import { scrapeArticle } from "../Backend/src/utils/scrapeArticle.js";
import { summarizePage } from "../Backend/src/utils/summarize.js";
import { gapAnalysis } from "../Backend/src/utils/gapAnalysis.js";
const API_URL = "http://localhost:5000/api/articles"

async function fetchArticle() {
    const res = await axios.get(API_URL)
    return res.data    
}
// async function main() {
//   const articles = await fetchArticle();
//   console.log("📄 Articles fetched:");

//   for (const article of articles) {
//     console.log("\n🔍 Searching for:", article.title);

//     const competitors = await searchGoogle(article.title);

//     console.log("Top competing articles:");
//     competitors.forEach(c => console.log(" -", c.link));
//   }
// }
async function main() {
  const articles = await fetchArticle();
  const results = [];

  for (const article of articles) {
    const competitors = await searchGoogle(article.title);
      for (const comp of competitors) {
        comp.pageData = await scrapeArticle(comp.link);
        comp.analysis = summarizePage(comp.pageData)
        }
      const gaps = gapAnalysis(article.title,competitors)
    results.push({
      article: article.title,
      gaps,
      competitors
    });
  }

  await fs.writeFile(
    "../data/competitors.json",
    JSON.stringify(results, null, 2)
  );

  console.log("Competitor analysis saved");
}
main();