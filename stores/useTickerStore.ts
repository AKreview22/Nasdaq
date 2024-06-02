import { Ticker } from '@/types/Ticker';
import { create } from 'zustand';

interface StoreState {
  tickers: Ticker[];
  setTickers: (tickers: Ticker[]) => void;
  addTickers: (newTickers: Ticker[]) => void;
  status: 'idle' | 'loading' | 'failed';
  setStatus: (status: 'idle' | 'loading' | 'failed') => void;
}

const useTickerStore = create<StoreState>((set) => ({
  tickers: [],
  status: 'idle',
  setTickers: (tickers) => set({ tickers }),
  addTickers: (newTickers) => set((state) => ({ tickers: [...state.tickers, ...newTickers] })),
  setStatus: (status) => set({ status }),
}));

export default useTickerStore;
