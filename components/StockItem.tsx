import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { useLinkProps } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ticker } from '@/types/Ticker';
import { ThemedContainer } from './ThemedContainer';

// Define the props for the StockItem component
interface StockItemProps {
  stock: Ticker;
}

const extractDomainFromName = (name: any): string => {
  const nameString = String(name); 
  
  const normalizedCompanyName = nameString.split(' ')[0]
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[\W_]/g, '');

  return `${normalizedCompanyName}.com`;
}



// Functional component to display stock information
const StockItem: React.FC<StockItemProps> = ({ stock }) => {
  const [imageError, setImageError] = useState(false);

  // Generate navigation link properties
  const { onPress } = useLinkProps({ to: `/${stock.ticker}` });

  // Extract domain from the stock name
  const domain = extractDomainFromName(stock.name!);

  const logoSize = 60; 
  const logoFormat = 'jpg';

  const logoUrl = `https://logo.clearbit.com/${domain}?size=${logoSize}&format=${logoFormat}`;

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedContainer style={styles.container}>
        {!imageError ? (
          <Image 
            source={{ uri: logoUrl }} 
            style={styles.logo} 
            onError={() => setImageError(true)} 
          />
        ) : (
          <ThemedView style={styles.placeholderLogo}>
            <ThemedText style={styles.placeholderText}>{stock.ticker?.substring(0, 2)}</ThemedText>
          </ThemedView>
        )}
        <ThemedContainer style={styles.info}>
          <ThemedText style={styles.ticker} type="defaultSemiBold">{stock.ticker}</ThemedText>
          <ThemedText style={styles.name} numberOfLines={1} ellipsizeMode="tail" type="default">{stock.name}</ThemedText>
        </ThemedContainer>
      </ThemedContainer>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 25,
    alignItems: 'center',
    height: 180,
    maxWidth: 160,
    width: 'auto',
    justifyContent: 'center',
    flexDirection: 'column',
    flexShrink: 1,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  placeholderLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  ticker: {
    fontSize: 18,
  },
  name: {
    fontSize: 14,
    textAlign: 'center',
    width: 140,
  },
});

// Memoize the component to prevent unnecessary re-renders
export default React.memo(StockItem);
