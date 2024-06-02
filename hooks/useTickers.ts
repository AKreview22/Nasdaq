import { TickersParams, axiosInstance, getTickers } from '@/api';
import { Ticker } from '@/types/Ticker';
import { useEffect, useState } from 'react';

interface UseTickersProps {
  tickers: Ticker[];
  setTickers: (tickers: Ticker[]) => void;
  addTickers: (newTickers: Ticker[]) => void;
  status: 'idle' | 'loading' | 'failed';
  setStatus: (status: 'idle' | 'loading' | 'failed') => void;
}

// Custom hook to fetch and manage tickers data
export const useTickers = ({
  tickers,
  setTickers,
  addTickers,
  status,
  setStatus,
}: UseTickersProps, initialParams: TickersParams = {}) => {
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Error handling function
  const handleError = (err: unknown, defaultMessage: string): void => {
    const errorMessage = err instanceof Error && err.message ? err.message : defaultMessage;
    setErrorMessage(errorMessage);
    setStatus('failed');
  };

  // Function to fetch tickers based on provided parameters
  const fetchTickers = async (params: TickersParams = {}) => {
    setStatus('loading');
    setErrorMessage(null);
    try {
      const data = await getTickers(params);
      setTickers(data.results || []);
      setNextUrl(data.next_url || null);
      setStatus('idle');
    } catch (err) {
      handleError(err, 'Error fetching tickers');
    }
  };

  // Function to fetch the next page of tickers
  const fetchNextPage = async () => {
    if (!nextUrl) return;
    setStatus('loading');
    setErrorMessage(null);
    try {
      const response = await axiosInstance.get(nextUrl);
      const data = response.data;
      addTickers(data.results);
      setNextUrl(data.next_url || null);
      setStatus('idle');
    } catch (err) {
      handleError(err, 'Error fetching next page');
    }
  };

  // Fetch tickers when component mounts
  useEffect(() => {
    fetchTickers(initialParams);
  }, []); 

  return { tickers, status, errorMessage, fetchTickers, fetchNextPage };
};
