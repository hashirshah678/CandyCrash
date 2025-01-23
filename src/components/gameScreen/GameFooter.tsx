import {Image, StyleSheet,View} from 'react-native';
import React from 'react';
import {screenHeight} from '../../utils/Constants';
import PressScale from '../ui/PressScale';
import {goBack} from '../../utils/NavigationUtil';

const GameFooter = () => {
  return (
    <View style={styles.container}>
      <PressScale
        onPress={() => {
          goBack();
        }}>
        <Image
          source={require('../../assets/icons/close.png')}
          style={styles.closeIcon}
        />
      </PressScale>
    </View>
  );
};

export default GameFooter;

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.1,
    width: '100%',
    paddingHorizontal: 10,
  },
  closeIcon: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
});
