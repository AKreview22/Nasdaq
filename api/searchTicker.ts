import { Ticker } from "@/types/Ticker";
import { TickersParams, getTickers } from "./tickers";

export interface SearchTickerParams {
  query: string;
  [key: string]: any;
}

export const searchTicker = async (searchParams: SearchTickerParams): Promise<Ticker[]> => {
  try {
    const tickersParams: TickersParams = {
      search: searchParams.query,
      ...searchParams, 
    };

    const tickerData = await getTickers(tickersParams);


    return tickerData.results;
  } catch (error) {
    console.error('Error searching tickers:', error);
    throw error;
  }
};
