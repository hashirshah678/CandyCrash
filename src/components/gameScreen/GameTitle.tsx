import {Animated, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {screenHeight} from '../../utils/Constants';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {getCandyImage} from '../../utils/data';
import useGameLogics from '../gamelogic/useGameLogics';

type GameTitleProps = {
  data: any[][];
  setGridData: (data: any) => void;
  setCollectedCandies: (data: any) => void;
};

const GameTitle: FC<GameTitleProps> = ({
  data,
  setCollectedCandies,
  setGridData,
}) => {
  const {animatedValues, handleGesture} = useGameLogics(data, setGridData);

  return (
    <View style={styles.flex2}>
      {data.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={styles.row}>
            {row.map((tile, colIndex) => {
              return (
                <PanGestureHandler
                  key={`${rowIndex}-${colIndex}`}
                  onGestureEvent={e => {
                    handleGesture(
                      e,
                      rowIndex,
                      colIndex,
                      State.ACTIVE,
                      setCollectedCandies,
                    );
                  }}
                  onHandlerStateChange={e => {
                    handleGesture(
                      e,
                      rowIndex,
                      colIndex,
                      e?.nativeEvent?.state,
                      setCollectedCandies,
                    );
                  }}>
                  <View
                    style={[
                      styles.tile,
                      tile === null ? styles.emptyTile : styles.activeTile,
                    ]}>
                    {tile !== null && (
                      <Animated.Image
                        source={getCandyImage(tile)}
                        style={[
                          styles.candy,
                          tile === null || !animatedValues[rowIndex][colIndex]
                            ? {}
                            : {
                                transform: [
                                  {
                                    translateX:
                                      animatedValues[rowIndex][colIndex].x,
                                  },
                                  {
                                    translateY:
                                      animatedValues[rowIndex][colIndex].y,
                                  },
                                ],
                            },
                        ]}
                      />
                    )}
                  </View>
                </PanGestureHandler>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default gestureHandlerRootHOC(GameTitle);

const styles = StyleSheet.create({
  flex2: {
    height: screenHeight * 0.72,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  tile: {
    width: RFPercentage(5.5),
    height: RFPercentage(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  activeTile: {
    backgroundColor: '#326e9a',
    borderColor: '#666',
    borderWidth: 0.6,
  },
  emptyTile: {
    backgroundColor: 'transparent',
  },
  candy: {
    width: RFPercentage(4),
    height: RFPercentage(4),
    resizeMode: 'contain',
  },
});
