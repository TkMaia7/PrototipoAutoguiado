import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export function ProximityAlert({ isVisible, onClose, styles, data }) {
  if (!isVisible || !data) return null;

  return (
    <View style={styles.alertContainer}>
      <View style={styles.alertBox}>
        <Text style={styles.alertTitle}>{data.title}</Text>
        <Text style={styles.alertMessage}>{data.message}</Text>
        
        <TouchableOpacity 
          style={styles.alertButton} 
          onPress={onClose}
        >
          <Text style={styles.alertButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}