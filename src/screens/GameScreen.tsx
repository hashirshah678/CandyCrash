import {ImageBackground, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import GameHeader from '../components/gameScreen/GameHeader';
import {useRoute} from '@react-navigation/native';
// import {useSound} from '../navigation/SoundContext';
import GameFooter from '../components/gameScreen/GameFooter';
import GameTitle from '../components/gameScreen/GameTitle';

const GameScreen = () => {
  const route = useRoute();
  const items = route.params as any;
  // const {playSound} = useSound();
  const [gridData, setGridData] = useState<any>(null);
  const [collectedCandies, setCollectedCandies] = useState<number>(0);
  const [totalCandies, setTotalCandies] = useState<number>(0);
  const [timer, setTimer] = useState<any>(null);
  console.log('items', items);

  useEffect(() => {
    if (items?.level) {
      setGridData(items.level.grid);
      setTotalCandies(items.level.pass);
      setTimer(items.level.time);
    }
  }, [items]);

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

      {
        gridData && (
          <GameTitle
            data={gridData}
            setGridData={setGridData}
            setCollectedCandies={setCollectedCandies}
          />
        )
      }

      <GameFooter />
    </ImageBackground>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
