import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { color } from './src/theme/tokens';
import { BookingProvider } from './src/state/BookingContext';
import { BookingConfirmationScreen } from './src/screens/BookingConfirmationScreen';
import { EntrySearchScreen } from './src/screens/EntrySearchScreen';
import { HotelDetailScreen } from './src/screens/HotelDetailScreen';
import { PriceComparisonScreen } from './src/screens/PriceComparisonScreen';
import { ResultsListScreen } from './src/screens/ResultsListScreen';
import { WebviewCheckoutScreen } from './src/screens/WebviewCheckoutScreen';

export type RootStackParamList = {
  EntrySearch: undefined;
  Results: undefined;
  HotelDetail: undefined;
  PriceComparison: undefined;
  Checkout: undefined;
  Confirmation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // Static instances of Google Sans Flex, one per weight in the type scale.
  const [fontsLoaded] = useFonts({
    'GoogleSansFlex-Regular': require('./assets/fonts/GoogleSansFlex-Regular.ttf'),
    'GoogleSansFlex-Medium': require('./assets/fonts/GoogleSansFlex-Medium.ttf'),
    'GoogleSansFlex-SemiBold': require('./assets/fonts/GoogleSansFlex-SemiBold.ttf'),
    'GoogleSansFlex-Bold': require('./assets/fonts/GoogleSansFlex-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: color.page }} />;
  }

  return (
    <SafeAreaProvider>
      <BookingProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.page } }}
          >
            <Stack.Screen name="EntrySearch" component={EntrySearchScreen} />
            <Stack.Screen name="Results" component={ResultsListScreen} />
            <Stack.Screen name="HotelDetail" component={HotelDetailScreen} />
            <Stack.Screen name="PriceComparison" component={PriceComparisonScreen} />
            <Stack.Screen name="Checkout" component={WebviewCheckoutScreen} />
            <Stack.Screen
              name="Confirmation"
              component={BookingConfirmationScreen}
              options={{ animation: 'fade' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BookingProvider>
    </SafeAreaProvider>
  );
}
