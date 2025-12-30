// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const SERPER_URL = "https://google.serper.dev/search";
// function relevanceScore(query, title) {
//   const qWords = query.toLowerCase().split(" ");
//   const tWords = title.toLowerCase().split(" ");

//   let match = 0;
//   qWords.forEach(w => {
//     if (tWords.includes(w)) match++;
//   });

//   return match / qWords.length;
// }

// export async function searchGoogle(query) {
//   const response = await axios.post(
//     SERPER_URL,
//     {
//       q: query,
//       num: 5
//     },
//     {
//       headers: {
//         "X-API-KEY": process.env.SERPER_API_KEY,
//         "Content-Type": "application/json"
      
//       }
//     }
//   );

//   // Filter only blog/article links
//   const organic = response.data.organic || [];

//   const articleLinks = organic
//     .filter(item =>
//       item.link &&
//       !item.link.includes("youtube") &&
//       !item.link.includes("pdf")  &&
//       !item.link.includes("beyondchats.com")
//     )
//     .slice(0, 3)
//     .map(item => ({
//       title: item.title,
//       link: item.link,
//       score: relevanceScore(query,item.title)
//     })).sort((a,b) => b.score - a.score);

//   return articleLinks;
// }

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const SERPER_URL = "https://google.serper.dev/search";

const BLOCKED_DOMAINS = [
  "pinterest.com",
  "amazon.",
  "linkedin.com",
  "youtube.com",
  "reddit.com",
  "facebook.com",
  "quora.com",
  "medium.com"
];

function relevanceScore(query, title) {
  const qWords = query.toLowerCase().split(" ");
  const tWords = title.toLowerCase().split(" ");
  let match = 0;

  qWords.forEach(w => {
    if (tWords.includes(w)) match++;
  });

  return match / qWords.length;
}

export async function searchGoogle(query) {
  const response = await axios.post(
    SERPER_URL,
    { q: query, num: 5 },
    {
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );

  const organic = response.data.organic || [];

  return organic
    .filter(item =>
      item.link &&
      !BLOCKED_DOMAINS.some(domain => item.link.includes(domain)) &&
      !item.link.includes("pdf") &&
      !item.link.includes("beyondchats.com")
    )
    .map(item => ({
      source: "google",
      title: item.title,
      link: item.link,
      score: relevanceScore(query, item.title)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
}
