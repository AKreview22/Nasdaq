import { Ticker } from "@/types/Ticker";
import { create } from "zustand";

interface SearchStoreState {
  searchResults: Ticker[];
  setSearchResults: (searchResults: Ticker[]) => void;
  status: "idle" | "loading" | "failed";
  setStatus: (status: "idle" | "loading" | "failed") => void;
}

const useSearchStore = create<SearchStoreState>((set) => ({
  searchResults: [],
  status: "idle",
  setSearchResults: (searchResults) => set({ searchResults }),
  setStatus: (status) => set({ status }),
}));

export default useSearchStore;
