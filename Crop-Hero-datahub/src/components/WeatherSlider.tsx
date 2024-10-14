/****
 * @author Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester 
 ***/

import React from 'react';
import PagerView from 'react-native-pager-view';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  Dimensions,
  Image,
} from 'react-native';
import Animated, {
  interpolate,
  Extrapolation,
  useSharedValue,
  useDerivedValue,
} from 'react-native-reanimated';
import PagingDots from './PagingDots';
import usePagerScrollHandler from './usePagerScrollHandler';
import Colors from '../../assets/Color';
import icons from '../../assets/icons/Icons';
import { Col, Row } from '../../assets/Grid';
const { width } = Dimensions.get('window')

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const INTRO_DATA = [
  {
    key: '1',
    image: icons.thermometer_santa_gray,
    line1Label: 'Temperature',
    line1: '70°F',
    line2Label: 'Feels Like',
    line2: '80°F',
  },
  {
    key: '2',
    image: icons.rainfall_black,
    line1Label: 'Wind Speed',
    line1: '10mph',
    line2Label: 'Rainfall',
    line2: ' 50%',
  },
  {
    key: '3',
    image: icons.humidity_santa_gray,
    line1Label: 'Humidity',
    line1: '50%',
    line2Label: 'Soil Moisture',
    line2: ' 0.2wfv',
  }
];

export const WeatherSlider = ({isDarkMode=false, intro_data=INTRO_DATA}) => {
  const { width } = useWindowDimensions();
  const ref = React.useRef<PagerView>(null);
  const positionSharedValue = useSharedValue(0);
  const scrollOffsetSharedValue = useSharedValue(0);

  const scrollX = useDerivedValue(() => {
    const interpolatedValue = interpolate(
      positionSharedValue.value + scrollOffsetSharedValue.value,
      [0, intro_data.length],
      [0, intro_data.length * width],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return interpolatedValue;
  });

  const handler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      'worklet';
      positionSharedValue.value = e.position;
      scrollOffsetSharedValue.value = e.offset;
    },
  });

  return (
    <SafeAreaView style={[styles.flex, isDarkMode && styles.flexDark]}>
      <AnimatedPagerView
        initialPage={0}
        ref={ref}
        style={styles.PagerView}
        onPageScroll={handler}
      >
        {intro_data.map(( item, key ) => (
          <View
            key={key}
          >
            <Row height={80} >
              <Col relativeColsCovered={3} alignItems='flex-end'>
              <Image 
                style={{width: 32,}}
                source={item.image}
              />
              </Col>
              <Col relativeColsCovered={6} alignItems='center'>
                <Text style={isDarkMode ? {color:Colors.WHITE_SMOKE} : {color:Colors.ALMOST_BLACK}}>{item.line1Label}: {item.line1}</Text>
                <Text style={isDarkMode ? {color:Colors.WHITE_SMOKE} : {color:Colors.ALMOST_BLACK}}>{item.line2Label}: {item.line2}</Text>
              </Col>
              <Col relativeColsCovered={3} alignItems='flex-start'>
              </Col>
            </Row>
          </View>
        ))}
      </AnimatedPagerView>
      <View style={styles.dotsContainer}>
        <View style={styles.dotContainer}>
          <PagingDots
            data={intro_data}
            scrollX={scrollX}
            style={{
              top: 30,
            }}
            activeDotColor = {Colors.MALACHITE}
            inActiveDotColor = {Colors.IRISH_GREEN}
            inActiveDotOpacity={0.8}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: width * 0.8,
    backgroundColor: Colors.ALMOND_TAN,
    borderRadius: 12,
  },
  flexDark: {
    backgroundColor: Colors.IRIDIUM,
  },
  PagerView: {
    flex: 1,
  },
  center: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row',
    flex: 1,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  text: {
    fontSize: 30,
    color: 'black'
  },
  dotsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: -75,
  },
  dotContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
