import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(url) {
  try {
    const { data } = await axios.get(url, {
      timeout: 8000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (AI Content Analyzer Bot)"
      }
    });

    const $ = cheerio.load(data);

    // Extract clean text
    const title = $("h1").first().text().trim();

    const headings = [];
    $("h2").each((_, el) => {
      headings.push($(el).text().trim());
    });

    const paragraphs = [];
    $("p").each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 80) paragraphs.push(text);
    });

    return {
      title,
      headings,
      content: paragraphs.slice(0, 8) // limit noise
    };
  } catch (err) {
    return { error: "Failed to scrape", url };
  }
}
