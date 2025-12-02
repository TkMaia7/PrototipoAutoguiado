import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Header } from './src/components/header';
import { styles } from './styles';
import Mapbox from '@rnmapbox/maps';
Mapbox.setAccessToken("pk.eyJ1IjoicGFtZTExYSIsImEiOiJjbWlnMjY5c2IwMmRsM2Zwb3FzamxkbGg3In0.335QLoA_FqHQDF6EGP49EQ")

export default function TuorMap() {
  const LocalizacaoInicial={
    centerCoordinate: [-46.6333, -23.5505], //COORDENADA DO IFNMG
    zoomLevel: 12,
  };

  return(
    <View style={styles.container}>
      <Mapbox.MapView 
        style={styles.map}
        styleURL={Mapbox.StyleURL.Street}
      >
        <Mapbox.Camera
          centerCoordinate={LocalizacaoInicial.centerCoordinate}
          animationMode="Flyto"
        />
        <Mapbox.PointAnnotation
          id="meuPontoInicial"
          coordinate={[-46.6333, -23.5505]}
        />
      </Mapbox.MapView>
    </View>
  );
}