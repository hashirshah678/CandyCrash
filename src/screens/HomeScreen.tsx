/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, ImageBackground, StatusBar, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import {commonStyles} from '../styles/commonStyles';
import {screenHeight, screenWidth} from '../utils/Constants';
import {useIsFocused} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useSound} from '../navigation/SoundContext';
import LottieView from 'lottie-react-native';
import PressScale from '../components/ui/PressScale';
import {navigate} from '../utils/NavigationUtil';
import Footer from '../components/ui/Footer';
const HomeScreen: FC = () => {
  // it is used to check if the screen is focused or not, in simple words, if the screen is visible or not
  const {playSound} = useSound();
  const isFocused = useIsFocused();
  const translateY = useSharedValue(-200);
  const translateXBird = useSharedValue(-100);

  useEffect(() => {
    if (isFocused) {
      playSound('bg', true);
    }
  }, [isFocused]);

  useEffect(() => {
    translateY.value = withTiming(0, {duration: 3000});
  }, [isFocused]);

  useEffect(() => {
    translateXBird.value = withTiming(-0, {duration: 2000});
  }, [isFocused]);

  const animationStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const animationStyleBird = useAnimatedStyle(() => ({
    transform: [{translateX: translateXBird.value}],
  }));

  return (
    <ImageBackground
      source={require('../assets/images/bgBlurCandies.png')}
      style={commonStyles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#e44b8d'} />
      <Animated.Image
        source={require('../assets/images/banner.png')}
        style={[styles.img, animationStyle]}
      />

      <Animated.View style={[styles.birdView, animationStyleBird]}>
        <LottieView
          source={require('../assets/animations/bird.json')}
          hardwareAccelerationAndroid
          cacheComposition
          speed={1}
          style={[styles.lottieView]}
          autoPlay
          loop
        />
      </Animated.View>

      <PressScale
        style={styles.playContainer}
        onPress={() => {
          navigate('Level');
        }}>
        <Image
          source={require('../assets/icons/play.png')}
          style={styles.playButton}
        />
      </PressScale>

      <Footer />
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
  birdView: {
    width: 200,
    height: 200,
    position: 'absolute',
    left: -20,
    top: '30%',
  },
  lottieView: {
    width: '100%',
    height: '100%',
    transform: [{rotateY: '180deg'}],
  },
  playButton: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.2,
    resizeMode: 'contain',
    // alignSelf: 'center',
  },
  playContainer: {
    marginTop: screenHeight * 0.4,
  },
});
