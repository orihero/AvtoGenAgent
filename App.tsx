import React from 'react';
import {StyleSheet, StatusBar, Platform, UIManager} from 'react-native';
import AppRouter from './src/routes/AppRouter';
import {SafeAreaProvider} from 'react-native-safe-area-view';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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
