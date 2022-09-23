import { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import { Entypo } from '@expo/vector-icons'
import logoImg from '../../assets/logo-nlw-esports.png'

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch'
import axios from 'axios';

import { styles } from './styles';
import { THEME } from '../../themes';

const IP_MACHINE = '192.168.2.122' // on WSL (with ports changed)
// const IP_MACHINE = '172.30.32.1/'// on Windows (with ports changed)

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  // PEGANDO PARÂMETROS DA ROTA
  const route = useRoute()
  const game = route.params as GameParams;

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    axios.get(`http://${IP_MACHINE}:3333/ads/${adsId}/discord`)
    .then(response => {
      // console.log(response.data)
      setDiscordDuoSelected(response.data.discord)
    })
  }

  useEffect(() => {
    axios.get(`http://${IP_MACHINE}:3333/games/${game.id}/ads`)
    .then(response => {
      setDuos(response.data)
    })
  }, [])

  return (
    <Background>
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container} >
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo 
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
            </TouchableOpacity>

            <Image 
              source={logoImg}
              style={styles.logo}
            />

            <View style={styles.right} />
          </View>

          <Image 
            source={{ uri: game.bannerUrl}}
            style={styles.banner}
            resizeMode="cover"
          />

          <Heading 
            title={game.title}
            subtitle="Conecte-se e comece a jogar!"
          />

          <FlatList 
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <DuoCard
                data={item}
                onConnect={() => { getDiscordUser(item.id) }}
              />
            )}
            style={styles.containerList}
            contentContainerStyle={[ duos.length > 0 ? styles.contentList : styles.emptyListContent ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
                <Text style={styles.emptyListText}>
                  Não há anúncios publicados ainda.
                </Text>
            )}
          />

          <DuoMatch
            visible={discordDuoSelected.length > 0}
            discord={discordDuoSelected}
            onClose={() => setDiscordDuoSelected('')}
          />

        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}