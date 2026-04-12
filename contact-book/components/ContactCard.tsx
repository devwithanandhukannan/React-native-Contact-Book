import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Contact } from '../hooks/api';

interface Props {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactCard = ({ contact, onEdit, onDelete }: Props) => {
  const handleDelete = () => {
    Alert.alert(
      "Delete Contact",
      `Are you sure you want to delete ${contact.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => onDelete(contact._id || contact.id!) }
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{contact.name.charAt(0).toUpperCase()}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(contact)} style={styles.iconButton}>
          <Ionicons name="pencil" size={20} color="#6366f1" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
          <Ionicons name="trash" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  phone: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
});
