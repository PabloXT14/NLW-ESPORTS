import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
      <Button text='Click' />
      <StatusBar style="auto" />
    </View>
  );
}

interface ButtonProps {
  text: string;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.button__content}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#8257e6',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button__content: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
  }
});
