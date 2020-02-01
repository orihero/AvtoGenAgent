import React from 'react';
import {StyleSheet, StatusBar, Platform, UIManager} from 'react-native';
import AppRouter from './src/routes/AppRouter';
import {SafeAreaProvider} from 'react-native-safe-area-view';
import {Provider} from 'react-redux';
import configureStore from './src/redux/configureStore';
import {configureAxios} from './src/api/requests';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  StatusBar.setBarStyle('dark-content');

  let store = configureStore();
  configureAxios(store);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
