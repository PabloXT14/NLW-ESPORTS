import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png'

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
// import { GAMES } from '../../utils/games';

import { styles } from './styles';

const IP_MACHINE = '192.168.2.122'


export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  console.log('Está na Home')

  useEffect(() => {
    fetch(`http://${IP_MACHINE}:3333/games`)
      .then(response => response.json())
      .then(data => {
        setGames(data)
        // console.log(data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={logoImg}
        style={styles.logo}
      />

      <Heading 
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList 
        data={games}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GameCard 
            data={item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </SafeAreaView>
  );
}