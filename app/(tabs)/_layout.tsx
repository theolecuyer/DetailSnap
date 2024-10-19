import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function TabLayout() {
  return (
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
      <Tabs.Screen name="account" options={{ 
        title: 'account', 
        tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }} />
    </Tabs>
  );
}
