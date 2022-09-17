import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { GAMES } from '../../utils/games';

import { styles } from './styles';

const IP_WSL = '172.28.87.163'
// const IP_WSL = ' 172.28.80.1'


export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);


  useEffect(() => {
    fetch(`http://${IP_WSL}:3333/games`)
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <View style={styles.container}>
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

      {/* <TouchableOpacity style={{
        borderRadius: 6,
        padding: 16,
        backgroundColor: 'tomato',
      }}>
        <Text>Click me</Text>
      </TouchableOpacity> */}
    </View>
  );
}