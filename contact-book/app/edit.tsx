import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { updateContactApi } from '../hooks/api';
import { updateContactLocal } from '../hooks/storage';

export default function Edit() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState(params.name as string);
  const [phone, setPhone] = useState(params.phone as string);
  const [email, setEmail] = useState((params.email as string) || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name || !phone) {
      Alert.alert("Error", "Name and Phone are required");
      return;
    }

    setLoading(true);
    try {
      const id = (params._id || params.id) as string;
      const updatedContact = {
        _id: params._id as string,
        id: params.id as string,
        name,
        phone,
        email,
      };

      // 1. Update locally
      await updateContactLocal(id, updatedContact);

      // 2. Update backend
      await updateContactApi(id, updatedContact);

      Alert.alert("Success", "Contact updated successfully");
      router.back();
    } catch (e) {
      console.log(e);
      Alert.alert("Saved Locally", "Updates saved locally but failed to sync with server.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Screen options={{ title: 'Edit Contact', headerShadowVisible: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#9ca3af" />
              <TextInput
                placeholder="John Doe"
                style={styles.input}
                onChangeText={setName}
                value={name}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="#9ca3af" />
              <TextInput
                placeholder="+1 234 567 890"
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email (Optional)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#9ca3af" />
              <TextInput
                placeholder="john@example.com"
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleUpdate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update Contact</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 24 },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  button: {
    backgroundColor: '#6366f1',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});