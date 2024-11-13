import { View, Text } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from '@/providers/AuthProvider';
import { ActivityIndicator } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

const index = () => {
  const { session, loading } = useAuth();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (!loading && !session) {
        router.replace('/(auth)/sign_in');
      } else if (!loading && session) {
        router.replace('/(tabs)/');
      }
    }, [loading, session, router])
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Link href={'/(tabs)'} asChild>
          <Button text="Main Screen" />
        </Link>
        <Link href={'/sign_in'} asChild>
          <Button text="Sign in screen" />
        </Link>
        <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
      </View>
    </SafeAreaProvider>
  );
};

export default index;
