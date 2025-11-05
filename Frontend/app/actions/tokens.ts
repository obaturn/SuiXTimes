"use server";

import { z } from "zod";

const TokenSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  price: z.number(),
  changeHour: z.number(),
  change24h: z.number(),
  marketCapFormatted: z.string(),
  volumeFormatted: z.string(),
  isMostBought: z.boolean(),
  image: z.string().url(),
});

export type Token = z.infer<typeof TokenSchema>;

const sampleTokens: Token[] = [
  {
    id: "sui",
    name: "Sui",
    symbol: "SUI",
    price: 1.5,
    changeHour: 1.2,
    change24h: 3.2,
    marketCapFormatted: "$1.5B",
    volumeFormatted: "$1.2M",
    isMostBought: true,
    image: "/placeholder.svg",
  },
  {
    id: "usd-coin",
    name: "USD Coin",
    symbol: "USDC",
    price: 1.0,
    changeHour: 0.1,
    change24h: 0.1,
    marketCapFormatted: "$33B",
    volumeFormatted: "$5.6B",
    isMostBought: false,
    image: "/placeholder.svg",
  },
  {
    id: "cetus-protocol",
    name: "Cetus Protocol",
    symbol: "CETUS",
    price: 0.5,
    changeHour: -0.5,
    change24h: -1.5,
    marketCapFormatted: "$100M",
    volumeFormatted: "$500K",
    isMostBought: false,
    image: "/placeholder.svg",
  },
];

export async function fetchTopPerformingTokens(): Promise<Token[]> {
  const apiKey = process.env.coingecko_api;
  const suiEcosystemIds = ["sui", "usd-coin", "cetus-protocol", "turbos-finance", "bucket-protocol", "aftermath-finance", "navi-protocol", "scallop-protocol"];

  if (!apiKey) {
    console.warn("CoinGecko API key not found, returning sample data.");
    return sampleTokens;
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${suiEcosystemIds.join(",")}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h&x_cg_demo_api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API request failed with status ${response.status}`);
    }

    const data = await response.json();

    const tokens = data.map((token: any) => ({
      id: token.id,
      name: token.name,
      symbol: token.symbol.toUpperCase(),
      price: token.current_price,
      changeHour: token.price_change_percentage_1h_in_currency || 0,
      change24h: token.price_change_percentage_24h_in_currency || 0,
      marketCapFormatted: token.market_cap >= 1_000_000_000
        ? `$${(token.market_cap / 1_000_000_000).toFixed(2)}B`
        : `$${(token.market_cap / 1_000_000).toFixed(2)}M`,
      volumeFormatted: token.total_volume >= 1_000_000
        ? `$${(token.total_volume / 1_000_000).toFixed(2)}M`
        : `$${(token.total_volume / 1_000).toFixed(2)}K`,
      isMostBought: false, // This would require more complex logic to determine
      image: token.image,
    }));

    return tokens.sort((a: any, b: any) => b.market_cap - a.market_cap);
  } catch (error) {
    console.error("Failed to fetch top performing tokens:", error);
    return sampleTokens;
  }
}

export async function fetchSuiChartData(days: number = 7): Promise<any> {
  const apiKey = process.env.coingecko_api;

  if (!apiKey) {
    console.warn("CoinGecko API key not found, returning sample chart data.");
    return getSampleChartData();
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/sui/market_chart?vs_currency=usd&days=${days}&interval=daily&x_cg_demo_api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return {
      prices: data.prices.map(([timestamp, price]: [number, number]) => ({
        timestamp,
        price,
        date: new Date(timestamp).toLocaleDateString()
      })),
      market_caps: data.market_caps,
      total_volumes: data.total_volumes
    };
  } catch (error) {
    console.error("Failed to fetch SUI chart data:", error);
    return getSampleChartData();
  }
}

function getSampleChartData() {
  const now = Date.now();
  const prices = [];
  let currentPrice = 1.5;

  for (let i = 30; i >= 0; i--) {
    const timestamp = now - (i * 24 * 60 * 60 * 1000);
    currentPrice += (Math.random() - 0.5) * 0.1; // Random price movement
    currentPrice = Math.max(0.5, Math.min(2.5, currentPrice)); // Keep within reasonable range
    prices.push([timestamp, currentPrice]);
  }

  return {
    prices: prices.map(([timestamp, price]) => ({
      timestamp,
      price,
      date: new Date(timestamp).toLocaleDateString()
    })),
    market_caps: prices.map(([timestamp, price]) => [timestamp, price * 1500000000]),
    total_volumes: prices.map(([timestamp, price]) => [timestamp, Math.random() * 100000000 + 50000000])
  };
}
