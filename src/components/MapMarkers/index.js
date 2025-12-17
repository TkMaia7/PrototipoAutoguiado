import React from 'react';
import { View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { POINTS_OF_INTEREST } from '../../config/constants'; 

export function MapMarkers({ finalCoords, styles }) {
  return (
    <>
      {POINTS_OF_INTEREST.map((point) => (
        <Mapbox.PointAnnotation
          key={point.id}
          id={point.id}
          coordinate={[point.longitude, point.latitude]}
        >
          <View style={styles.poiMarker} />
        </Mapbox.PointAnnotation>
      ))}

      <Mapbox.PointAnnotation
        id="meuPontoAtual"
        coordinate={finalCoords}
      />
    </>
  );
}