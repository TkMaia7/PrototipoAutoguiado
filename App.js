import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from './src/components/header';
import { styles } from './styles'; 
import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';
import * as geolib from 'geolib'; 
import { ProximityAlert } from './src/components/ProximityAlert'; 
import { MapMarkers } from './src/components/MapMarkers'; 
import { 
  FALLBACK_COORDS, 
  INITIAL_ZOOM, 
  POINTS_OF_INTEREST 
} from './src/config/constants';

Mapbox.setAccessToken("pk.eyJ1IjoicGFtZTExYSIsImEiOiJjbWlnMjY5c2IwMmRsM2Zwb3FzamxkbGg3In0.335QLoA_FqHQDF6EGP49EQ");

export default function App() {

  const [userLocation, setUserLocation] = useState(null); 
  const [showAlert, setShowAlert] = useState(false);
  const [activePointData, setActivePointData] = useState(null); 
  const triggeredPointsRef = useRef([]);

  const checkProximity = (coords) => {
    if (showAlert) return;

    const userCoords = { latitude: coords[1], longitude: coords[0] };

    POINTS_OF_INTEREST.forEach((point) => {
      // 1. Calcula a distância
      const distance = geolib.getDistance(userCoords, {
        latitude: point.latitude,
        longitude: point.longitude
      });

      // 2. Define o raio específico deste ponto (ou 20m se esquecer de configurar)
      const currentRadius = point.radius || 20;

      const isInside = distance < currentRadius;
      const isAlreadyActive = triggeredPointsRef.current.includes(point.id);

      // CENÁRIO 1: Entrou na zona específica deste ponto
      if (isInside && !isAlreadyActive) {
        setActivePointData({ title: point.title, message: point.message });
        setShowAlert(true);
        triggeredPointsRef.current.push(point.id);
      }

      // CENÁRIO 2: Saiu da zona (Resetando gatilho)
      // Usamos o raio específico + 5m de margem
      else if (distance > (currentRadius + 5) && isAlreadyActive) {
        console.log(`Saiu de ${point.title}. Resetando gatilho.`);
        
        triggeredPointsRef.current = triggeredPointsRef.current.filter(id => id !== point.id);
      }
    });
  };

  const startLocationTracking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permissão negada.');
      return; 
    }
    
    const locationListener = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 3, 
      },
      (newLocation) => {
        const newCoords = [
          newLocation.coords.longitude, 
          newLocation.coords.latitude
        ];
        
        setUserLocation(newCoords);
        checkProximity(newCoords); 
      }
    );

    return locationListener;
  };

  useEffect(() => {
    let locationSubscription;
    startLocationTracking().then(sub => locationSubscription = sub);
    return () => { if (locationSubscription) locationSubscription.remove(); };
  }, []); 

  const finalCoords = userLocation || FALLBACK_COORDS;
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        <Header />
        
        <Mapbox.MapView
          style={styles.map} 
          styleURL={Mapbox.StyleURL.Street}
        >
          <Mapbox.Camera
            centerCoordinate={finalCoords}
            zoomLevel={INITIAL_ZOOM} 
            animationMode="Flyto"
          />

          <MapMarkers finalCoords={finalCoords} styles={styles} />

        </Mapbox.MapView>

        <ProximityAlert
          isVisible={showAlert}
          data={activePointData} 
          onClose={() => setShowAlert(false)}
          styles={styles}
        />

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}