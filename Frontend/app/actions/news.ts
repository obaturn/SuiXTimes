"use server";

import { z } from "zod";

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
    publishedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "New Grant Program Launched for Sui Developers",
    description: "Sui Foundation launches $10M grant program to support ecosystem development.",
    url: "https://example.com/sui-grants",
    image: "/placeholder.jpg",
    category: "Grants",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
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

    const articles = data.articles.map((article: any, index: number) => ({
      id: `news-${index}`,
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