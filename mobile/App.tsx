import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notification from 'expo-notifications';

import { Loading } from './src/components/Loading';
import { Background } from './src/components/Background';

import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';



export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })

  const getNotificationListener = useRef<Subscription>();// OBSERVA SE UMA NOTIFICAÇÃO CHEGOU
  const responseNotificationListener = useRef<Subscription>();// PARA RESPONDER UMA NOTIFICAÇÃO Q CHEGOU

  useEffect(() => {
    getPushNotificationToken();// P/ PEGAR O TOKEN DE AUTORIZAÇÃO DE ENVIO DE NOTIFICAÇÕES
  })

  useEffect(() => {
    getNotificationListener.current = Notification.addNotificationReceivedListener(notification => {
      console.log(notification)
    });

    responseNotificationListener.current = Notification.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    // APAGAR AS ESCUTAS DE NOTIFICAÇÃO DEPOIS QUE TERMINAR
    return () => {
      if (getNotificationListener.current && responseNotificationListener.current) {
        Notification.removeNotificationSubscription(getNotificationListener.current);
        Notification.removeNotificationSubscription(responseNotificationListener.current)
      }
    }
  }, [])

  return (
      <Background>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
          {fontsLoaded ? <Routes /> : <Loading /> }
      </Background>
  );
}
