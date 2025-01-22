import React from 'react';
import Navigation from './src/navigation/Navigation';
import {Colors} from './src/utils/Constants';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <Navigation />;
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.theme}  />
    </>
  );
};

export default App;
