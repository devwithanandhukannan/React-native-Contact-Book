import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Config from '../constants/Config';
import { Contact } from './api';

// In-memory fallback for environments where persistent storage fails
let memoryStorage: Record<string, string> = {};

const isWeb = Platform.OS === 'web';

export const saveContactsLocal = async (contacts: Contact[]) => {
  const data = JSON.stringify(contacts);
  try {
    await AsyncStorage.setItem(Config.STORAGE_KEY, data);
  } catch (error: any) {
    console.warn('Storage Warning (saveContactsLocal):', error.message);
    
    // Fallback logic
    if (isWeb) {
      try {
        localStorage.setItem(Config.STORAGE_KEY, data);
      } catch (e) {
        console.error('Web LocalStorage Error:', e);
      }
    } else {
      // In-memory fallback for native if AsyncStorage is null
      memoryStorage[Config.STORAGE_KEY] = data;
    }
  }
};

export const getContactsLocal = async (): Promise<Contact[]> => {
  try {
    const data = await AsyncStorage.getItem(Config.STORAGE_KEY);
    if (data) return JSON.parse(data);
    
    // Check web fallback
    if (isWeb) {
      const webData = localStorage.getItem(Config.STORAGE_KEY);
      if (webData) return JSON.parse(webData);
    }
    
    // Check memory fallback
    if (memoryStorage[Config.STORAGE_KEY]) {
      return JSON.parse(memoryStorage[Config.STORAGE_KEY]);
    }

    return [];
  } catch (error: any) {
    console.warn('Storage Warning (getContactsLocal):', error.message);
    
    // Fallback on error
    if (isWeb) {
      const webData = localStorage.getItem(Config.STORAGE_KEY);
      return webData ? JSON.parse(webData) : [];
    }
    
    if (memoryStorage[Config.STORAGE_KEY]) {
      return JSON.parse(memoryStorage[Config.STORAGE_KEY]);
    }
    
    return [];
  }
};

export const addContactLocal = async (contact: Contact) => {
  const contacts = await getContactsLocal();
  const updated = [...contacts, contact];
  await saveContactsLocal(updated);
};

export const updateContactLocal = async (id: string, contact: Contact) => {
  const contacts = await getContactsLocal();
  const updated = contacts.map((c) => (c.id === id || c._id === id ? contact : c));
  await saveContactsLocal(updated);
};

export const deleteContactLocal = async (id: string) => {
  const contacts = await getContactsLocal();
  const updated = contacts.filter((c) => c.id !== id && c._id !== id);
  await saveContactsLocal(updated);
};
