import { Animated, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { Svg } from 'react-native-svg';
// @ts-ignore
import Arc from './shapes/Arc';
import withAnimation from '../withAnimation';

export type HalfCircleProgressProps = {
  fill: string;
  progress: number;
  size: number;
  style?: any;
  thickness: number;
  filledColor?: string;
  unfilledColor?: string;
};

const CIRCLE = Math.PI * 2;
const UNFILLED_END_ANGLE = 0.5;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedArc = Animated.createAnimatedComponent(Arc);

const HalfCircleProgress = ({
  fill,
  progress,
  size,
  style,
  thickness,
  filledColor = 'blue',
  unfilledColor = 'gray',
}: HalfCircleProgressProps) => {
  const rotation = new Animated.Value(0);
  const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
      borderTopRightRadius: size / 2,
      borderBottomRightRadius: size / 2,
    },
  });

  const radius = size / 2 - 1;
  const offset = {
    top: 1,
    left: -size / 2,
  };

  const angle = useMemo(() => {
    return Animated.multiply(
      Animated.multiply(progress, CIRCLE),
      UNFILLED_END_ANGLE
    );
  }, [progress]);

  const endUnfilledAngleValue = useMemo(() => {
    return Animated.multiply(UNFILLED_END_ANGLE, CIRCLE);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <AnimatedSvg
        width={size / 2}
        height={size}
        style={{
          transform: [
            {
              rotate: rotation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      >
        <AnimatedArc
          fill={fill}
          radius={radius}
          offset={offset}
          startAngle={angle}
          endAngle={endUnfilledAngleValue}
          stroke={unfilledColor}
          strokeWidth={thickness}
        />
        <AnimatedArc
          fill={fill}
          radius={radius}
          offset={offset}
          startAngle={0}
          endAngle={angle}
          stroke={filledColor}
          strokeWidth={thickness}
        />
      </AnimatedSvg>
    </View>
  );
};

export default withAnimation(HalfCircleProgress);
