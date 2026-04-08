import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Add() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    console.log('hiii');
    
    console.log(name, phone);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="Save Contact" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f1f1',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});