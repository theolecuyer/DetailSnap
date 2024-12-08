import { View, Text } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from '@/providers/AuthProvider';
import { ActivityIndicator } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { FadeInDown } from 'react-native-reanimated';

const index = () => {
  const { session, loading } = useAuth();
  const router = useRouter();

  //Stop the splash screen from auto hiding until load is complete
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  SplashScreen.setOptions({
    fade: true,
  });
  //Hide splash screen once loaded
  useEffect(() => {
    if (!loading && session !== undefined) {
      SplashScreen.hideAsync();
    }
  }, [loading, session]);

  useFocusEffect(
    useCallback(() => {
      if (!loading && !session) {
        router.replace('/(auth)/sign_in');
      } else if (!loading && session) {
        router.replace('/(tabs)/');
      }
    }, [loading, session, router])
  );
};

export default index;
