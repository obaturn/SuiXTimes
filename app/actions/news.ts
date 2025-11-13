"use server";

import { z } from "zod";
const Parser = require("rss-parser");

const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  image: z.string().url(),
  category: z.string(),
  publishedAt: z.string(),
});

export type Article = z.infer<typeof ArticleSchema>;

const sampleArticles: Article[] = [
  {
    id: "1",
    title: "Sui Network Announces Major DeFi Partnership",
    description: "Sui Foundation partners with leading DeFi protocol to enhance ecosystem interoperability.",
    url: "https://example.com/sui-defi-partnership",
    image: "/placeholder.jpg",
    category: "DeFi",
    publishedAt: "2023-10-26T10:00:00Z",
  },
  {
    id: "2",
    title: "New Grant Program Launched for Sui Developers",
    description: "Sui Foundation launches $10M grant program to support ecosystem development.",
    url: "https://example.com/sui-grants",
    image: "/placeholder.jpg",
    category: "Grants",
    publishedAt: "2023-10-25T10:00:00Z",
  },
];

export async function fetchSuiNews(): Promise<Article[]> {
  const apiKey = process.env.NEWSAPI_KEY;

  if (!apiKey) {
    console.warn("NewsAPI key not found, returning sample articles.");
    return sampleArticles;
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=Sui+blockchain&apiKey=${apiKey}&pageSize=10&sortBy=publishedAt`
    );

    if (!response.ok) {
      throw new Error(`NewsAPI request failed with status ${response.status}`);
    }

    const data = await response.json();

    const articles = data.articles.map((article: any) => ({
      id: article.url, // Use URL as the unique ID
      title: article.title || "Untitled",
      description: article.description || "No description available",
      url: article.url,
      image: article.urlToImage || "/placeholder.jpg",
      category: "General", // Could be enhanced with categorization logic
      publishedAt: article.publishedAt,
    }));

    return articles;
  } catch (error) {
    console.error("Failed to fetch SUI news:", error);
    return sampleArticles;
  }
}

export async function fetchSuiOfficialNews(): Promise<Article[]> {
  try {
    // Fetch from Sui blog RSS or API if available
    // For now, using a placeholder - replace with actual Sui blog endpoint
    const parser = new Parser();
    const feed = await parser.parseURL('https://sui.io/blog/rss.xml'); // Assuming RSS feed exists

    const articles: Article[] = feed.items.slice(0, 10).map((item: any) => ({
      id: item.link || `sui-blog-${item.title}`,
      title: item.title || "Untitled",
      description: item.contentSnippet?.replace(/<[^>]*>/g, '') || "No description",
      url: item.link || "#",
      image: "/placeholder.jpg", // Sui blog might have images, but placeholder for now
      category: "Official",
      publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : "2023-10-26T10:00:00Z",
    }));

    return articles;
  } catch (error) {
    console.error("Failed to fetch SUI official news:", error);
    // Return sample articles as fallback
    return sampleArticles.filter(article => article.category === "Official" || true); // Adjust as needed
  }
}