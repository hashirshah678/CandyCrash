import {ImageBackground, Image} from 'react-native';
import React, {FC} from 'react';
import {commonStyles} from '../styles/commonStyles';

const SplashScreen: FC = () => {
  return (
    <ImageBackground
      src={require('../assets/images/bg.png')}
      style={commonStyles.container}>
      <Image src={require('../assets/text/logo.png')}  />
    </ImageBackground>
  );
};

export default SplashScreen;
