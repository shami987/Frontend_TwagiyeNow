import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './theme/ThemeContext';
import './i18n'; // Import i18n configuration
import '../global.css';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  useEffect(() => {
    // Global Error Handler for unhandled JS errors
    const defaultErrorHandler = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler((error, isFatal) => {
      // Log error to terminal
      console.error('--- GLOBAL JS ERROR ---');
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
      console.error('Is Fatal:', isFatal);
      console.error('------------------------');
      
      // Still call the original handler to show the RedBox/YellowBox in dev
      if (defaultErrorHandler) {
        defaultErrorHandler(error, isFatal);
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
