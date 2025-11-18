import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Header } from './src/components/header';
import { styles } from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}