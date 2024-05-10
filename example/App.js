import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import GaugeGradient from '../src/components/GaugeGradient';
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GaugeGradient
        size={200}
        min={0}
        max={100}
        value={70}
        showText
        textValue="70%"
      />
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
