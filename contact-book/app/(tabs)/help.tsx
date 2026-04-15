import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Help () {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="help-circle" size={64} color="#6366f1" /> 
                <Text style={styles.title}>Help</Text>
            </View>
            <View style={{alignItems:'center'}}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Managing Contacts</Text>
                    <Text> Click the floating "+" button on the home screen to add a new contact. You can update or delete them using the icons on each contact card. </Text> 
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Syncing</Text>
                    <Text> The app automatically syncs with your MongoDB Atlas cloud database. Pull down on the contact list to force a refresh. </Text> 
                </View> 
                <View > 
                    <Text>Version 1.0.0</Text> 
                </View>
            </View>
            
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb', },
    content: { padding: 24, alignItems: 'center', },
    header: { alignItems: 'center', marginBottom: 32, marginTop: 40, },
    title: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginTop: 16, },
    section: { margin: 10,width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 16, marginBottom: 16, shadowColor: '#000000ff', elevation: 1, },
    sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1f2937', marginBottom: 8, },
    
})