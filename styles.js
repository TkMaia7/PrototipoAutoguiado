import { StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from './src/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});