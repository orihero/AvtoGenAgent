import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import AppRouter from './src/routes/AppRouter';
import {SafeAreaProvider} from 'react-native-safe-area-view';

const App = () => {
  StatusBar.setBarStyle('dark-content');
  return (
    <SafeAreaProvider>
      <AppRouter />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
