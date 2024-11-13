import { Text, View, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
export default function AboutScreen() {
  return (
    <View>
      <Text>Account</Text>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
}

const styles = StyleSheet.create({
});
