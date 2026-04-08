import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function Home (){
  const router = useRouter();
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color:'white'}}>Home</Text>
      <Button title="Go to Add" onPress={() =>{router.push('/add')}} />
    </View>
  )
}