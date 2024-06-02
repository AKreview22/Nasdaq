import React, { useRef } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import StockItem from "@/components/StockItem";
import { Ticker } from "@/types/Ticker";

const { width } = Dimensions.get("window");

interface TickerGridProps {
  data: Ticker[];
  onEndReached: () => void;
  isSearching?: boolean;
}

const TickerGrid: React.FC<TickerGridProps> = ({
  data,
  onEndReached,
  isSearching = false,
}) => {
  const flatListRef = useRef<FlatList<Ticker>>(null);

  const numColumns = Math.floor(width / 160);

  const renderItem = ({ item }: { item: Ticker }) => <StockItem stock={item} />;

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <ThemedText style={styles.emptyText}>
        {isSearching ? "No results found." : "No tickers available."}
      </ThemedText>
    </View>
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    if (
      contentOffset.y + layoutMeasurement.height >=
      contentSize.height - 2000
    ) {
      onEndReached();
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.ticker}-${index}`}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      onScroll={handleScroll}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default TickerGrid;
