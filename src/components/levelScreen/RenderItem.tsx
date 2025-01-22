import {View, Text} from 'react-native';
import React from 'react';
import PressScale from '../ui/PressScale';
import {levelStyles} from '../../styles/levelStyles';
import {GameLevels} from '../../types';
import {gameLevels} from '../../utils/data';
import {navigate} from '../../utils/NavigationUtil';

const RenderItem = ({item}: {item: any}) => {
  const opacity = item?.unlocked ? 1 : 0.5;
  const emoji = item?.completed ? '🎉' : item?.unlocked ? '🍬' : '🔒';

  const levelPressHandler = (id: string) => {
    const levelKey = `level${id}` as keyof GameLevels;
    const level = gameLevels[levelKey];
    navigate('Game', {level: {...level, id}});
  };

  return (
    <PressScale
      onPress={() => {
        if (item?.unlocked) {
          levelPressHandler(item?.id);
        }
      }}
      style={levelStyles.levelItem}>
      <View style={{opacity: opacity}}>
        <Text style={levelStyles.levelText}>{emoji}</Text>
        <Text style={levelStyles.levelText}>Level {item?.id}</Text>
        {item?.highScore > 0 && (
          <Text style={levelStyles.highScoreText}>HS: {item?.highScore}</Text>
        )}
      </View>
    </PressScale>
  );
};

export default RenderItem;
