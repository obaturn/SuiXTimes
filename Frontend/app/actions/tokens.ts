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

const primarySuiTokens = [
  // Major tokens
  "sui", "usd-coin",

  // DeFi Protocols
  "cetus-protocol", "turbos-finance", "bucket-protocol", "aftermath-finance",
  "navi-protocol", "scallop-protocol", "suilend", "deepbook",

  // Gaming & NFTs
  "sui-heroes", "suimon", "sui-monster",

  // Infrastructure
  "walrus-protocol", "mysten-labs",

  // Other popular tokens
  "alpha-finance", "sui-yield", "sui-staking", "sui-liquid-staking"
];

export async function fetchTopPerformingTokens(): Promise<Token[]> {
  const apiKey = process.env.coingecko_api;

  // Try to fetch from CoinGecko first
  if (apiKey) {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${primarySuiTokens.join(",")}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h&x_cg_demo_api_key=${apiKey}`
      );

      if (response.ok) {
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
            : token.market_cap >= 1_000_000
            ? `$${(token.market_cap / 1_000_000).toFixed(2)}M`
            : `$${(token.market_cap / 1_000).toFixed(2)}K`,
          volumeFormatted: token.total_volume >= 1_000_000
            ? `$${(token.total_volume / 1_000_000).toFixed(2)}M`
            : token.total_volume >= 1_000
            ? `$${(token.total_volume / 1_000).toFixed(2)}K`
            : `$${token.total_volume.toFixed(2)}`,
          isMostBought: false,
          image: token.image,
        }));

        // If we got tokens from CoinGecko, try to supplement with additional Sui tokens
        const additionalTokens = await fetchAdditionalSuiTokens();
        const allTokens = [...tokens, ...additionalTokens];

        // Remove duplicates based on symbol
        const uniqueTokens = allTokens.filter((token, index, self) =>
          index === self.findIndex(t => t.symbol === token.symbol)
        );

        return uniqueTokens.sort((a: any, b: any) => (b.marketCapFormatted.includes('B') ? 1 : 0) - (a.marketCapFormatted.includes('B') ? 1 : 0) || parseFloat(b.marketCapFormatted.replace(/[$,MB]/g, '')) - parseFloat(a.marketCapFormatted.replace(/[$,MB]/g, '')));
      }
    } catch (error) {
      console.warn("CoinGecko API failed, trying alternative sources:", error);
    }
  }

  // Fallback: Try to fetch from alternative sources
  try {
    const additionalTokens = await fetchAdditionalSuiTokens();
    if (additionalTokens.length > 0) {
      console.log(`Fetched ${additionalTokens.length} tokens from alternative sources`);
      return additionalTokens;
    }
  } catch (error) {
    console.error("Failed to fetch from alternative sources:", error);
  }

  // Final fallback to sample data
  console.warn("All token fetching methods failed, returning sample data");
  return sampleTokens;
}

// Function to fetch additional Sui tokens from alternative sources
async function fetchAdditionalSuiTokens(): Promise<Token[]> {
  const additionalTokens: Token[] = [];

  // Try SuiScan API for comprehensive token list
  try {
    const response = await fetch('https://api.suiscan.xyz/api/v1/coins', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'SuiHub/1.0'
      }
    });

    if (response.ok) {
      const data = await response.json();

      // Process SuiScan data - adapt based on actual API response structure
      if (data && Array.isArray(data)) {
        const suiscanTokens = data
          .filter((token: any) => token.price && token.price > 0) // Only tokens with price data
          .slice(0, 50) // Limit to top 50
          .map((token: any) => ({
            id: token.coinType || token.address || token.symbol?.toLowerCase() || `sui-${token.symbol}`,
            name: token.name || token.symbol,
            symbol: token.symbol?.toUpperCase(),
            price: token.price,
            changeHour: token.priceChange1h || 0,
            change24h: token.priceChange24h || 0,
            marketCapFormatted: token.marketCap >= 1_000_000_000
              ? `$${(token.marketCap / 1_000_000_000).toFixed(2)}B`
              : token.marketCap >= 1_000_000
              ? `$${(token.marketCap / 1_000_000).toFixed(2)}M`
              : `$${(token.marketCap / 1_000).toFixed(2)}K`,
            volumeFormatted: token.volume24h >= 1_000_000
              ? `$${(token.volume24h / 1_000_000).toFixed(2)}M`
              : token.volume24h >= 1_000
              ? `$${(token.volume24h / 1_000).toFixed(2)}K`
              : `$${token.volume24h?.toFixed(2) || '0'}`,
            isMostBought: false,
            image: token.logoUrl || token.iconUrl || "/placeholder.svg",
          }));

        additionalTokens.push(...suiscanTokens);
      }
    }
  } catch (error) {
    console.warn("SuiScan API failed:", error);
  }

  // Try CoinGecko's Sui ecosystem category
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=sui-ecosystem&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h${process.env.coingecko_api ? `&x_cg_demo_api_key=${process.env.coingecko_api}` : ''}`
    );

    if (response.ok) {
      const data = await response.json();

      const ecosystemTokens = data
        .filter((token: any) => !primarySuiTokens.includes(token.id)) // Avoid duplicates
        .slice(0, 50) // Limit to prevent overwhelming
        .map((token: any) => ({
          id: token.id,
          name: token.name,
          symbol: token.symbol.toUpperCase(),
          price: token.current_price,
          changeHour: token.price_change_percentage_1h_in_currency || 0,
          change24h: token.price_change_percentage_24h_in_currency || 0,
          marketCapFormatted: token.market_cap >= 1_000_000_000
            ? `$${(token.market_cap / 1_000_000_000).toFixed(2)}B`
            : token.market_cap >= 1_000_000
            ? `$${(token.market_cap / 1_000_000).toFixed(2)}M`
            : `$${(token.market_cap / 1_000).toFixed(2)}K`,
          volumeFormatted: token.total_volume >= 1_000_000
            ? `$${(token.total_volume / 1_000_000).toFixed(2)}M`
            : token.total_volume >= 1_000
            ? `$${(token.total_volume / 1_000).toFixed(2)}K`
            : `$${token.total_volume.toFixed(2)}`,
          isMostBought: false,
          image: token.image,
        }));

      additionalTokens.push(...ecosystemTokens);
    }
  } catch (error) {
    console.warn("CoinGecko ecosystem API failed:", error);
  }

  return additionalTokens;
}

