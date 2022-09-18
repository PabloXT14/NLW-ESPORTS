import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { GameController } from 'phosphor-react-native';
import { DuoInfo } from './components/DuoInfo';

import { THEME } from '../../themes';
import { styles } from './styles';

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

export interface Props extends ViewProps {
  data: DuoCardProps;
  onConnect: () => void;
}


export function DuoCard({ data, onConnect, ...rest }: Props) {
  return (
    <View style={styles.container} {...rest}>
      <DuoInfo 
        label="Nome"
        value={data.name}
      />

      <DuoInfo
        label="Tempo de jogo"
        value={String(data.yearsPlaying)}
      />

      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dia(s) \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo 
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? 'Sim': 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <GameController 
          size={20}
          color={THEME.COLORS.TEXT}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}