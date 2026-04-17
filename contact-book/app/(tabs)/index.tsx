import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  RefreshControl,
  StatusBar
} from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Contact, fetchContacts, deleteContactApi } from '../../hooks/api';
import { getContactsLocal, saveContactsLocal, deleteContactLocal } from '../../hooks/storage';
import { ContactCard } from '../../components/ContactCard';

import { useFocusEffect } from 'expo-router';

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const loadData = useCallback(async (showLoading = false) => {
    if (showLoading) setRefreshing(true);
    try {
      // 1. Get from local first (Instant UI)
      const localData = await getContactsLocal();
      setContacts(localData);

      // 2. Fetch from backend (Sync)
      const remoteData = await fetchContacts();
      setContacts(remoteData);
      
      // 3. Update local storage with remote data
      await saveContactsLocal(remoteData);
    } catch (error) {
      console.log("Sync failed, using offline data:", error);
    } finally {
      if (showLoading) setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleDelete = async (id: string) => {
    const updated = contacts.filter(c => c._id !== id && c.id !== id);
    setContacts(updated);
    await deleteContactLocal(id);

    try {
      await deleteContactApi(id);
    } catch (e) {
      console.log("Remote delete failed, will sync later");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Contacts</Text>
        <Text style={styles.subtitle}>{contacts.length} total</Text>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => (item._id || item.id || Math.random()).toString()}
        renderItem={({ item }) => (
          <ContactCard 
            contact={item} 
            onEdit={(c) => router.push({ pathname: '/edit', params: c as any })}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => loadData(true)} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No contacts yet</Text>
          </View>
        }
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/add')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#9ca3af',
  },
});