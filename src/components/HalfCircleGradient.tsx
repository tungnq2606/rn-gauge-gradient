import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import React from 'react';
import { calculateDegree } from '../utils/calculateDegree';

const { width } = Dimensions.get('window');
const DEGREE = 180;

type Props = {
  gradient?: string[];
  size: number;
  gradientThickness?: number;
  wrapperStyle?: ViewStyle;
  outerCircleStyle?: ViewStyle;
  halfCircleStyle?: ViewStyle;
  innerCircleStyle?: ViewStyle;
  showText?: boolean;
  text: string | number;
  textColor?: string;
  textStyle?: TextStyle;
  min?: number;
  max?: number;
  unit?: string;
  showMinMax?: boolean;
  minMaxStyle?: TextStyle;
};

const HalfCircleGradient = ({
  gradient,
  size,
  gradientThickness = 10,
  wrapperStyle,
  outerCircleStyle,
  halfCircleStyle,
  innerCircleStyle,
  showText,
  text,
  textColor,
  textStyle,
  max = 100,
  min = 0,
  unit,
  showMinMax,
  minMaxStyle,
}: Props) => {
  const perLevelDegree = calculateDegree(DEGREE, gradient || []);

  const defaultFontSize = size / 8;
  return (
    <View
      style={[
        styles.wrapper,
        {
          width: size,
          height: size / 2,
        },
        wrapperStyle,
      ]}
    >
      <View
        style={[
          styles.outerCircle,
          {
            width: size,
            height: size / 2,
            borderTopLeftRadius: size / 2,
            borderTopRightRadius: size / 2,
          },
          outerCircleStyle,
        ]}
      >
        {gradient &&
          gradient.map((level, index) => {
            const circleDegree = 90 + index * perLevelDegree;
            return (
              <View
                key={index}
                style={[
                  styles.halfCircle,
                  {
                    backgroundColor: level,
                    width: size / 2,
                    height: size,
                    borderRadius: size / 2,
                    transform: [
                      { translateX: size / 4 },
                      { rotate: `${circleDegree}deg` },
                      { translateX: (size / 4) * -1 },
                    ],
                  },
                  halfCircleStyle,
                ]}
              />
            );
          })}
        <View
          style={[
            styles.innerCircle,
            {
              width: size - gradientThickness * 2 + 1,
              height: (size - gradientThickness * 2) / 2 - 1,
              borderTopLeftRadius: size / 2,
              borderTopRightRadius: size / 2,
            },
            innerCircleStyle,
          ]}
        >
          <View
            style={[
              styles.innerCircle,
              {
                width: size - 30 * 2 + 1,
                height: (size - 30 * 2) / 2 - 1,
                borderTopLeftRadius: size / 2,
                borderTopRightRadius: size / 2,
              },
              innerCircleStyle,
            ]}
          >
            {showText && (
              <Text
                style={[
                  styles.text,
                  { color: textColor, fontSize: defaultFontSize },
                  textStyle,
                ]}
              >
                {text}
              </Text>
            )}
            <View style={styles.whiteLine} />
          </View>
        </View>
      </View>
      {showMinMax && (
        <View style={styles.minMaxContainer}>
          <Text
            style={[styles.minMax, styles.padLeft, minMaxStyle]}
          >{`${unit ? min + '' + unit : min}`}</Text>
          <Text
            style={[styles.minMax, styles.padLeft, minMaxStyle]}
          >{`${unit ? max + '' + unit : max}`}</Text>
        </View>
      )}
    </View>
  );
};

export default HalfCircleGradient;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
  },
  outerCircle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    borderColor: '#ffffff',
    backgroundColor: '#e6e6e6',
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  innerCircle: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: width * 0.6,
    height: (width / 2) * 0.6,
    borderTopLeftRadius: width / 2 - 10,
    borderTopRightRadius: width / 2 - 10,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  whiteLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#ffffff',
  },
  minMaxContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  minMax: { color: 'black', fontSize: 16 },
  padLeft: { paddingLeft: 4 },
  padRight: { paddingRight: 4 },
});
