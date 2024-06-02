import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Image } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

const HeaderImage = ({ colorScheme }: any) => {
  const imageSource =
    colorScheme === "dark"
      ? require("@/assets/images/nasdaq-white.png")
      : require("@/assets/images/nasdaq-black.png");

  return (
    <Image
      source={imageSource}
      style={{ width: 100, height: 40 }}
      resizeMode="contain"
    />
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: () => <HeaderImage colorScheme={colorScheme} />,
            headerStyle: {
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.header
                  : Colors.light.header,
            },
          }}
        />
        <Stack.Screen
          name="[tickerDetails]"
          options={{
            presentation: "modal",
            headerShown: true,
            headerTitle: () => <HeaderImage colorScheme={colorScheme} />,
            headerStyle: {
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.header
                  : Colors.light.header,
            },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
