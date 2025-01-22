import {
  Animated,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {playSound} from '../../utils/SoundUtility';

type PressScaleProps = {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
};

const PressScale: FC<PressScaleProps> = ({children, onPress, style}) => {
  const scaleAnimation = new Animated.Value(1);

  const handlePressIn = () => {
    playSound('ui');
    Animated.spring(scaleAnimation, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={{...style}}>
      <Animated.View
        style={[[{transform: [{scale: scaleAnimation}]}, {width: '100%'}]]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default PressScale;
