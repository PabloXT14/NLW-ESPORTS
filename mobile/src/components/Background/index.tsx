import React, { ReactNode } from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import backgroundImg from '../../assets/background-galaxy.png'

import { styles } from './styles';

interface BackgroundProps {
  children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <ScrollView>
      <ImageBackground
        source={backgroundImg}
        defaultSource={backgroundImg}
        style={styles.container}
      >
        {children}
      </ImageBackground>
    </ScrollView>
  );
}