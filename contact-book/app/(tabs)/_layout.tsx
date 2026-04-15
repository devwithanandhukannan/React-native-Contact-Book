import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#6366f1', headerShown: false }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Contacts",
          tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="help" 
        options={{ 
          title: "Help",
          tabBarIcon: ({ color }) => <Ionicons name="help-circle" size={24} color={color} />
        }} 
      />
    </Tabs>
    
  );
}