/****
 * @author Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester Daniel Moreno
 ***/

import React from 'react';
import { StyleSheet, useWindowDimensions, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  interpolate,
  Extrapolation,
  interpolateColor,
  useAnimatedStyle,
  SharedValue
} from 'react-native-reanimated';

type ScalingDotProps = {
  data: Array<Object>;
  scrollX: SharedValue<number>;
  dotStyle?: ViewStyle;
  inActiveDotOpacity?: number;
  inActiveDotColor?: string;
  activeDotScale?: number;
  activeDotColor?: string;
  style?: StyleProp<ViewStyle>;
};

type Props = Omit<ScalingDotProps, 'data' | 'containerStyle'> & {
  index: number;
};

const ScalingDot = ({
  scrollX,
  index,
  dotStyle,
  inActiveDotOpacity,
  inActiveDotColor,
  activeDotScale,
  activeDotColor,
}: Props) => {
  const dp = {
    inActiveDotColor: inActiveDotColor || '#347af0',
    activeDotColor: activeDotColor || '#347af0',
    animationType: 'scale',
    inActiveDotOpacity: inActiveDotOpacity || 0.5,
    activeDotScale: activeDotScale || 1.4,
  };
  const { width } = useWindowDimensions();
  const inputRange = [
    (index - 1) * width, 
    index * width, 
    (index + 1) * width
  ];
  const opacityOutputRange = [dp.inActiveDotOpacity, 1, dp.inActiveDotOpacity];
  const scaleOutputRange = [1, dp.activeDotScale, 1];
  const colorOutputRange = [
    dp.inActiveDotColor,
    dp.activeDotColor,
    dp.inActiveDotColor,
  ];
  const extrapolation = {
    extrapolateRight: Extrapolation.CLAMP,
    extrapolateLeft: Extrapolation.CLAMP,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      inputRange,
      opacityOutputRange,
      extrapolation,
    ),
    backgroundColor: interpolateColor(
      scrollX.value,
      inputRange,
      colorOutputRange,
    ),
    transform: [
      {
        scale: interpolate(
          scrollX.value,
          inputRange,
          scaleOutputRange,
          extrapolation,
        ),
      },
    ],
  }));

  return (
    <Animated.View
      key={`dot-${index}`}
      style={[styles.dotStyle, dotStyle, animatedStyle]}
    />
  );
};

const styles = StyleSheet.create({
  dotStyle: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default ScalingDot;