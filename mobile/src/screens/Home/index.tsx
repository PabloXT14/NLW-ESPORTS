import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, FlatList, ScrollView } from 'react-native';
import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { useEffect, useState } from 'react';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const IP_MACHINE = '192.168.2.122'

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation()

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    // PASSANDO INFORMAÇÕES DO GAME CLICADO PELA ROTA
    navigation.navigate('game', {
      id,
      title,
      bannerUrl
    })
  }

  useEffect(() => {
    axios.get(`http://${IP_MACHINE}:3333/games`)
    .then(response => {
      setGames(response.data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    
      <Background>
        <ScrollView style={{ flex: 1 }}>
          <SafeAreaView style={styles.container}>
              <Image
                source={logoImg}
                style={styles.logo}
              />

              <Heading 
                title='Encontre seu duo!'
                subtitle='Selecione o game que deseja jogar...'
              />

              <FlatList 
                data={games}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <GameCard 
                    data={item}
                    onPress={() => handleOpenGame(item)}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentList}
              />
          </SafeAreaView>
        </ScrollView>
      </Background>
  );
}