/* eslint-disable react-native/no-inline-styles */
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {getSoundPath} from '../utils/SoundUtility';
import Video from 'react-native-video';

interface SoundContextProps {
  playSound: (soundName: string, repeat: boolean) => void;
  stopSound: (soundName: string) => void;
}

interface SoundContextProviderProps {
  children: ReactNode;
}

export const SoundContext = createContext<SoundContextProps | undefined>(
  undefined,
);

export const SoundProvider = ({children}: SoundContextProviderProps) => {
  const [sound, setSound] = useState<any[]>([]);

  const stopSound = (soundName: string) => {
    // stop the sound
    setSound(prevSound => {
      return prevSound?.filter(sound => sound.id !== soundName);
    });
  };

  const playSound = (soundName: string, repeat: boolean) => {
    // play the sound
    const GetSoundPath = getSoundPath(soundName);
    if (GetSoundPath) {
      setSound(prevSound => {
        const updatedSounds = prevSound?.filter(
          sound => sound.id !== soundName,
        );
        return [
          ...updatedSounds,
          {
            id: soundName,
            path: GetSoundPath,
            repeat,
          },
        ];
      });
    } else {
      console.error(`Sound ${soundName} not found`);
    }
  };

  return (
    <SoundContext.Provider
      value={{
        playSound,
        stopSound,
      }}>
      {children}
      {sound.map(sound => {
        return (
          <Video
            key={sound.id}
            source={sound.path}
            repeat={sound.repeat}
            playInBackground={true}
            muted={false}
            resizeMode="cover"
            playWhenInactive={true}
            ignoreSilentSwitch={'ignore'}
            paused={false}
            volume={0.3}
            style={{position: 'absolute', width: 0, height: 0}}
          />
        );
      })}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextProps => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundContextProvider');
  }
  return context;
};
