import {
  StyleSheet,
  View,
  Dimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import React, { useMemo } from 'react';
import HalfCircleGradient from './HalfCircleGradient';
import HalfCircleProgress from './HalfCircleProgress';
import { validatesGaugeSize } from '../utils/validatesGaugeSize';

type Props = {
  gradient?: Array<string>;
  size: number;
  thickness?: number;
  gradientThickness?: number;
  filledColor?: string;
  unfilledColor?: string;
  min: number;
  max: number;
  value: number;
  showText?: boolean;
  textValue?: string;
  textColor?: string;
  textStyle?: StyleProp<ViewStyle>;
};
const { width } = Dimensions.get('window');

const GaugeGradient = ({
  gradient = ['#00ff6b', '#14eb6e', '#f2cf1f', '#f4ab44', '#ff5400', '#ff2900'],
  size,
  thickness = 30,
  gradientThickness = 10,
  unfilledColor,
  min = 0,
  max = 100,
  value = 10,
  textValue,
  showText,
  textColor,
  textStyle,
}: Props) => {
  const currentSize = validatesGaugeSize(size, width - 20);

  const progress = (value - min) / (max - min);
  const progressColor = useMemo(() => {
    if (progress <= 0) {
      return gradient[0];
    }
    if (progress >= 1) {
      return gradient[gradient.length - 1];
    }
    const segment = 1 / (gradient.length - 1);
    const segmentIndex = Math.round(progress / segment);
    return gradient[segmentIndex];
  }, [gradient, progress]);

  return (
    <View style={styles.container}>
      <HalfCircleGradient
        textColor={textColor || progressColor}
        size={currentSize}
        gradientThickness={gradientThickness}
        gradient={gradient}
        text={textValue || value}
        showText={showText}
        textStyle={textStyle}
      />
      <View
        style={[
          styles.halfCircleProgress,
          { bottom: -(currentSize - gradientThickness * 2) / 4 - 1 },
        ]}
      >
        <HalfCircleProgress
          size={currentSize - gradientThickness * 2}
          progress={progress}
          thickness={thickness}
          filledColor={progressColor}
          unfilledColor={unfilledColor}
          style={{ transform: [{ rotate: '-90deg' }] }}
          fill={'transparent'}
        />
      </View>
    </View>
  );
};

export default GaugeGradient;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfCircleProgress: {
    position: 'absolute',
  },
});
