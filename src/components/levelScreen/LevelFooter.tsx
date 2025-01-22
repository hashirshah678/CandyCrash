import {View, Text, Image} from 'react-native';
import React from 'react';
import {levelStyles} from '../../styles/levelStyles';

const LevelFooter = () => {
  return (
    <View style={levelStyles.comingSoonContainer}>
      <Image
        source={require('../../assets/images/doddle.png')}
        style={levelStyles.doddle}
      />
        <Text style={levelStyles.comingSoonText}>More levels coming soon!</Text>
        <Text style={levelStyles.comingSoonText}>For More Updates Just follow me on instagram</Text>
        <Text style={levelStyles.comingSoonText}>@evil_boy_never</Text>
    </View>
  );
};

export default LevelFooter;
