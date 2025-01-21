import {StyleSheet, ImageBackground, StatusBar} from 'react-native';
import React, {FC, useEffect} from 'react';
import {commonStyles} from '../styles/commonStyles';
import {screenWidth} from '../utils/Constants';
import {useIsFocused} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
const HomeScreen: FC = () => {
  // it is used to check if the screen is focused or not, in simple words, if the screen is visible or not
  const isFocused = useIsFocused();
  const translateY = useSharedValue(-200);

  useEffect(() => {
    translateY.value = withTiming(0, {duration: 3000});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const animationStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
    <ImageBackground
      source={require('../assets/images/bgBlurCandies.png')}
      style={commonStyles.simpleContainer}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#e44b8d'} />
      <Animated.Image
        source={require('../assets/images/banner.png')}
        style={[styles.img, animationStyle]}
      />
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  img: {
    width: screenWidth,
    height: screenWidth * 0.8,
    position: 'absolute',
    resizeMode: 'contain',
    // backgroundColor:'red',
    // top: -350,
    top: -20,
  },
});
