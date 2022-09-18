import { ImageBackground, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './styles';
import { THEME } from '../../themes';

export interface GameCardProps {
  id: string;
  title: string;
  _count: {
    ads: number,
  },
  bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

export function GameCard({data, ...rest}: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground 
        source={{ uri: data.bannerUrl }}
        style={styles.cover}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.title}>
            {data.title}
          </Text>

          <Text style={styles.ads}>
            {data._count.ads} anúncio(s)
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}