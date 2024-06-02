import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Animated,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedContainer } from "./ThemedContainer";
import { ThemedView } from "./ThemedView";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState("");
  const [showArrow, setShowArrow] = useState(false);
  const arrowScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(arrowScale, {
      toValue: showArrow ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showArrow, arrowScale]);

  const handleSearchSubmit = () => {
    setSearchQuery(localQuery);
    setShowArrow(true);
    Keyboard.dismiss();
  };

  const handleClearQuery = () => {
    setLocalQuery("");
    setSearchQuery("");
    setShowArrow(false);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchInputWrapper}>
        <ThemedContainer style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for stocks"
            placeholderTextColor="#888"
            value={localQuery}
            onChangeText={setLocalQuery}
            returnKeyType="search"
            onSubmitEditing={localQuery ? handleSearchSubmit : undefined}
          />
        </ThemedContainer>
      </View>
      {showArrow && (
        <Animated.View style={{ transform: [{ scale: arrowScale }] }}>
          <ThemedContainer style={styles.arrowContainer}>
            <TouchableOpacity
              onPress={handleClearQuery}
              testID="arrow-back-button"
            >
              <Ionicons name="arrow-back" size={20} color="#888" />
            </TouchableOpacity>
          </ThemedContainer>
        </Animated.View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 5,
  },
  searchInputWrapper: {
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: 5,
    height: 40,
  },
  arrowContainer: {
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  searchIcon: {
    marginHorizontal: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#777",
  },
});

export default SearchBar;
