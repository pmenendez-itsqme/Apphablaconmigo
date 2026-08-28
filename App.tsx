import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FraseProvider } from './src/context/FraseContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <FraseProvider>
        <NavigationContainer>
          {/* Texto claro porque la cabecera es de color oscuro. */}
          <StatusBar style="light" />
          <AppNavigator />
        </NavigationContainer>
      </FraseProvider>
    </SafeAreaProvider>
  );
}