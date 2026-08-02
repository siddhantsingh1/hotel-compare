import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
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
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_600SemiBold,
    Roboto_700Bold,
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
