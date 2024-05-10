import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import GaugeGradient from '../src/components/GaugeGradient';
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GaugeGradient size={150} min={50} max={100} value={74} showText />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
