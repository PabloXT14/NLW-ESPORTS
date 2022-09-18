import React, { ReactNode } from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import { styles } from './styles';

import backgroundImg from '../../assets/background-galaxy.png'

interface BackgroundProps {
  children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground
      source={backgroundImg}
      defaultSource={backgroundImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}