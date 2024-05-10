import { StyleSheet, View, Dimensions } from 'react-native';
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
};
const { width } = Dimensions.get('window');

const GaugeGradient = ({
  gradient = ['#ff2900', '#ff5400', '#f4ab44', '#f2cf1f', '#14eb6e', '#00ff6b'],
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
    <>
      <HalfCircleGradient
        textColor={textColor || progressColor}
        size={currentSize}
        gradientThickness={gradientThickness}
        gradient={gradient}
        text={textValue || value}
        showText={showText}
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
    </>
  );
};

export default GaugeGradient;

const styles = StyleSheet.create({
  halfCircleProgress: {
    position: 'absolute',
  },
});
