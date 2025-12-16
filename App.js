import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native'; 
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from './src/components/header';
import { styles } from './styles';
import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';

Mapbox.setAccessToken("pk.eyJ1IjoicGFtZTExYSIsImEiOiJjbWlnMjY5c2IwMmRsM2Zwb3FzamxkbGg3In0.335QLoA_FqHQDF6EGP49EQ")

const FALLBACK_COORDS = [-44.3680496, -15.4474802];
const INITIAL_ZOOM = 18; 

export default function App() {

  const [userLocation, setUserLocation] = useState(null); 

  const startLocationTracking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permissão de localização negada. Usando localização padrão.');
      return; 
    }
    
    const locationListener = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 3, 
      },
      (newLocation) => {
        setUserLocation([
          newLocation.coords.longitude, 
          newLocation.coords.latitude
        ]);
      }
    );

    return locationListener;
  };

  useEffect(() => {
    let locationSubscription;
    
    startLocationTracking().then(sub => {
      locationSubscription = sub;
    });

    return () => {
      if (locationSubscription) {
        locationSubscription.remove(); 
      }
    };
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
          <Mapbox.PointAnnotation
            id="meuPontoAtual"
            coordinate={finalCoords}
          />
        </Mapbox.MapView>

        <StatusBar style="auto" />
      </SafeAreaView>
      
    </SafeAreaProvider>
  );
}