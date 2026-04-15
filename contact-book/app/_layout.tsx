import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown:true,
          headerTitle:'KNZLE',
          headerTitleStyle:{
            color:'white',
            fontSize:20,
            fontWeight:'bold',
          },
          headerStyle: {
            backgroundColor: '#b3a2ecff',
          },
        }}
      />
    </>
  );
}