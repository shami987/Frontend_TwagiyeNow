import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './theme/ThemeContext';
import './i18n'; // Import i18n configuration
import '../global.css';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
