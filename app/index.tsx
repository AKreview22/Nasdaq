import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useTickers } from "@/hooks/useTickers";
import { useTickerSearch } from "@/hooks/useTickerSearch";
import useTickerStore from "@/stores/useTickerStore";
import useSearchStore from "@/stores/useSearchStore";
import SearchBar from "@/components/SearchBar";
import Toast, { BaseToast } from "react-native-toast-message";
import TickerGrid from "@/components/TickerGrid";
import { Ticker } from "@/types/Ticker";

const StocksView: React.FC = () => {
  const {
    tickers,
    setTickers,
    addTickers,
    status: tickerStatus,
    setStatus: setTickerStatus,
  } = useTickerStore();

  const {
    searchResults,
    setSearchResults,
    status: searchStatus,
    setStatus: setSearchStatus,
  } = useSearchStore();

  const {
    fetchTickers,
    fetchNextPage,
    errorMessage: tickerError,
  } = useTickers({
    tickers,
    setTickers,
    addTickers,
    status: tickerStatus,
    setStatus: setTickerStatus,
  });

  const { searchTickers, errorMessage: searchError } = useTickerSearch({
    searchResults,
    setSearchResults,
    status: searchStatus,
    setStatus: setSearchStatus,
  });

  const [displayedTickers, setDisplayedTickers] = useState<Ticker[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      setDisplayedTickers(tickers);
    }
  }, [tickers, isSearching]);

  useEffect(() => {
    if (isSearching) {
      setDisplayedTickers(searchResults);
    }
  }, [searchResults, isSearching]);

  useEffect(() => {
    if (tickerError) {
      Toast.show({
        type: "error",
        text1: "Error fetching tickers",
        text2: tickerError,
        position: "bottom",
        visibilityTime: 5000,
      });
    }

    if (searchError) {
      Toast.show({
        type: "error",
        text1: "Error searching tickers",
        text2: searchError,
        position: "bottom",
        visibilityTime: 5000,
      });
    }
  }, [tickerError, searchError]);

  const handleSearchQuery = (query: string) => {
    if (query) {
      setIsSearching(true);
      searchTickers({ query });
    } else {
      setIsSearching(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SearchBar setSearchQuery={handleSearchQuery} />
      <TickerGrid
        data={displayedTickers}
        onEndReached={() => {
          if (
            (!isSearching && tickerStatus !== "loading") ||
            (isSearching && searchStatus !== "loading")
          ) {
            fetchNextPage();
          }
        }}
        isSearching={isSearching}
      />
      <Toast config={toastConfig} />
    </ThemedView>
  );
};

const toastConfig = {
  error: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toastStyle, styles.toastError]}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  toastStyle: {
    borderRadius: 20,
    marginHorizontal: 20,
  },
  toastError: {
    backgroundColor: "#FF6347",
    borderLeftColor: "#FF4500",
    borderLeftWidth: 5,
  },
  toastText1: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  toastText2: {
    fontSize: 13,
    color: "#FFFFFF",
  },
});

export default StocksView;