export async function fetchSingleToken(tokenId: string): Promise<Token | null> {
  const apiKey = process.env.coingecko_api;

  if (!apiKey) {
    console.warn("CoinGecko API key not found, cannot fetch single token.");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenId}&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=1h%2C24h&x_cg_demo_api_key=${apiKey}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        const token = data[0];
        return {
          id: token.id,
          name: token.name,
          symbol: token.symbol.toUpperCase(),
          price: token.current_price,
          changeHour: token.price_change_percentage_1h_in_currency || 0,
          change24h: token.price_change_percentage_24h_in_currency || 0,
          marketCapFormatted: token.market_cap >= 1_000_000_000
            ? `$${(token.market_cap / 1_000_000_000).toFixed(2)}B`
            : token.market_cap >= 1_000_000
            ? `$${(token.market_cap / 1_000_000).toFixed(2)}M`
            : `$${(token.market_cap / 1_000).toFixed(2)}K`,
          volumeFormatted: token.total_volume >= 1_000_000
            ? `$${(token.total_volume / 1_000_000).toFixed(2)}M`
            : token.total_volume >= 1_000
            ? `$${(token.total_volume / 1_000).toFixed(2)}K`
            : `$${token.total_volume.toFixed(2)}`,
          isMostBought: false,
          image: token.image,
        };
      }
    }
  } catch (error) {
    console.warn(`Failed to fetch single token ${tokenId}:`, error);
  }

  return null;
}

export async function fetchSuiToken(): Promise<Token | null> {
  const apiKey = process.env.coingecko_api;

  if (!apiKey) {
    console.warn("CoinGecko API key not found, cannot fetch SUI token.");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=sui&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=1h%2C24h&x_cg_demo_api_key=${apiKey}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        const token = data[0];
        return {
          id: token.id,
          name: token.name,
          symbol: token.symbol.toUpperCase(),
          price: token.current_price,
          changeHour: token.price_change_percentage_1h_in_currency || 0,
          change24h: token.price_change_percentage_24h_in_currency || 0,
          marketCapFormatted: token.market_cap >= 1_000_000_000
            ? `$${(token.market_cap / 1_000_000_000).toFixed(2)}B`
            : token.market_cap >= 1_000_000
            ? `$${(token.market_cap / 1_000_000).toFixed(2)}M`
            : `$${(token.market_cap / 1_000).toFixed(2)}K`,
          volumeFormatted: token.total_volume >= 1_000_000
            ? `$${(token.total_volume / 1_000_000).toFixed(2)}M`
            : token.total_volume >= 1_000
            ? `$${(token.total_volume / 1_000).toFixed(2)}K`
            : `$${token.total_volume.toFixed(2)}`,
          isMostBought: false,
          image: token.image,
        };
      }
    }
  } catch (error) {
    console.warn("Failed to fetch SUI token:", error);
  }

  return null;
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
