// /**
//  * Phase 1 – BeyondChats Blog Scraper
//  * Goal: Fetch 5 oldest blog articles
//  */
// import fs from "fs/promises"
// import path from "path"
// import axios from "axios"
// const cheerio  = require("cheerio")

// const BASE_URL = "https://beyondchats.com/blogs/page/";

// async function fetchPage(pageNumber) {
//   const url = `${BASE_URL}${pageNumber}/`;
//   const response = await axios.get(url);
//   return response.data;
// }

// function extractArticles(html) {
//   const $ = cheerio.load(html);
//   const articles = [];

//   $("article").each((_, element) => {
//     const title = $(element).find("h2 a").text().trim();
//     const link = $(element).find("h2 a").attr("href");
//     const date = $(element).find("time").text().trim();
//     const author = $(element).find(".author-name").text().trim();

//     if (title && link) {
//       articles.push({ title, link, date, author });
//     }
//   });

//   return articles;
// }

// async function getOldestFiveArticles() {
//   const collected = [];

//   // Page 15 (oldest page)
//   const page15HTML = await fetchPage(15);
//   collected.push(...extractArticles(page15HTML));

//   // Page 14 (next oldest)
//   if (collected.length < 5) {
//     const page14HTML = await fetchPage(14);
//     const page14Articles = extractArticles(page14HTML);

//     // Take from bottom (oldest first)
//     for (let i = page14Articles.length - 1; i >= 0; i--) {
//       collected.push(page14Articles[i]);
//       if (collected.length === 5) break;
//     }
//   }

//   return collected.slice(0, 5);
// }

// (async () => {
//   try {
//     const oldestArticles = await getOldestFiveArticles();
//     console.log("✅ Oldest 5 Articles:");
//     console.log(oldestArticles);
//   } catch (error) {
//     console.error("❌ Scraping failed:", error.message);
//   }
// })();
// const DATA_PATH = path.join(__dirname, "../data/articles.json");

// async function saveArticles(articles) {
//   try {
//     await fs.writeFile(
//       DATA_PATH,
//       JSON.stringify(articles, null, 2),
//       "utf-8"
//     );
//     console.log("✅ Articles saved to data/articles.json");
//   } catch (err) {
//     console.error("❌ Error saving articles:", err);
//   }
// }
// await saveArticles(articles);

/**
 * Phase 1 – BeyondChats Blog Scraper
 * Goal: Fetch 5 oldest blog articles
 */

import fs from "fs/promises";
import path from "path";
import axios from "axios";
import * as cheerio from "cheerio";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://beyondchats.com/blogs/page/";
const DATA_PATH = path.join(__dirname, "../data/articles.json");

async function fetchPage(pageNumber) {
  const url = `${BASE_URL}${pageNumber}/`;
  const response = await axios.get(url);
  return response.data;
}

function extractArticles(html) {
  const $ = cheerio.load(html);
  const articles = [];

  $("article").each((_, element) => {
    const title = $(element).find("h2 a").text().trim();
    const link = $(element).find("h2 a").attr("href");
    const date = $(element).find("time").text().trim();
    const author = $(element).find(".author-name").text().trim();

    if (title && link) {
      articles.push({
        title,
        link,
        date,
        author,
        content: "",
        updated_version: null,
        references: []
      });
    }
  });

  return articles;
}

async function getOldestFiveArticles() {
  const collected = [];

  const page15HTML = await fetchPage(15);
  collected.push(...extractArticles(page15HTML));

  if (collected.length < 5) {
    const page14HTML = await fetchPage(14);
    const page14Articles = extractArticles(page14HTML);

    for (let i = page14Articles.length - 1; i >= 0; i--) {
      collected.push(page14Articles[i]);
      if (collected.length === 5) break;
    }
  }

  return collected.slice(0, 5);
}

async function saveArticles(articles) {
  await fs.writeFile(
    DATA_PATH,
    JSON.stringify(articles, null, 2),
    "utf-8"
  );
  console.log("✅ Articles saved to data/articles.json");
}

// 🚀 MAIN
try {
  const oldestArticles = await getOldestFiveArticles();
  console.log("✅ Oldest 5 Articles:");
  console.log(oldestArticles);

  await saveArticles(oldestArticles);
} catch (err) {
  console.error("❌ Error:", err.message);
}
