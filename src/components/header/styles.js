import { StyleSheet, Platform} from 'react-native'; 
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  headerContainer: {
    width: '100%', 
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  iconPlaceholder: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});