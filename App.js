import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from './src/components/header';
import { styles } from './styles';
import Mapbox from '@rnmapbox/maps';
Mapbox.setAccessToken("pk.eyJ1IjoicGFtZTExYSIsImEiOiJjbWlnMjY5c2IwMmRsM2Zwb3FzamxkbGg3In0.335QLoA_FqHQDF6EGP49EQ")

export default function App() {

  const LocalizacaoInicial = {
    centerCoordinate: [-44.3680496,-15.4474802], //COORDENADA DO IFNMG
    zoomLevel: 12,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        <Header />
        
        <Mapbox.MapView
          style={styles.map} 
          styleURL={Mapbox.StyleURL.Street}
        >
          <Mapbox.Camera
            centerCoordinate={LocalizacaoInicial.centerCoordinate}
            zoomLevel={LocalizacaoInicial.zoomLevel}
            animationMode="Flyto"
          />
          <Mapbox.PointAnnotation
            id="meuPontoInicial"
            coordinate={LocalizacaoInicial.centerCoordinate}
          />
        </Mapbox.MapView>

        <StatusBar style="auto" />
      </SafeAreaView>
      
    </SafeAreaProvider>
  );
}