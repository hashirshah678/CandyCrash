import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {FONTS, formatTime, screenHeight} from '../../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';

type GameHeaderProps = {
  totalCandies: number;
  collectedCandies: number;
  timer: number;
};

const GameHeader: FC<GameHeaderProps> = ({
  collectedCandies,
  timer,
  totalCandies,
}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Image
        source={require('../../assets/icons/hangrope.png')}
        style={styles.image}
      />
      <ImageBackground
        source={require('../../assets/images/lines.jpg')}
        style={styles.lines}>
        <View style={styles.subContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.candiestext}>
              🍭 {collectedCandies}/
              <Text style={styles.totalCandiesText}>{totalCandies}</Text>
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              ⌚{' '}{formatTime(timer)}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default GameHeader;

const styles = StyleSheet.create({
  container: {
    // if you want to change the height of the header, change the height of the image 
    height: screenHeight * 0.15,
    width: '100%',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  image: {
    width: RFValue(60),
    height: RFValue(60),
    top: -RFValue(0),
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'center',
    // backgroundColor: 'red',
    resizeMode: 'contain',
  },
  lines: {
    padding: 5,
    overflow: 'hidden',
    resizeMode: 'contain',
    borderRadius: 10,
    margin: RFValue(10),
    marginTop: RFValue(40),
  },
  subContainer: {
    padding: RFValue(5),
    borderRadius: RFValue(12),
    overflow: 'hidden',
    backgroundColor: '#edc1b9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: RFValue(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: RFValue(5),
  },
  textContainer: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#C2979F',
    borderRadius: 10,
  },
  candiestext: {
    fontFamily: FONTS.Lily,
    fontSize: RFValue(14),
    color: '#3a0e4c',
  },
  totalCandiesText: {
    fontFamily: FONTS.Lily,
    fontSize: RFValue(12),
    color: '#3a0e4c',
  },
  timeContainer: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#C2978F',
    borderRadius: 10,
  },
  timeText: {
    fontFamily: FONTS.Lily,
    fontSize: RFValue(14),
    color: '#5b2333',
  },
});
