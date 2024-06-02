import React, { useRef } from 'react';
import { FlatList, View, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import StockItem from '@/components/StockItem';
import { Ticker } from '@/types/Ticker';

interface TickerGridProps {
  data: Ticker[];
  onEndReached: () => void;
  isSearching?: boolean;
}

const TickerGrid: React.FC<TickerGridProps> = ({ data, onEndReached, isSearching = false }) => {
  const flatListRef = useRef<FlatList<Ticker>>(null);

  const renderItem = ({ item }: { item: Ticker }) => (
    <StockItem stock={item} />
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <ThemedText style={styles.emptyText}>
        {isSearching ? 'No results found.' : 'No tickers available.'}
      </ThemedText>
    </View>
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 2000) {
      onEndReached();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.ticker}-${index}`}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TickerGrid;
