import { useState } from "react";
import { searchTicker, SearchTickerParams } from "@/api";
import { Ticker } from "@/types/Ticker";

interface UseTickerSearchProps {
  searchResults: Ticker[];
  setSearchResults: (searchResults: Ticker[]) => void;
  status: "idle" | "loading" | "failed";
  setStatus: (status: "idle" | "loading" | "failed") => void;
}

// Custom hook to search and view ticker details
export const useTickerSearch = ({
  searchResults,
  setSearchResults,
  status,
  setStatus,
}: UseTickerSearchProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Error handling function
  const handleError = (err: unknown, defaultMessage: string): void => {
    const errorMessage =
      err instanceof Error && err.message ? err.message : defaultMessage;
    setErrorMessage(errorMessage);
    setStatus("failed");
  };

  // Function to search tickers based on provided parameters
  const searchTickers = async (params: SearchTickerParams) => {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const results = await searchTicker(params);
      setSearchResults(results);
      setStatus("idle");
    } catch (err) {
      handleError(err, "Error searching tickers");
    }
  };

  return { searchResults, status, errorMessage, searchTickers };
};
