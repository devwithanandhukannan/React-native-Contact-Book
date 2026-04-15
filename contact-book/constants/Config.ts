import { Platform } from 'react-native';

// For Android emulator, use 10.0.2.2
// For iOS simulator, use localhost
// For web, use localhost
const API_URL = Platform.select({
  android: 'http://192.168.1.3:3000',
  ios: 'http://localhost:3000',
  default: 'http://192.168.1.3:3000',
});

export default {
  API_URL,
  STORAGE_KEY: 'contacts',
};
