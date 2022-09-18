import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { GameParams } from '../../@types/navigation';
import { Entypo } from '@expo/vector-icons'
import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles';
import { THEME } from '../../themes';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const IP_MACHINE = '192.168.2.122'

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])

  // PEGANDO PARÂMETROS DA ROTA
  const route = useRoute()
  const game = route.params as GameParams;

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    axios.get(`http://${IP_MACHINE}:3333/games/${game.id}/ads`)
    .then(response => {
      // console.log(response.data)
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
                onConnect={() => {}}
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

        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}