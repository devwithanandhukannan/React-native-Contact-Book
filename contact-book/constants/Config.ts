import { Platform } from 'react-native';

// For Android emulator, use 10.0.2.2
// For iOS simulator, use localhost
// For web, use localhost
const API_URL = Platform.select({
  android: 'http://192.168.0.242:3000',
  ios: 'http://192.168.0.242:3000',
  default: 'http://localhost:3000',
});

export default {
  API_URL,
  STORAGE_KEY: 'contacts',
};
