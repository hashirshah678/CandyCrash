/* eslint-disable react-hooks/exhaustive-deps */
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Animated,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import GameHeader from '../components/gameScreen/GameHeader';
import {useRoute} from '@react-navigation/native';
// import {useSound} from '../navigation/SoundContext';
import GameFooter from '../components/gameScreen/GameFooter';
import GameTitle from '../components/gameScreen/GameTitle';
import {useLevelStore} from '../state/useLevelStore';
import {goBack} from '../utils/NavigationUtil';
import {playSound} from '../utils/SoundUtility';
import {screenWidth} from '../utils/Constants';
import LottieView from 'lottie-react-native';

const GameScreen = () => {
  const route = useRoute();
  const items = route.params as any;
  // const {playSound} = useSound();
  const [gridData, setGridData] = useState<any>(null);
  const [collectedCandies, setCollectedCandies] = useState<number>(0);
  const [totalCandies, setTotalCandies] = useState<number>(0);
  const [timer, setTimer] = useState<any>(null);

  // handle Animation State
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [firstAnimation, setFirstAnimation] = useState<boolean>(false);

  // complete and unlock level
  const {completeLevel, unlockLevel} = useLevelStore();

  // fade and scale animation for show win and lose and level unlock
  const fadeAmination = useRef(new Animated.Value(1)).current;
  const scaleAmination = useRef(new Animated.Value(1)).current;

  console.log('items', items);

  useEffect(() => {
    if (items?.level) {
      setGridData(items.level.grid);
      setTotalCandies(items.level.pass);
      setTimer(items.level.time);
    }
  }, [items]);

  useEffect(() => {
    if (timer === 0) {
      console.log(timer);
      
      handleGameOver();
    }
  }, [timer]);

  useEffect(() => {
    if (timer && timer > 0) {
      const timeInterval = setInterval(() => {
        setTimer((pre: number) => {
          if (pre === 1000) {
            clearInterval(timeInterval);
            return 0;
          }
          return pre - 1000;
        });
      }, 1000);

      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [timer]);

  useEffect(() => {
    if (
      collectedCandies >= totalCandies &&
      totalCandies > 0 &&
      !firstAnimation
    ) {
      setShowAnimation(true);
      startHeartBeatAnimation();
    }
  }, [collectedCandies, totalCandies]);

  const startHeartBeatAnimation = () => {
    playSound('cheer', false);
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAmination, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAmination, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAmination, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAmination, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]),
      {
        iterations: 2,
      },
    ).start(() => {
      setFirstAnimation(true);
      setShowAnimation(false);
    });
  };

  // create handleGameOver Function
  const handleGameOver = () => {
    if (collectedCandies >= totalCandies) {
      const id = items?.level?.id;
      completeLevel(id, collectedCandies);
      unlockLevel(id + 1);
      Alert.alert('Congratulations!', 'Level Completed!', [
        {
          text: 'Move To Next Level',
          onPress: () => {
            goBack();
          },
        },
      ]);
    } else {
      Alert.alert('Time Out⌚', 'You did not collected enought candies!', [
        {
          text: "Phew!, I'll win next time!",
          onPress: () => {
            goBack();
          },
        },
      ]);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/b1.png')}
      style={styles.flex1}>
      <StatusBar backgroundColor={'#71c5e7'} />
      <GameHeader
        collectedCandies={collectedCandies}
        timer={timer}
        totalCandies={totalCandies}
      />

      {gridData && (
        <GameTitle
          data={gridData}
          setGridData={setGridData}
          setCollectedCandies={setCollectedCandies}
        />
      )}

      {showAnimation && (
        <>
          <Animated.Image
            source={require('../assets/text/t2.png')}
            style={[
              styles.centerImage,
              {
                opacity: fadeAmination,
                transform: [
                  {
                    scale: scaleAmination,
                  },
                ],
              },
            ]}
          />

          <LottieView
            source={require('../assets/animations/confetti_2.json')}
            style={styles.lottie}
            autoPlay
            loop
          />
        </>
      )}

      <GameFooter />
    </ImageBackground>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  centerImage: {
    position: 'absolute',
    alignSelf: 'center',
    resizeMode: 'contain',
    top: '15%',
    width: screenWidth * 0.8,
    height: 180,
  },
  lottie: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: 180,
    top: '10%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
