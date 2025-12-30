import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, "../../../data/articles.json");

export async function readArticle() {
  const data = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(data);
}

export async function writeArticle(articles) {
  await fs.writeFile(
    DATA_PATH,
    JSON.stringify(articles, null, 2),
    "utf-8"
  );
}
