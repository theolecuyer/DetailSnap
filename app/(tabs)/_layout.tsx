import { Tabs, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Link href="/addItem" asChild>
        <Pressable style={styles.addButton}>
          {({ pressed }) => (
            <View style={[styles.buttonContainer, { backgroundColor: pressed ? Colors.light.tint : 'white' }]}>
            <Ionicons 
              name="add" 
              size={28} 
              color={pressed ? 'white' : Colors.light.tint} 
            />
            </View>
          )}
        </Pressable>
      </Link>
    <Tabs
    screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#2B7BE4',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: { paddingBottom: 10, height: 65 },
      })}
    >
      <Tabs.Screen name="index" options={{ 
        headerShown: true,
        title: '',
        headerRight: () => (
            <Pressable
                onPress={() => {
                    console.log('Search icon pressed');
                }}
                style={{ marginRight: 15 }}
            >
                <Ionicons name="search" size={24} color="black" />
            </Pressable>
        ),
        tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }} />
      <Tabs.Screen name="photos" options={{ 
        title: 'Photos',
        tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'image' : 'image-outline'} size={24} color={color} />
          ),
        }} />
        <Tabs.Screen name="analytics" options={{ 
        title: 'Analytics',
        tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'analytics' : 'analytics-outline'} size={26} color={color} />
          ),
        }} />
      <Tabs.Screen name="account" options={{ 
        title: 'Account', 
        tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }} />
    </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    zIndex: 1,
  },
  buttonContainer: {
    width: 52,
    height: 52,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
})