import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import { screenHeight } from '../../utils/Constants';

type GameTitleProps = {
  data: any[][];
  setGridData: (data:any)=>void;
  setCollectedCandies: (data:any)=>void;
};

const GameTitle: FC<GameTitleProps> = ({
  data,
  setCollectedCandies,
  setGridData,
}) => {
  return (
    <View style={styles.flex2}>
      <Text>GameTitle</Text>
    </View>
  );
};

export default GameTitle;

const styles = StyleSheet.create({
    flex2:{
        height: screenHeight * 0.72,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
});
