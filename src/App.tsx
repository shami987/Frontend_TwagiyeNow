import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './theme/ThemeContext';
import './i18n'; // Import i18n configuration
import '../global.css';
import MainNavigator from './navigation/MainNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
